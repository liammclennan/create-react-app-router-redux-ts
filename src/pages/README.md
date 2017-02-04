/pages
=====

Each `Page` should have a default export of the form:

```javascript
{
    // redux reducer http://redux.js.org/docs/basics/Reducers.html
    reducer: ...,

    // function that returns the React component for the page
    pageFactory: ...,
    
    // collection of side effect functions (ajax etc)    
    sideEffects: ...,

    // the route to match to this page
    route: 'about'
};
```

Pages receive a reference to the redux store, and may perform side effects. No other components have either.