
### 启用开发者模式
在Android设备上进入 设置 > 关于手机 > 软件信息，连续点击 “构建号” 7次以启用开发者模式。
返回 设置 > 开发者选项，开启 USB调试 和 USB调试（安全设置）（部分设备需要）14。

### 首次通过USB连接
使用USB数据线将Android设备连接到电脑。
在电脑终端运行 `adb devices` 确认设备已识别17。


### 切换到无线模式
在终端输入以下命令，将ADB切换到TCP/IP模式：
bash
`adb tcpip 5555`
拔掉USB数据线。

### 其他不重要的

获取Android设备的IP地址
在Android设备上进入 设置 > Wi-Fi，点击当前连接的网络查看IP地址（如 192.168.1.100）14。

通过Wi-Fi连接ADB
在终端输入：

bash
adb connect <设备IP>:5555
例如：

bash
adb connect 192.168.1.100:5555
运行 adb devices 确认设备已连接17。

启动Scrcpy无线投屏
在终端运行：
bash
scrcpy
如需优化体验，可使用参数：

scrcpy -b 2M（降低码率以减少延迟）

scrcpy -m 1024（降低分辨率提升性能）

scrcpy --always-on-top（窗口置顶）37。

注意事项
首次连接必须通过USB，后续可仅通过Wi-Fi连接（需保持同一网络）。

延迟与网络质量相关，建议5GHz Wi-Fi或靠近路由器使用14。

断开无线连接 可运行 `adb disconnect <IP>:5555`
