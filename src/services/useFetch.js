import { useState, useEffect, useRef } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

/* Custom data fetching Hook */
export default function useFetch(url) {
  /* Think of this like an instance variable. React persists ref values 
  b/w renders. It can be used to determine component is mounted or not. */
  const isMounted = useRef(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /* Call .current to reference or change the ref's value */
    isMounted.current = true;
    async function init() {
      try {
        const response = await fetch(baseUrl + url);
        if (response.ok) {
          const json = await response.json();
          //Only setState if component is mounted
          if(isMounted.current) setData(json);
        } else {
          throw response;
        }
      } catch (e) {
         if(isMounted.current) setError(e);
      } finally {
        if(isMounted.current) setLoading(false);
      }
    }
    init();

    //Any function returned from useEffect is called on unmount.
    return () => isMounted.current = false;
  }, [url]);

  return { data, error, loading };
}
