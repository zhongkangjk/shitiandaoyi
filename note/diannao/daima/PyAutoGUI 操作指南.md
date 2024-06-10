# PyAutoGUI 操作指南

PyAutoGUI 是一个用于模拟鼠标和键盘操作的Python库，适用于自动化任务、测试脚本和其他需要GUI操作的应用。本文将介绍如何使用PyAutoGUI库，并提供一些常见的操作示例。

## 安装 PyAutoGUI

首先，你需要安装PyAutoGUI库。可以使用pip进行安装：

```bash
pip install pyautogui
```

## 导入 PyAutoGUI

在你的Python脚本中导入PyAutoGUI：

```python
import pyautogui
```

## 获取屏幕尺寸

获取屏幕的宽度和高度：

```python
screenWidth, screenHeight = pyautogui.size()
print(f"Screen width: {screenWidth}, Screen height: {screenHeight}")
```

## 获取鼠标位置

获取当前鼠标的X和Y坐标：

```python
currentMouseX, currentMouseY = pyautogui.position()
print(f"Mouse X: {currentMouseX}, Mouse Y: {currentMouseY}")
```

## 移动鼠标

将鼠标移动到指定位置：

```python
pyautogui.moveTo(100, 150)
```

将鼠标移动到指定位置并设置移动速度：

```python
pyautogui.moveTo(100, 150, duration=1.5)
```

相对当前鼠标位置移动：

```python
pyautogui.moveRel(30, -20)
```

## 点击鼠标

模拟鼠标点击：

```python
pyautogui.click()
```

模拟鼠标右键点击：

```python
pyautogui.rightClick()
```

模拟鼠标双击：

```python
pyautogui.doubleClick()
```

## 拖动鼠标

拖动鼠标到指定位置：

```python
pyautogui.dragTo(200, 300, duration=1.5)
```

相对当前鼠标位置拖动：

```python
pyautogui.dragRel(50, 0, duration=0.5)
```

## 键盘操作

输入文本：

```python
pyautogui.typewrite('Hello world!')
```

输入文本并设置每个字符之间的延迟：

```python
pyautogui.typewrite('Hello world!', interval=0.25)
```

按下并释放按键：

```python
pyautogui.press('enter')
```

组合键操作：

```python
pyautogui.hotkey('ctrl', 'c')
```

## 屏幕截图

截取整个屏幕并保存：

```python
screenshot = pyautogui.screenshot()
screenshot.save('screenshot.png')
```

截取屏幕的指定区域：

```python
regionScreenshot = pyautogui.screenshot(region=(0, 0, 300, 400))
regionScreenshot.save('region_screenshot.png')
```

## 图像识别

在屏幕上查找图像位置：

```python
location = pyautogui.locateOnScreen('example.png')
print(location)
```

获取图像中心点的位置：

```python
center = pyautogui.locateCenterOnScreen('example.png')
print(center)
```

## 安全中断

为了防止脚本失控，可以设置安全中断（默认情况下，如果将鼠标移动到屏幕左上角，脚本会抛出pyautogui.FailSafeException）：

```python
pyautogui.FAILSAFE = True
```

## 结论

PyAutoGUI 是一个功能强大且易于使用的库，非常适合进行自动化任务和测试脚本。通过学习上述基本操作，你可以开始编写自己的自动化脚本，并根据需要扩展功能。

有关更多详细信息和高级功能，请参阅 [PyAutoGUI 官方文档](https://pyautogui.readthedocs.io/)。

```

这篇操作指南涵盖了PyAutoGUI的基本功能，包括鼠标操作、键盘操作、截图和图像识别等内容，希望对你有所帮助。如果需要更详细的介绍，可以参考官方文档。