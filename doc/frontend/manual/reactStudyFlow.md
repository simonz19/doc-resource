# react 学习线路 - 初

## react 是什么

react 是一个 web 应用前端框架,主要解决开发过程的 view 层.让我们可以模块化,组件化开发<br/>

> 初学 react 或 vue 之类的 mvvm 框架,可能会一脸懵逼,这类框架会涉及到 compile 过程,需要编译成浏览器支持的东东,也就少不了要学习脚手架相关的知识,学习成本直线上升,不过这倒是一劳永逸的事情.

## 技术栈

### [nodejs](https://nodejs.org/en/) - 基于 chrome v8 引擎开发的 js 运行时

采用 **CommonJS** 规范<br/>
nodejs 和浏览器一样,也为 js 提供了执行环境,它的出现让 js 得到了上天入地的能力,从此一种语言你可以开发 web 前端,后端,甚至桌面端.<br/>
nodejs 在 react 开发过程中主要承担起脚手架的执行环境,我们的 webpack,babel 等都是运行在 nodejs 环境中.

### [npm](https://www.npmjs.com/) - nodejs 内置的包管理工具

类似 maven 的能力,我们可以通过 npm 安装管理我们的依赖, 在项目根目录建立 **package.json** 文件来配置我们的项目信息

### [react](https://reactjs.org/) - 主角

reac 让我们可以进行组件化的开发,解决传统网页组件化的难题,其渲染思想类似于游戏渲染,通过 setState 方法触发页面渲染,同时 react 做了 virtual dom 功能,减少对浏览器性能的依赖.

### [react-router](https://www.npmjs.com/package/react-router)

简单理解为 URL 和 Components 的映射,对于现代浏览器,采用 pushState 方式进行页面无刷切换,老版本浏览器则用 hash.

### [react-redux](https://www.npmjs.com/package/react-redux) - 解决 model 层的问题

react 仅仅是一个 view 层的解决方案,我们还需要 model 层的处理,这里我们用 react-redux

### [redux-saga](https://www.npmjs.com/package/redux-saga) - redux 的一个中间件,用于解决异步问题

我们通常在 redux 里面去做一些数据请求,然而这些请求都是异步的,redux-saga 可以让你以同步的方式去编写代码,减少回调地狱,简化代码

### [webpack](https://www.webpackjs.com/) - 打包神器

react 框架提供了很多开发能力,比如 jsx:一种 js 语法糖,这些东西都是浏览器不能识别的,我们需要将这些浏览器不识别的东西编译成它识别的东西,就得靠 webpack,它提供众多插件,入门会比较难,所以现在有很多类似 creact react app 的框架出来,目的就是减少 react 开发过程中复杂的 webpack 配置,把你的注意力集中在业务开发上,但这类框架一般灵活性不太好,配置性较差,目前市面上比较好的框架有 [nextjs](https://github.com/zeit/next.js),[roadhog](https://github.com/sorrycc/roadhog),[umi](https://github.com/umijs/umi).

### [babel](https://babeljs.io/) - js 转换工具

目前我们基本使用 es6 规范来进行开发,但某些浏览器依旧对 es6 不太友好,所以我们需要用 babel 将 es6 转换成 es5,可以配置不同的转换规则.

### [ant-design](https://ant.design/index-cn) - react 组件

基于 react 的 UI 组件框架,覆盖了大部分常用组件,已经非常成熟了.

## 快速上手

建议按照以下顺序进行学习: es6 -> react -> react-router -> redux -> webpack

- (教程)[快速上手 es6](https://www.jianshu.com/p/287e0bb867ae)
- (教程)[react 中文文档](https://react.docschina.org/docs/hello-world.html)
- (实战)[写一个简单的 todoList](https://github.com/darrell0904/todolist)
- (教程)[react router 上手](http://react-china.org/t/react-router4/15843)
- (实战)[基于 ant-dedign 的一个简单 demo](https://github.com/darrell0904/react-news)
- (教程)[redux 快速上手](https://segmentfault.com/a/1190000011474522)
- (实战)[简易大众点评](https://github.com/darrell0904/webapp-dazhongdianping)
- (教程)[webpack 入门 一](https://www.jianshu.com/p/2cc4a1078953)
- (教程)[webpack 入门 二](https://www.jianshu.com/p/bf63befa5c88)
- (教程)[webpack 入门 三](https://www.jianshu.com/p/1eb4bb879745)
- (教程)[webpack 入门 四](https://www.jianshu.com/p/8a27ec0d086c)
- (实战)根据上述 webpack 教程自行封装一个出来

网上一些教程:<br/>
https://www.jianshu.com/p/c0bec50ec385
