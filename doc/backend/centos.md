# centos 使用说明

## 快捷键

### 系统相关

* `free -m` 查看系统内存使用情况

* `df -h` 查看磁盘使用情况
 
* `rm -r [dirname]` 删除目录,递归删除目录下的文件,然后删除目录(会一个个提示用户是* 否删除文件)
 
* `rm -rf [dirname]` 删除目录,递归删除目录下的文件,然后删除目录(不会提示用户)
 
* `yum install -y [compname]` 自动安装插件 -y表示自动选择并安装
 
* `echo $PATH` 查看当前的环境变量
 
* `export PATH=[pathname]:$PATH` 修改当前的环境变量
 
* `ps a` 查看当前所有进程
 
* `jobs -l` 查看后台进程, -l表示显示PID

* `kill [PID]` 杀进程

* `[commond] &` 后台运行进程,关闭shell后进程终止

* `nohup [commond] &` 后台运行进程,关闭shell依然运行,退出的时候用**exit**命令