# 新开标签页的一些问题

一般来说我们打开浏览器新标签页有两种,一种是直接用 html 的*a 标签*(这里不做讲解),一种就是用**window.open**方法。殊不知**window.open**方法在异步中调用会在某些浏览器中爆出安全问题而被拦截（这种安全问题应该主要是防止 xss-cross site scripting 攻击），firefox 等浏览器尤其明显。

> 为什么要在异步里面去调用**window.open**呢，因为某些链接是动态生成的。。。

为了解决异步回调用被拦截，我们尝试了如下方法：

1. 动态添加一个*a 标签*，然后代码触发点击事件 --- 失败
2. 将 window.open 放入 setTimeOut 回调里 --- 失败
3. 表单提交方式 --- 失败

表单提交方式：

```var form = document.createElement('form');
form.action = 'www.baidu.com';
form.target = '\_blank';
form.method = 'POST';
document.body.appendChild(form);
form.submit();
```

**以上方法均以失败告终**

ok，看到这里，我们转变一下思路，要打开新标签页确定只能在同步方法中玩了，我们知道**window.open**会返回打开新标签页的 window 对象，那么我们能不能在异步开始前先调用**window.open**，在异步回调中调用**window.location.replace**方法替换新标签页面呢，那么**window.location.replace**会不会被浏览器给屏蔽调呢。答案是-**可以的，成功了**

回顾一下 location 更新页面的几种方式：

- `location.replce` 此方法**不会**将前一个页面加入 history 栈
- `location.assign` 此方法会将前一个页面加入 history 栈
- `location.reload` 刷新当前页面
- `location.href=xxx`以及`location=xxx` 同`location.assign`

### 衍生出来的另外一个问题

我们的系统有可能在 pc 上使用也有可能在平板上使用，那么在平板上有些 app 里内置的浏览器功能是不支持多标签页的，他始终只有个标签，那么问题来了，**window.open**后页面是跳转了，但是新页面一直白屏，为什么呢，因为打开新页面后旧页面就被摧毁了，没了，没法**replace**了。下面附上代码：

```
    const newTab = gotoLoading();
    fetch().then((resp) => {
      const token = resp.data;
      if (token && newTab) {
        newTab.location.replace(`//120.jiaoxueyi.net/${routePaths.statisticCenter}?token=${token}`);
      }
    });
```

```
// 前往跳转中转页
const gotoLoading = () => {
  const url = `${window.location.origin}/loading`;
  return window.open(url);
};
```

思来想去，最开始想出两种方案：

1. 直接把异步请求放到 loading 页，loading 页自己做**replace**操作。 - pass，维护成本太高
2. 异步回来后，弹个确认框，确认按钮用一个*a 标签*，href 当然就是请求回的 url，让用户自己去点。这种方案原则来说对开发是非常友好的，但是产品死活不干，说要点两次，影响体验。 -pass

还有什么办法呢，头大。。。。

最后想到一个比较取巧的办法：既然某些 app 只支持一个标签，那么我就不跳页了，直接在当前页进行**assign**操作，上面的gotoLoading代码只需要改动一点点：

```
// 前往跳转中转页
const gotoLoading = () => {
  const url = `${window.location.origin}/loading`;
  const ua = window.navigator.userAgent;
  const isAndroid = ua.indexOf('Android') !== -1;
  // android系统，操作当前页
  if (isAndroid) {
    return window;
  }
  return window.open(url); // 新页签
};
```

**搞定**
