# how to install nginx

## centos

To add NGINX yum repository, create a file named /etc/yum.repos.d/nginx.repo and paste the configuration below:

```bash
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=1
```

it is necessary to manually replace `$releasever` with either 5 (for 5.x) or 6 (for 6.x), depending upon your OS version as well as `$basearch`. see the values via link http://nginx.org/packages/centos/
