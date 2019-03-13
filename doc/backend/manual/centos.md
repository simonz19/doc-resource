# centos 使用说明

## 快捷键

### 系统相关

- `free -m` 查看系统内存使用情况
- `df -h` 查看磁盘使用情况
- `rm -r [dirname]` 删除目录,递归删除目录下的文件,然后删除目录(会一个个提示用户是否删除文件)
- `rm -rf [dirname]` 删除目录,递归删除目录下的文件,然后删除目录(不会提示用户)
- `yum install -y [compname]` 自动安装插件 `-y` 表示自动选择并安装
- `echo $PATH` 查看当前的环境变量
- `export PATH=[pathname]:$PATH` 修改当前的环境变量
- `ps a` 查看当前终端机所有进程
- `ps -A` 查看所有进程
- `jobs -l` 查看后台进程, `-l` 表示显示 PID
- `kill [PID]` 杀进程
- `[commond] &` 后台运行进程,关闭 shell 后进程终止
- `nohup [commond] &` 后台运行进程,关闭 shell 依然运行,退出的时候用`exit`命令
- `ln -s [dir] [dir]` 创建链接,`-s` 为软链接,相当于创建快捷方式
- `tar -xf xx.tar` 解压,以下为 tar 命令参数
  - **-c**: 建立压缩档案
  - **-x**：解压
  - **-z**：有 gzip 属性的
  - **-f**: 使用档案名字,**必须放最后**
  - **-v**：显示所有过程
- `mv [filename] [filename]` 重命名或移动文件
- `du -h` 查看文件大小, `-sh`就是查看目录大小
- `netstat -ntlp` 查看端口占用情况
- `netstat -lnp|grep [port]` 查看端口号信息
- `cp -r [filename] [filename]` 复制文件 `-r`表示递归方式复制文件
- `echo 1 > /proc/sys/vm/drop_caches` 清理内存
- `mkdir` 创建目录
- `touch` 创建文件
- `serivce <service name> start|restart|stop` 开启某个 service 服务,例如:service network restart
- `source /etc/profile` profile 配置生效
- `ip addr` 显示当前 ip
- `chmod +x <shell name>` 加入写权限
- `sudo su -` get root permission

## 技巧

### 用 wget 下载 jdk:

wget --no-check-certificate --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie" [link]

### 设置环境变量

设置环境变量可以通过修改/etc/profile 文件和/etc/profile.d 下面的文件来实现。

> profile(文件)和 profile.d(目录)的区别:
>
> - profile 会在 login-shell 的时候执行,是 linux 的启动脚本,里面设置了诸如 PATH、USER 等全局变量。
> - profile.d 目录下一般存放启动脚本,这些启动脚本会在 profile 自动执行的时候通过 for 循环得到执行。

设置完环境变量不会立马生效,需重启或者执行`source /etc/profile`脚本

### vi 编辑器

vi 是 linux 系统一个强大的编辑器,通过命令`vi [filename]`来编辑文件。打开后默认是 commond mode,输入`i`切换到 insert mode,才能进行编辑操作。编辑完后，`Esc`键退出 insert mode,键入`:wq`保存并退出。

> 常用保存命令:
>
> - `:w` 保存但不退出 vi
> - `:wq` 保存并退出 vi
> - `:q` 不保存文件并退出 vi
> - `/[word]` 查找单词, `n` 下一个 `N`上一个
> - `?[word]` 自上而下查找单词, `n` 下一个 `N`上一个
> - `:set fileformat?` 查询文件格式
> - `:set fileformat=unix` 设置文件格式为unix
> - `x` delete
> - `dd` delete the whole line
> - `i` insert to the right
> - `a` insert to the left

### echo

echo 的作用其实很简单，就是打印字符串到输出文件流。

重定向:

- `>` 操作符输出重定向, 先清空再追加内容
- `>>` 操作符输出追加重定向, 直接追加内容

```bash
echo a > test.txt
cat test.txt
// a
echo b > test.txt
cat test.txt
// b
echo c >> test.txt
cat test.txt
// b
// c
```

### ssh 连接 centos

1. `chkconfig sshd on` 设置 sshd 为开机启动
2. `chkconfig --list |grep sshd` 查看设置结果
3. `service sshd start` 启动 sshd
4. `ip addr` 查看当前主机 ip
5. shell 终端根据查询的 ip 进行链接,端口默认`22`
