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

## 回到某个版本并删除之后的
```
1. 查看提交历史 ：首先查看您想要回退到的版本号
```
git log --oneline
```
这将显示简短的提交历史，包含每个提交的哈希值（版本号）和提交信息。

2. 回退到指定版本 ：使用hard reset强制回退
```
git reset --hard <版本号>
```
例如：

```
git reset --hard a1b2c3d4
```
3. 如果需要推送到远程仓库 ：由于这会修改历史记录，需要强制推送
```
git push --force origin <分支名>
```
例如：

```
git push --force origin main
```
注意事项 ：

- 强制重置和推送会永久删除指定版本之后的所有提交历史，请确保在执行前备份重要代码
- 强制推送会覆盖远程仓库的历史，如果多人协作，请先与团队成员沟通
- 这个操作只影响当前分支
如果您只想临时回到某个版本查看而不改变历史记录，可以使用 git checkout <版本号> 命令。
```