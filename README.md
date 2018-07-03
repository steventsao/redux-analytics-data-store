## Problem

Analytics tracking is done by firing POST requests with identifiers and labels alongside application logic. Maintenance becomes problematic when labels need to be updated or when analytics are needed to for other vendor applications. Emitting a [digital data layer](https://www.w3.org/2013/12/ceddl-201312.pdf) helps to abstract the labels away by emitting the same values in to the browser window. As long as the path to the values remain, vendors can update the corresponding labels without altering the codebase. The solution can be more straightforward. If the frontend application were using reactive pattern with libraries like Redux where app state has already been consolidated in a store, a middleware can be included to port the state in the Redux store to the data layer.

## What is a Data Layer?

A data layer is metadata for the app state available in the browser window. It was designed as a solution for providing a generic interface that analytics vendors can access without modifying the codebase.

## What is a Redux middleware and Redux store?

[Redux](https://github.com/reduxjs/redux) is a state container for JavaScript applications. It supports unidirectional flow of data that encourages pure functions and immutability that are also implemented in Flux and Om.

## Examples

```javascript
// one-time analytics tracking
store.dispatch(addTodo({ id: 1 });
analytics.eventTrack("added todo", { id: 1 });
```

```javascript
// emit value to data layer
store.dispatch(addTodo({ id: 1 });
window.digitalData = { action: "added todo", id: 1 }

// invokes vendor script to retrieve user action
_satellite.track("allPages");
```

```javascript
const store = createStore({}, applyMiddleware(reduxAnalyticsDataStore));

store.dispatch(addTodo({ id: 1 });

console.log(window.digitalData); // { action: "added todo", id: 1 };
```

## References

Deinition of [Data Layer](https://marketing.adobe.com/resources/help/en_US/sc/implement/ref-data-layer.html)
