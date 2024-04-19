## 查看Git代理设置和相关命令

### 1. 查看当前的代理设置

```bash
git config --global --get http.proxy
git config --global --get https.proxy
```

### 2. 设置代理

```bash
git config --global http.proxy http://127.0.0.1:1080
git config --global https.proxy http://127.0.0.1:1080
```

### 3. 清除代理设置

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 设置名字和邮箱

```bash
git config --global user.name "your name"
git config --global user.email "your email"
```