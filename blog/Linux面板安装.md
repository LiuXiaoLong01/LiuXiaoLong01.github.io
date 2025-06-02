宝塔Linux面板是提升运维效率的服务器管理软件，支持一键LAMP/LNMP/集群/监控/网站/FTP/数据库/JAVA等100多项服务器管理功能。

## Linux面板安装脚本

### 正式版：9.4.0

推荐安装，已经公测且稳定的版本，每月会更新新功能，推荐使用Debian12系统

通用安装脚本（推荐）

```bash
if [ -f /usr/bin/curl ];then curl -sSO https://download.bt.cn/install/install_panel.sh;else wget -O install_panel.sh https://download.bt.cn/install/install_panel.sh;fi;bash install_panel.sh ed8484bec
```

#### 正式版历史版本

可选历史的指定版本安装，仅限在没有安装过宝塔面板的服务器中使用

##### 9.3.0

```bash
if [ -f /usr/bin/curl ];then curl -sSO https://download.bt.cn/install/install_nearest.sh;else wget -O install_nearest.sh https://download.bt.cn/install/install_nearest.sh;fi;bash install_nearest.sh ed8484bec
```

##### 9.2.0

```bash
if [ -f /usr/bin/curl ];then curl -sSO https://download.bt.cn/install/install_second_nearest.sh;else wget -O install_second_nearest.sh https://download.bt.cn/install/install_second_nearest.sh;fi;bash install_second_nearest.sh ed8484bec
```

### 稳定版：9.0.0

推荐公司、企事业单位及生产环境使用，特别注重安全和稳定性，只修BUG，不加新功能

通用安装脚本（推荐）

```bash
url=https://download.bt.cn/install/install_lts.sh;if [ -f /usr/bin/curl ];then curl -sSO $url;else wget -O install_lts.sh $url;fi;bash install_lts.sh ed8484bec
```

### 宝塔Linux面板企业版：9.4.0
[宝塔Linux面板企业版](https://www.bt.cn/new/ltd_trial "宝塔Linux面板企业版")是Linux面板的付费版本。绑定账号后，您可以试用14天。14天后，您需要付费才能使用

通用安装脚本（推荐）

```bash
if [ -f /usr/bin/curl ];then curl -sSO https://download.bt.cn/install/install_ltd.sh;else wget -O install_ltd.sh https://download.bt.cn/install/install_ltd.sh;fi;bash install_ltd.sh
```

更多内容请查阅[宝塔面板下载，免费全能的服务器运维软件](https://www.bt.cn/new/download.html "宝塔面板下载，免费全能的服务器运维软件")
