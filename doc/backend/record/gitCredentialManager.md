# git: 'credential-cache' is not a git command

这个 git 报错会在 push event 的时候看到，究其原因是因为在 windows 中使用了如下 git 配置：<br/>

`git config --global credential.helper cache`
<br/>

有木有很熟悉，这是配置证书持久化缓存的，但是这个东东不适用于 windows，git for windows 默认集成了**credential mananger**来管理证书，所以 for windows，只要去去掉这个全局配置即可。<br/>

`git config --global --unset credential.helper`

> tips：若push的时候报错`fatal: HttpRequestException encountered`,并且要你重新输入账号密码的话，升级一下你的**credential mananger**，原因是github禁用了TLS v1.0 and v1.1。