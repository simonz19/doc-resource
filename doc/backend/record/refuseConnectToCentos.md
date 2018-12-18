# connection refused by centos

CentOS 7 has take **firewall** instead of **iptables** as filter system to manage ip and port, so just commond like below to add port which you want visit from other machines:

```bash
sudo firewall-cmd --zone=public --add-port=8080/tcp --permanent
sudo firewall-cmd --reload
sudo firewall-cmd --list-ports
```
