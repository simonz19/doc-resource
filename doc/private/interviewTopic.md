# interview topic

- http 请求的文件缓存有哪些方式

  `cach-control` `expires` `etag`

  例举一下文件类型的 **content-type**:

  1. content-type: application/x-javascript js
  2. content-type: text/html; charset=UTF-8 html
  3. content-type: text/css; charset=UTF-8 css

- 说说 etag 工作方式

  第一次 get 请求,缓存 etag.<br/>
  第二次 get 请求,携带之前缓存的 etag 给后端,后端对比 etag,若相同返回 304,若不同返回 200,并给出新的 etag
