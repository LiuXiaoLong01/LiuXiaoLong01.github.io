可以通过 `.htaccess` 文件将 `test-1.com` 及其子域名（`www.test-1.com`、`1.test-1.com`、`2.test-1.com`）分别重定向到对应的 `test-2.com` 子域名。以下是具体配置步骤：

### 1. 确保 `Apache` 已启用 `mod_rewrite` 模块

确保 Apache 启用了 `mod_rewrite` 模块并允许 `.htaccess` 文件覆盖配置：

```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

在配置中，确保包含以下内容（允许 `.htaccess` 生效）：

```apache
<Directory /var/www/html>  # 替换为你的网站根目录
    AllowOverride All
</Directory>
```

### 2. 在 `.htaccess` 中添加重定向规则

在网站根目录的 `.htaccess` 文件中添加以下规则：

```apache
RewriteEngine On

# 1. 主域名重定向（test-1.com → test-2.com）
RewriteCond %{HTTP_HOST} ^test-1\.com$ [NC]
RewriteRule ^(.*)$ http://test-2.com/$1 [L,R=301]

# 2. 子域名通配重定向（*.test-1.com → *.test-2.com）
RewriteCond %{HTTP_HOST} ^(www|1|2)\.test-1\.com$ [NC]
RewriteRule ^(.*)$ http://%1.test-2.com/$1 [L,R=301]
```

### 规则解释：

1. 主域名重定向：

	- 当访问 `http://test-1.com` 或 `http://test-1.com/`任何路径 时，重定向到 `test-2.com`。

	- `[NC]`：忽略大小写。

	- `[R=301]`：永久重定向（SEO 友好）。

2. 子域名通配重定向：

	- 使用正则表达式 `^(www|1|2)` 匹配 `www.test-1.com`、`1.test-1.com`、`2.test-1.com`。

	- `%1` 表示捕获的子域名（如 `www`、`1`、`2`），将其拼接到目标域名 `test-2.com` 前。

	- 例如：`1.test-1.com` → `1.test-2.com`，路径保持不变。

### 3. 保存 `.htaccess` 文件后，测试访问是否正常重定向

### 4. 配置 HTTPS 重定向（可选）

如果目标域名支持 `HTTPS`，可以将 `http://` 改为 `https://`。
