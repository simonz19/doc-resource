# firebase

**firebase 是 google 旗下的一款为了更好更快构建应用的开发平台.**

## firebase 能干什么

firebase 有免费版也有收费版,免费版会有些限制,不过对于小型应用应该绰绰有余.那么 firebase 能干什么吗,那就多了,有: 云函数,数据库,静态存储,甚至鉴权等功能都有.基本覆盖了一个 app 所需要的东西.

## 快速上手

```bash
npm install firebase-tools

firebase login //使用谷歌账户登录,这里需要科学上网

firebase init functions
```

## firebase 遇到的问题:

### `firebase login` 无法通过 **proxy** 来进行登录

既然 firebase 是 google 旗下的产品,那多半少不了科学上网,在初始化项目之前我们需要用 **firebase-cli** 进行谷歌账号授权登录,这里的科学上网方式采用了 vps+shadowsocks.<br/>
登录方式有两种:`firebase login` 和 `firebase login --no-localhost`.
第一种通过点击谷歌授权按钮后会打开 firebase 的本地服务进行授权,但是实践中会一直卡页面;第二种是通过谷歌授权后拿到授权码,回到 cli 进行授权,这里我们用第二种.<br/>
好了,登录方式选好了,但是又会出现另外一个问题,shadowsocks 方式科学上网不适用于所有 app,仅浏览器适用,那么我们通过适用授权码通过 node 来进行授权就会出现授权失败的问题,网上有解决方案是修改 firebase 的内置 websocket 代理服务来解决,这里小编没有试出来,但依然把这个方式说一下吧:<br/>
firebase 内置采用 faye-websocket 来链接,通过修改 `faye-websocket\lib\faye\websocket\client.js` 文件的代理路径来实现代理
加入如下配置即可:

```JavaScript
var Client = function(_url, protocols, options) {
    options = options || {};
    // 添加proxy配置
    options.proxy = {
        origin:  'http://localhost:1080', // 你的ssserver代理地址
    };
    …
}
```

#### 另外一种方式

[使用 Proxifier 进行全局代理](./proxifier.md),这种方式会使所有 app 都走代理通道.亲测 firebase 登录成功.
