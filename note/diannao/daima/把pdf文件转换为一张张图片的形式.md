## 代码
```python
from pdf2image import convert_from_path
import os

def convert_pdfs_to_images(folder_path):
    for filename in os.listdir(folder_path):
        if filename.endswith('.pdf'):
            pdf_path = os.path.join(folder_path, filename)
            output_folder = os.path.splitext(pdf_path)[0]  # 使用PDF文件名作为输出文件夹名
            os.makedirs(output_folder, exist_ok=True)  # 创建输出文件夹
            images = convert_from_path(pdf_path)

            for i, image in enumerate(images):
                image_path = os.path.join(output_folder, f'page_{i + 1}.png')
                image.save(image_path, 'PNG')

# 使用示例
pdf_folder_path = '.'  # 当前文件夹路径
convert_pdfs_to_images(pdf_folder_path)

```