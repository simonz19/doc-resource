# options 预请求

处于安全考虑,对于跨域请求浏览器会根据情况在正式请求之前进行一次预请求, 即 option 请求

## 两种请求方式

浏览器将 CORS 请求分为两类：简单请求（simple request）和非简单请求（not-simple-request）,简单请求浏览器不会预检，而非简单请求会预检。

## 如何区分

同时满足下列三大条件，就属于简单请求，否则属于非简单请求

1. 请求方式只能是：GET、POST、HEAD
2. HTTP 请求头限制这几种字段：Accept、Accept-Language、Content-Language、Content-Type、Last-Event-ID
3. Content-type 只能取：application/x-www-form-urlencoded、multipart/form-data、text/plain

对于简单请求，浏览器直接请求，会在请求头信息中，增加一个 origin 字段，来说明本次请求来自哪个源（协议+域名+端口）。服务器根据这个值，来决定是否同意该请求，服务器返回的响应会多几个头信息字段，都是以 Access-Control-开头。

1. Access-Control-Allow-Origin：该字段是必须的，\* 表示接受任意域名的请求，还可以指定域名
2. Access-Control-Allow-Credentials：该字段可选，是个布尔值，表示是否可以携带 cookie，（注意：如果 Access-Control-Allow-Origin 字段设置\*，此字段设为 true 无效）
3. Access-Control-Allow-Headers：该字段可选，里面可以获取 Cache-Control、Content-Type、Expires 等，如果想要拿到其他字段，就可以在这个字段中指定。比如图中指定的 GUAZISSO
