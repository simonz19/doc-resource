# 名词解析

- TTL: time to live 域名解析的生命周期,缓存到当地递归 dns 服务器上的时间,超过这个时间后,会再次向 dns 服务器请求,然后再次缓存
- DDOS 攻击: destributed denail of service,通过大量合法请求占用服务器资源, 让服务器处于瘫痪状态
- pv: page view，页面浏览次数
- uv: unique visitor，独立访客数
- 正向代理： 代理服务器在客户端与服务器端之间，客户端需要指定代理服务器地址，例如 fiddler 代理。
- 反向代理： 代理服务器在服务端，比较火的就是`nginx`，可以实现静态资源分发，负载均衡，减小直接访问目标服务器产生的压力。
- compile => resolve, build => parse
