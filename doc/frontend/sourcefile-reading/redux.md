# redux-3.7.2

## 什么是 redux

react 只是 view 层的框架, redux 可以用来进行 react 组件状态管理.

## 工作流

可以简单的用下图进行概括:

![img](../../../assets/redux-flow.jpg)

关键字: `actoin`, `actionCreater`, `store`, `reducer`, `state` , `dispatch`.

view 层发生用户操作(action) ==> view 层通知 redux 用户发起了操作 (`dispatch(action)`) ==> redux 调用 reducer 方法根据 action 处理 state, 并返回新的 state ==> 通知事先在 view 层订阅过的 listener ==> listener 收到通知,view 层拿新的 state 进行更新 ==> 用户看到操作结果

## 使用 redux 我们需要做什么

- 编写 reducer 函数, 有两个入参, 分别是 state 和 action, 通过 action 处理 state 并返回新的 state.
- 编写 actionCreaters, 可以是函数也可以是对象, 作为对象时, 此对象应该是所有属性都是函数的对象. 这些函数分别生成对应的 action.

## 源码基本结构

index.js 暴露出来的几个方法 `createStore`, `combineReducers`, `bindActionCreators`, `applyMiddleware`, `compose`. 分别对应一个文件, 这就是 redux 源码的核心了.

### createStore

```javascript
export default function createStore(reducer, preloadedState, enhancer) {
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error("Expected the enhancer to be a function.");
    }

    return enhancer(createStore)(reducer, preloadedState);
  }
}
```

我们可以看到 createStore 有三个入参: 外部定义的 reducer, 初始的 state, 和一个 redux 增强函数, 官方提供了一个增强函数,就是 `applyMiddleware`.

> 值得注意的是, 若传入了 enhancer, store 的创建将交由 enhancer 来完成. enhancer 例子请看`applyMiddleware`

createStore 方法返回 `getState`, `dispatch`, `subscribe`, `replaceReducer`, 供外部调用.

- `creatStore` 方法内部管理着 currentState, 你可以通过 `getState` 方法获得.
- `dispatch` 方法接受 action 入参, 并返回 action.

  ```javascript
  function dispatch(action) {
    // ...
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    const listeners = (currentListeners = nextListeners);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }

    return action;
  }
  ```

  会触发 creatStore 函数传进来的 reducer 函数, reducer 会收到两个入参, state 和 action. 通过这两个参数 reducer 需要返回一个新的 state 供 store 进行持久化保存. state 发生变更后会遍历触发外部订阅的 listeners, listener 的订阅由 `subscribe` 函数实现. 在 listener 里你可以通过`getState`获取新的 state, 进行页面更新.

- `subscribe` 方法用于订阅 listener, 它返回一个函数, 执行即可取消订阅.

  ```javascript
  function subscribe(listener) {
    if (typeof listener !== "function") {
      throw new Error("Expected listener to be a function.");
    }

    let isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }
  ```

  值得注意的是`ensureCanMutateNextListeners`这个函数, 我们看他做了什么:

  ```javascript
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  ```

  这里为什么需要两个 listeners 对象来进行管理?

  答案我们可以从 `dispatch` 方法中找到, 我们知道 `dispatch` 会触发 listener 遍历执行, 如果 listener 里面又有`subscribe`进行订阅会发生什么, 那么遍历过程可能会出现错误.

  所以我们在增删 listeners 时, 将 nextListeners 作为 currentListeners 的一个副本, 采用 nextListeners 来进行增删, 而执行的时候采用 currentListeners 来执行, 这样即使在 listener 执行过程中发生了订阅, 也不会影响到 currentListeners 的遍历.

- `replaceReducer` 可以替换 reducer.

  ```JavaScript
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }

    currentReducer = nextReducer
    dispatch({ type: ActionTypes.INIT })
  }
  ```

  替换后, 会默认触发一次 dispatch.

### combineReducers

store 中的 state 可以细分成很多模块, 我们可以将每个模块的 key 作为一个 namespace, 不同模块在对应的 namespace 下进行状态更新, 例如:

```javascript
const state = {
  student: {
    // ...student state
  },
  teacher: {
    // ...teacher state
  }
};
```

细分了 state, 那我们也可以细分 reducer, 生成对应 namespace 的 reducer, 每个 reducer 只处理对应模块的状态.

```javascript
const reducers = {
  student: (studentState, action) => {
    // return newStudentState
  },
  teacher: (teacherState, action) => {
    // return newTeacherState
  }
};
```

官方提供了`combineReducers` 函数, 可以将多个 reducer 合并成一个 reducer.

```JavaScript
export default function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers)
  const finalReducers = {}
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  const finalReducerKeys = Object.keys(finalReducers)
  // ...
  return function combination(state = {}, action) {
    // ...
    let hasChanged = false
    const nextState = {}
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i]
      const reducer = finalReducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === 'undefined') {
        const errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    return hasChanged ? nextState : state
  }
}
```

`combineReducers` 其实就是一个 reducer 装饰者, 该函数接受一个对象, 该对象应该是 reducer 的一个集合, 其中每个 key 对应着 state 里面的 key, 这样就可以实现 state 交由相同 namespace 的 reducer 进行处理.

> 已知缺点: 虽然做了模块划分, 但是 dispatch 后, 所有细分 reducer 还是都会执行.

### bindActionCreators

该函数可以将 actionCreator 和 dispatch 进行绑定, 执行的时候自动产生对应的 action, 并调用 dispatch.

```javascript
export default function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === "function") {
    return bindActionCreator(actionCreators, dispatch);
  }
  // ...
  const keys = Object.keys(actionCreators);
  const boundActionCreators = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === "function") {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
```

当传入的 actionCreators 为函数时, 返回的也是函数, 我们看看 `bindActionCreator` 做了什么:

```javascript
function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args));
}
```

`bindActionCreator` 函数返回的函数执行就会立马通过 actionCreator 产生 action,并触发 dispatch. 可以理解为 dispatch 和 actioncreator 的简单封装.

当传入的 actionCreators 为对象时, 返回的也是对象, 且此对象的所有 keys 保持与 actionCreators 的 keys 相同. 该对象为 `bindActionCreator` 封装后的函数的集合.

### applyMiddleware

`applyMiddleware` 是 redux 官方提供的一个 enhancer, 目的是改造 dispatch 方法,为其添加中间执行过程.

```javascript
export default function applyMiddleware(...middlewares) {
  return createStore => (reducer, preloadedState, enhancer) => {
    const store = createStore(reducer, preloadedState, enhancer);
    let dispatch = store.dispatch;
    let chain = [];

    const middlewareAPI = {
      getState: store.getState,
      dispatch: action => dispatch(action)
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch
    };
  };
}
```

由于`createStore` 方法有 enhancer 带入, store 的创建就会交由 enhancer 来处理,这里`applyMiddleware`作为一个 enhancer 需要返回一个 store.

传进来的`middlewares` 入参是一个中间件数组, 首先会遍历执行, 将 `middlewareAPI` 传递给每个中间件, 此时中间件持有`getState` 和`dispatch` 方法.

最后, 调用了 redux 官方提供的`compose`方法, 将中间件和 dispatch 按照顺序组装到一个函数里面作为 store 的新的 dispatch 函数, 至此, dispatch 函数改造完成.

### compose

`compose` 是 redux 官方提供的一个函数组装方法, 可以将 funcs 组装成形如:

```javascript
compose(f,g,h){
  return (...args) => f(g(h(...args)));
}
```

下面是源码:

```javascript
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
```
