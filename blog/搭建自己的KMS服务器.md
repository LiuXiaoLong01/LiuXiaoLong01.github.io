KMS(Key Management Service)服务是微软提供给企业内部使用的自动激活工具，是微软认可的一种产品激活方式, 主要用于企业公司的内部批量激活设备。所以当你想要使用KMS激活时，你安装的Windows或者Office版本，一般镜像名中含有VL或Vol字样的即属于批量激活版本在单位内部局域网中部署KMS服务后，单位内的所有计算机便可自动激活Windows系统或Office软件。市面上存在非常多的基于KMS的激活软件，这篇文章教你如何自行搭建一个KMS服务器，免去下载激活软件的工作。
### KMS搭建
首先我们可以在 https://github.com/Wind4/vlmcsd/releases （或者 https://lxldwp.lanzoum.com/iwkVB2vghs2h ）中下载KMS服务, 下载 binaries.tar.gz：
```shell
#解压binaries.tar.gz文件 
tar -xvf binaries.tar.gz 
#进入binaries目录 
cd binaries
```
下面你可以根据实际情况选择对应的操作系统，多数服务器选择 Linux -> intel -> static -> vlmcsd-x64-musl-static 复制到 /usr/bin/ 。
```shell
#将需要运行的程序复制到/usr/bin/目录并命名为kms(便于记忆)
cp Linux/intel/static/vlmcsd-x64-musl-static /usr/bin/kms
#给kms文件赋予执行权限
chmod 755 /usr/bin/kms
```
在系统服务中新建 kms.service 文档：
```shell
vi /lib/systemd/system/kms.service
```
我们在kms.service添加以下内容 , 其中 -l /var/log/kms.log 是指定kms程序的日志文件：
```shell
[Unit]
Description=KMS Server By vlmcsd
After=network.target
 
[Service]
Type=forking
PIDFile=/var/run/kms.pid
ExecStart=/usr/bin/kms -p /var/run/kms.pid -l /var/log/kms.log
ExecStop=/bin/kill -HUP $MAINPID
PrivateTmp=true
 
[Install]
WantedBy=multi-user.target
```
重新加载服务，然后启动KMS，启动后查看服务状态，如果成功了将服务设为开机启动。
```shell
systemctl daemon-reload		# 重载服务
systemctl start kms             # 启动KMS
systemctl status kms		# 查看服务状态
systemctl enable kms		# 设为开机启动
```
以上服务安装运行成功后我们需要在防火墙开放其1688端口：
```shell
#加添防火墙开放端口1688
firewall-cmd --zone=public --add-port=1688/tcp --permanent
#重新加载防火墙
firewall-cmd --reload
#查看所有防火墙规则
firewall-cmd --list-all
```
### 激活Windows
使用管理员权限打开windows的powershell准备激活你的Windows。

微软的[KMS密钥](https://www.luisimon.com/goto/7em8 "KMS密钥")，请按照你的Windows版本选择适合的密钥（需要安装商业版本）。
```shell
#设置刚才搭建的kms服务器
slmgr /skms [你的服务器地址]
#卸载当前的密钥Key(非必要)
slmgr /upk
#安装新的密钥Key,请在网上找到可用的密钥
slmgr /ipk YC7N8-G7WR6-9WR4H-6Y2W4-KBT6X
#激活Windows
slmgr /ato
#激活状态信息
slmgr /dlv
```
这里是微软提供的各个版本软件的[KMS激活密钥](https://www.luisimon.com/goto/4bpq "KMS激活密钥")。
执行 slmgr /ato 后系统正在做激活认证处理 , 稍等片刻后会弹出激活结果 , 通常一分钟内即可完成
-----------------------------------------END-----------------------------------------
