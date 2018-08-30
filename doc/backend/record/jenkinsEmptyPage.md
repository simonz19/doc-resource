# jenkins登录后一片空白

找到.jenkins/hudson.model.UpdateCenter.xml文件vi打开

```
<?xml version='1.0' encoding='UTF-8'?>
 <sites>
   <site>
    <id>default</id>
    <url>http://updates.jenkins-ci.org/update-center.json</url>
   </site>
</sites
```
看到这个url配置，你懂啦，把url改为<http://mirror.xmission.com/jenkins/updates/update-center.json>就ok了
