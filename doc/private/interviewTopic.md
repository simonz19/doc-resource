# interview topic

## 浏览器相关

- http 请求如何控制缓存时间

  `cach-control` `expires` `etag`

- 接上一条, 说说 etag 工作方式

  第一次 get 请求,缓存 etag.<br/>
  第二次 get 请求,携带之前缓存的 etag 给后端,后端对比 etag,若相同返回 304,若不同返回 200,并给出新的 etag

- 说一说跨域请求的解决方法

  1. jsonp
  2. response header 添加 "access-control-allow-origin"
  3. 使用不跨域的代理服务做中转

- 谈谈对前后端分离的理解

  1. 前后端工程分离, 各自进行版本管理
  2. 前后端服务分离, 后端仅仅作为接口存在

- (中) 谈谈客户端渲染和服务端渲染及其优缺点

  发展历程: 服务端渲染(jsp,php 为代表) --> 客户端渲染 --> 服务端渲染(nextjs 和 nuxtjs 为代表)<br/>
  客户端渲染主要通过客户端 xhr 请求数据后进行渲染, 这样前后端相互依赖小, 可分别维护,但是不利于 seo<br/>
  服务端渲染具有速度快,利于 seo 的优点,数据在服务端请求并完成渲染丢给客户端,但是以 jsp 等为代表的服务端渲染前后端未分离, 可维护性差.

- 单页和多页的优缺点

  略

- 单页前端路由是如何实现的(即如何在浏览器不刷新的情况跳转路由)

  history.pushState

- (中) option 请求是什么, 什么情况浏览器会发出 option 请求

  option 请求即浏览器预请求, 多发生在跨域请求中, 浏览器会将跨域请求根据规则分为简单请求和非简单请求, 非简单请求才会发出 option 请求, 目的是在正式发送请求之前通知服务器进行请求预检, 之后才会发出正式的请求.

- (deprecated) 例举一下文件类型的 **content-type**

  1. content-type: application/x-javascript --js
  2. content-type: text/html; charset=UTF-8 --html
  3. content-type: text/css; charset=UTF-8 --css

- 简要说明 session 和 jwtToken 的优缺点

  session 一般存储在 cookie 中, 有时效性, 一般为后端设置, 使用 session 后端需维护一个 session key 和用户的关系.<br/>
  token 一般存储在 loacalstorage 中, token 中加密了用户信息, 这样后端就不用像 session 那样去维护关系, 且 token 对于前端来说可支配性更强.

  > session 也可以是用户信息, 后端生成 session 的同时, 生成一个 hash 码, 一同写入客户端 cookie, 客户端发送请求时后端结合 session 和 hash 码进行用户信息校验

## js 相关

- js 的基本数据类型有哪些

  boolean, string, number, function, undefined, object(array, null)

- typeof 和 instanceof 的区别

  typeof => 类型, instanceof => 对象

- 以点击事件为例, 如何在父元素上进行拦截, 不让子元素收到事件(捕捉和冒泡基础)

  ```javascript
  parent.addEventListener(
    "click",
    e => {
      e.stopPropagation();
    },
    true
  );
  ```

- es6 如何避免回调地狱

  promise 函数, generator 函数, async 函数

  > 可分别进行扩展问答

- (中) 什么是 thunk 函数

  为了解决传名调用而衍生出来的临时函数. js 中 thunk 函数解释为只有一个 callback 入参的柯里函数.

- 箭头函数和普通函数的区别

  箭头函数自动绑定 this, 且不能再次通过 bind 或 call 等函数改绑 this

- call apply bind 三者的区别

  call 需要将参数分开进行传递. apply 可以传递参数数组. bind 则是简单的绑定上下文, 返回一个绑定后的对象.

- 说说闭包的优缺点

  可以读取到外部函数中的变量, 但这也造就了闭包资源不容易被 GC 回收的事实.

## react 相关

- 什么是受控组件

  状态由外部控制的组件, react 渲染思想造就了受控组件的出现, 例如 input 等表单组件, 在 react 中可以通过在 input 标签上加 value 属性, 每次渲染时, input 的 value 会和通过 value 属性传递的 state value 保持同步, 这就是受控过程.

