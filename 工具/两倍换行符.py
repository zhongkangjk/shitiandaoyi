import os
import re
import glob

def normalize_newlines(text):
    """将所有换行符统一为 \n"""
    return text.replace('\r\n', '\n').replace('\r', '\n')

def process_md_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # 统一换行符
    content = normalize_newlines(content)

    # 使用正则表达式将每个句号、感叹号和问号后面插入两个换行符
    # 同时考虑句号、感叹号、问号后面可能跟着引号、括号等符号的情况
    processed_content = re.sub(r'([。！？])([”’））]?)', r'\1\2\n\n', content)

    # 为了确保效果，将连续多个换行符替换为两个换行符
    processed_content = re.sub(r'\n+', '\n\n', processed_content)

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(processed_content)

if __name__ == "__main__":
    # 获取当前文件夹内所有的.md文件
    md_files = glob.glob("*.md")

    # 处理每个.md文件
    for md_file in md_files:
        process_md_file(md_file)
        print(f"Processed {md_file}")
