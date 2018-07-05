## What is unidirectional data flow?

> All data in an application follows the same lifecycle pattern, making the logic of your app more predictable and easier to understand. It also encourages data normalization, so that you don't end up with multiple, independent copies of the same data that are unaware of one another.


```javascript
let reducer = (action, state) => nextState;

function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter)
​
// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.
​
store.subscribe(() =>
  console.log(store.getState())
)
​
// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1
```

### It's conventional

- Redux
  ![](redux_diagram.png)
- Flux
  ![](flux_graph.png)
- Angular
- Elm
- Mobx

### Implied one-way data binding
| description      | two-way                            | one-way      |
| ---------------- | ---------------------------------- | ------------ |
| mutation happens | in the view, controller, and model | in actions   |
| source of truth  | in MVC                             | in the store |



- In AngularJS and slide 1, the view changes when the state does, and vice versa. 
- State can be changed by both the view and the controller and the service.


```javascript
// Action -> Reducer -> Store -> View -> Action -> ...
```