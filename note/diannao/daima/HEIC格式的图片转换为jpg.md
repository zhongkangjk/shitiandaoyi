换了手机以后默认图片格式改成了heic，
挺好，
但叼毛爱普生的打印软件并不支持，
只能想办法转了，
用格式工厂转换直接闪退，
可能是我的软件有点问题，
写个python文件来处理


一开始是这样的：
```python
import os
import pyheif
from PIL import Image

def convert_heic_to_jpg(heic_file, jpg_file):
    heif_file = pyheif.read(heic_file)
    image = Image.frombytes(
        heif_file.mode, 
        heif_file.size, 
        heif_file.data,
        "raw",
        heif_file.mode,
        heif_file.stride,
    )
    image.save(jpg_file, "JPEG")

# 获取当前目录下所有HEIC文件
heic_files = [f for f in os.listdir('.') if f.lower().endswith('.heic')]

# 逐个转换文件
for heic_file in heic_files:
    jpg_file = f"{os.path.splitext(heic_file)[0]}.jpg"
    convert_heic_to_jpg(heic_file, jpg_file)
    print(f"Converted {heic_file} to {jpg_file}")
```
后来在安装包的过程中发现pyheif这个包很难装上，
就查了一下，
pyheif 目前只支持 Linux 和 Mac，而在 Windows 上无法安装也无法使用，
如果非要在 Windows 上使用 pyheif，可能需要手动安装 libheif 库，并确保其头文件和库文件的路径被添加到系统的 PATH 环境变量中。这通常涉及到下载 libheif 的源代码，编译并安装，然后在安装 pyheif 时指定正确的包含和库路径。

我显然没有这个实力，
只能使用适用于 Windows 的替换包 pillow_heif，
于是变成了这样：
```python
import os
from PIL import Image
import pillow_heif

# 注册HEIF插件
pillow_heif.register_heif_opener()

def convert_heic_to_jpg(heic_file, jpg_file):
    with Image.open(heic_file) as im:
        im.save(jpg_file, "JPEG")

# 获取当前目录下所有HEIC文件
heic_files = [f for f in os.listdir('.') if f.lower().endswith('.heic')]

# 逐个转换文件
for heic_file in heic_files:
    jpg_file = f"{os.path.splitext(heic_file)[0]}.jpg"
    convert_heic_to_jpg(heic_file, jpg_file)
    print(f"Converted {heic_file} to {jpg_file}")

```
后来转换完了发现比源文件小一半，这显然不科学，
找到两个保存质量的参数来更改代码，
`im.save(jpg_file, "JPEG", quality='keep')`
`im.save(jpg_file, "JPEG", quality=95)`

用了一下第一个，发现并不好使，
在使用pillow_heif时，quality='keep'选项只适用于原始图像已经是JPEG格式的情况。由于HEIC格式与JPEG不同，并不能使用'keep'作为质量参数，
于是就使用了第二个。
但和源文件也差不多，
估计损失了不少东西，
但就这样吧