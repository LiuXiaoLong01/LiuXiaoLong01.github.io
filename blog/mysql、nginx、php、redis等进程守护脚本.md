# 宝塔面板常见的进程守护方法：

### 1、添加MySQL进程守护脚本方法

```shell
pgrep -x mysqld &> /dev/null

if [ $? -ne 0 ];then

bash /www/server/panel/script/rememory.sh

/etc/init.d/mysqld start

fi
```

### 2、添加Apache进程守护脚本方法

```shell
pgrep -x httpd &> /dev/null

if [ $? -ne 0 ];then

bash /www/server/panel/script/rememory.sh

/etc/init.d/httpd start

fi
```

### 3、添加nginx进程守护脚本方法

```shell
pgrep -x nginx &> /dev/null

if [ $? -ne 0 ];then

/etc/init.d/nginx start

fi
```

### 4、添加php-fpm进程守护脚本方法

```shell
pgrep -x php-fpm &> /dev/null

if [ $? -ne 0 ];then

/etc/init.d/php-fpm-{52|53|54|55|56|70|71|73} restart

fi
```

### 5、添加memcached进程守护脚本方法

```shell
pgrep -x memcached &> /dev/null

if [ $? -ne 0 ];then

/etc/init.d/memcached restart

fi
```

### 6、添加redis进程守护脚本方法

```shell
pgrep -x redis &> /dev/null

if [ $? -ne 0 ];then

/etc/init.d/redis start

fi
```
