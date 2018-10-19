# nextjs 的一些学习

## about nextjs

nextjs 是针对 react 做的后端渲染框架，当然也同时支持前端渲染。

> vue 对应的后端渲染为 nuxtjs。

## 科普一下

- ### [关于前端渲染和后端渲染：](../../backend/record/front-back-render.md)

## nextjs 怎么做到的

这点可能难以理解，react 明明是前端路由，前端 fetch，后端顶多就是做个 fallback 和接口，如何才能实现后端渲染呢？nextjs 是怎么做到的？<br/>

**nextjs 不仅仅是前端的一个打包工具,还可以是一个后端服务**

若要做后端渲染，对于 react 应用来说肯定是要在 server side 搭建一个专门的 react 渲染服务，这点 nextjs 做到了。

### 开发环境

```bash
next // 开启next dev环境
```

### 正式环境

```bash
next build // 打包出next服务端渲染需要的资源
next start // 开启next node服务
```

### 导出静态文件

```bash
next build // 打包出next模式的版本
next export // 导出静态文件，这里就跟我们用webpack打包出来的差不多了
```

> 正式环境一般不用 next start 命令来开启服务，我们用自己写的 node 服务+next handler 来处理后端渲染。同时 node 服务我们用 pm2 来管理进程。

### todo 探究nextjs服务端是如何渲染的