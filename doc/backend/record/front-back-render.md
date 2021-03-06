# 前端渲染 vs 后端渲染

一直以来后端渲染都是行业普遍的方式，不仅对 seo 友好，而且响应速度快，不过因为前后端没有分离而导致开发和维护成本较高。不过随着今年前端技术的不断发展，前端目前已经能够自立门户跟后端分家说拜拜了，各种框架应运而生，比如典型的 react 和 vue。<br/>
react 和 vue 是最典型的前端渲染框架，完全的 ajax 请求渲染，pushState 路由特性，基本跟后端完全分离，后端仅仅是做接口的存在。

## 前端渲染

- 渲染模板在前端,通过 ajax 请求拿数据,填充模板进行渲染。
- 后端仅仅作为接口管理者。
- 不利于 seo,网络爬虫有些不支持 ajax 请求。
- 把性能压力转到 client 客户端。

> spa 应用特点:
>
> - 仅仅拥有一个 html 模板容器,没有内容,内容都是通过 js 进行渲染.
> - 资源一次性加载,含有前端框架,体积变大. 解决方案-分包拆包或者`dynamicImport`
> - history 采用`pushstate`模式(无刷新切换路由),路由由前端进行控制渲染,后端需做`fallback`,否者刷新页面会报 404.

## 后端渲染

- 渲染模板在后端,后端拿数据后根据模板渲染,吐出带有内容的 html 给到浏览器呈现。
- seo 非常友好。
- 响应速度快，服务端内网请求数据进行渲染。
- 服务器端压力较大。

> 科普一下：关于静态页面和动态页面<br/>
> 一般来说可以简单的理解为后端渲染的什么 jsp，php 模板都是动态页面，后端会根据数据对动态页面进行处理，然后丢出静态的 html 给到浏览器解析。静态页面可以简单理解为就是html格式的页面，客户端在访问服务端拿document（页面）的时候，服务端是直接把目标文件返回给客户端。
