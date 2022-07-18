## Implementing Routing:

1. Configure React Router entry point in index.js. Entry points is declared, now all child components can declare routes.
2. Simply the App component to only hold the layout and routes.
   1. Put App.jsx compnent content to Products.jsx content
3. Declaring Routes: Place Routes component where page changes and declare component page inside Routes component which will change
4. Declaring URL Placeholders:
   "/:example" -> This indiates The first segment of the URL will contain the example.
   Declare placeholder in a route in order to read the example from the URL.
5. Reading URL Placeholders:
   To read url parameter use React hook useParams provided by react-router-dom
6. Handle 404 pages
7. Implement Client-side Navigation via Link and navLink
   1. Link from react-router-dom is like an anchor. But React Router handles the click so the page doesn't reload.
   2. NavLink supports custom styling when the link is active.
8. Fetching based on URL parameter
9. Redirection via useNavigation
