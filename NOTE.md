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

## Managing Shared, Derived and Immutable State

1. Creating a Shoe Size Select.
2. Implementing Derived State
   1. In Derived State we don't have to declare any new state, we can rely upon the state we already declared, don't have to worry about getting out of sync.
3. Lifting cart state
4. Handling Immutability
5. Displaying Cart Item
6. Implementing Immutable friendly update
7. Implementing Immutable friendly delete(Use Array.filter)
8. lazy Initializing State and Persisting State to localStorage

## Implementing Form Validation

Derived state benefits:

1. Reduced the amount of state we had to store
2. Assures error state is valid because it recalculates on each render

## Managing State via Refs

1. Implementing Uncontrolled Inputs
2. Avoiding Setting State on Uncontrolled Components.
   1. Cause: If we navigat away before the API call completes, the set state call occurs on the unmounted component.
   2. In this case react throw error. Ref can be used to chek of the component is mounted.
3. Storing a Previous Value

## Managing Complex State with useReducer

1. Reducer: A function that returns new state when passed an action.