- (中) 什么是高阶组件

  官方定义: 高阶组件是一个接收组件并且返回新组件的方法. <br/>
  我们可以在高阶组件中定义和处理一些 state, 作为我们传入组件的 props. 通常在高阶组件中处理的是一些通用的逻辑.

- react 中 key 有什么作用

  key 是同级元素的唯一标识, key 帮助 react 分辨组件是否发生诸如添加或删除等变化, 在数组中须为每个顶级元素加 key 属性作为 id 标识. 另外:key 发生变化, 渲染时 react 不会使用虚拟 dom,而是重新生成一个 dom.

- (中) 说说你了解的 react Diffing 算法

  比较前后两棵树, react 首先会比较 root 元素, 比较方法会根据 root 元素的 type 不同而不同.

  1. root 的 type 不同

     type 不同会直接重新创建新的 dom 树, 旧的 dom 树会被销毁, 这里涉及 root 及其下面所有元素

  2. root 为 dom 元素, type 相同

     react 此时会比较 root 元素的属性, 且仅仅更新变化的地方.

  3. root 为组件元素, type 相同

     react 会在当前组件对象上调用 componentWillReceiveProps 和 componentWillUpdate 方法, 触发组件的更新渲染.

  4. 递归子元素

     react 会迭代对比 root 元素下面同一时间节点的子元素, 一经对比发现不同, 就会触发节点的变更. 所以如果在 root 下第一个元素之前插入一个元素, 以同一时间节点的规则来对比, 将会触发整个树的变更, 效率无疑非常差, 这时 key 的作用就明显了.

  5. key 的作用

     通过在子元素上增加 key 属性唯一标识, react 在迭代的时候根据 key 值进行比较, 效率更高.

- (中) 说明一下 redux 用来干嘛及其工作过程

  react 框架解决的问题仅仅是 view 层, 由于数据处理的需求以及解决组件状态共享问题, redux 应运而生, 其核心点有 `store`, `dispatch`, `action`, `reducer`, `state`, `中间件`.<br/>
  `store` 内每一时刻都有一个状态 `state`, 要改变 `state`, 我们需要使用 `reducer` 方法, 在 view 层调用 `dispath` 方法传递 `action` 和参数 给 `reducer`, `reducer` 通过 `action` 决定如何返回新的 `state`给 view 层. 值得注意的是 `reducer` 为纯函数.

## node 相关

- babel 能转换 api 方法吗, 如果不能, 怎么进行兼容

  babel 只能转换 syntax, 不能转换 api, 转 api 需要 babel-transform-runtime 或 babel-pollyfile 支持

- (中) babel-transform-runtime 和 babel-pollyfil 有什么区别

  runtime 不会污染全局, pollyfile 会,但是 pollyfile 兼容性更好, 同时体积也会更大

- webpack 配置中 loader 的作用是什么

  loader 主要是用来预处理 module, 比如`babel-loader`, 在 import 或 require 加载一个 module 时, `babel-loader`会根据配置处理这个 module.

- webpack 配置 filename 时, 可使用的 hash 有哪几种, 各自用于什么场景

  1. `hash`: 每次进行构建 hash 值都会改变
  2. `chunkhash`: 根据不同入口文件构建 chunk 时产生, chunk 关系发生改变, 此 hash 值改变
  3. `contenthash`: 内容级别的 hash, `extract-text-webpack-plugin`中使用此 hash, 内容发生变化, hash 即变化

- (中) webpack **dllPlugin** 有什么用, 能用于生产环境吗, 若不能请说明原因

  dllPlugin 用于将比较固定,不怎么会变化的库打包成一个文件, 目的是为了加速开发环境的编译速度, 需要进行单独的 webpack 配置打包, 不建议用于生产环境, 生产环境建议使用 CommonsChunkPlugin 更加灵活.

## 其他

- 例举一个之前做的项目中遇到的卡点, 以及如何解决的
- 有无阅读过一个优秀库的源码, 若有请说说
- css 相关
