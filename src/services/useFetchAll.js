import { useState, useEffect, useRef } from "react";

export default function useFetchAll(urls) {
  const prevUrls = useRef([])
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //Only run if the array of URLs passed in changes
    if (areEqual(prevUrls.current, urls)) {
      setLoading(false);
      return;
    };
    prevUrls.current = urls

    /* Builds an array of requests and passes them to promise.all below */
    const promises = urls.map((url) =>
      fetch(process.env.REACT_APP_API_BASE_URL + url).then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
    );

    /* Promise.all runs multiple promises at the same time. So, 
    this will make multiple HTTP requests at the same time */
    Promise.all(promises)
      .then((json) => setData(json))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
    /* If urls is add as only dependency array then it will create infinite loop.  */
  }, []);   //Dependency array is empty, as we want this to run once after the first render

  return { data, loading, error };
}

/* Accepts 2 arrays and return true if arrays are equal.
Keeping this function outside avoids the function being reallocated for each render. */
function areEqual(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  );
}