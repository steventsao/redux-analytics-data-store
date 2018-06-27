## Problem

Analytics tracking is done by firing POST requests with identifiers and labels alongside application logic. Maintenance becomes problematic when labels need to be updated or when analytics are needed to for other vendor applications. Emitting a [digital data layer](https://www.w3.org/2013/12/ceddl-201312.pdf) helps to abstract the labels away by emitting the same values in to the browser window. As long as the path to the values remain, vendors can update the corresponding labels without altering the codebase. But the solution can be more straightforward. If the frontend application were using reactive pattern with libraries like Redux where app state has already been consolidated in a store, a middleware can be built to reflect the data layer to the current Redux store.

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
