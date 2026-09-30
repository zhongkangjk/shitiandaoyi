> For the complete documentation index, see [llms.txt](https://i.pixcat.cn/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://i.pixcat.cn/ocr-wen-zi-shi-bie-gong-ju.md).

# OCR文字识别工具

从图像中提取文本

## 网页工具

无需安装，打开即用。

| 名称             | 网址                                 | 备注        |
| -------------- | ---------------------------------- | --------- |
| PearOCR        | <https://pearocr.com/>             | 免费在线OCR   |
| Pickfrom 图片转文字 | <https://zh.pickfrom.net/png2text> | 支持多种图片格式  |
| MikuTools OCR  | <https://tools.miku.ac/ocr/>       | 在线小工具集合   |
| 白描网页版          | <https://web.baimiaoapp.com/>      | 免费额度，识别准确 |

## 安装使用

需要下载或部署，适合批量处理、离线使用或对隐私有要求的场景。

| 项目                                                            | 平台        | 特点                          |
| ------------------------------------------------------------- | --------- | --------------------------- |
| [hiroi-sora/Umi-OCR](https://github.com/hiroi-sora/Umi-OCR)   | Win       | 高速离线识别，批量截图，支持多语言           |
| [dynobo/normcap](https://github.com/dynobo/normcap)           | 全平台       | 截图即识别，跨平台                   |
| [pot-app/pot-desktop](https://github.com/pot-app/pot-desktop) | 全平台       | 划词+截图+OCR+翻译 多合一            |
| [ZGGSONG/STranslate](https://github.com/ZGGSONG/STranslate)   | Win       | 划词+截图+OCR，支持多种翻译源           |
| [InkTimeRecord/TTime](https://github.com/InkTimeRecord/TTime) | Win / Mac | 划词+截图+OCR+图片翻译              |
| [XMuli/SunnyPages](https://github.com/XMuli/SunnyPages)       | 全平台       | 截图工具+图片翻译+OCR               |
| [tisfeng/Easydict](https://github.com/tisfeng/Easydict)       | Mac       | 划词+OCR+截图，词典工具              |
| [xushengfeng/eSearch](https://github.com/xushengfeng/eSearch) | 全平台       | 截屏+离线OCR+搜索翻译+以图搜图+录屏       |
| [KrisLee1/panda-dict](https://github.com/KrisLee1/panda-dict) | Win       | 截图翻译+查词+OCR识别               |
| [getomni-ai/zerox](https://github.com/getomni-ai/zerox)       | 全平台       | 使用 GPT-4o-mini 的零镜头 PDF OCR |
| [plantree/ocr-pwa](https://github.com/plantree/ocr-pwa)       | PWA       | 可离线，浏览器端OCR，需部署             |

## 漫画/游戏 OCR 翻译

专门针对漫画、Galgame 等场景的 OCR + 翻译工具。

| 项目                                                                                      | 特点                         |
| --------------------------------------------------------------------------------------- | -------------------------- |
| [zyddnys/manga-image-translator](https://github.com/zyddnys/manga-image-translator)     | 漫画&图片 OCR 翻译，支持多语言         |
| [PantsuDango/Dango-Translator](https://github.com/PantsuDango/Dango-Translator)         | 漫画&图片 OCR 翻译，实时覆盖          |
| [HIllya51/LunaTranslator](https://github.com/HIllya51/LunaTranslator)                   | Galgame 专用 OCR 翻译，支持多种识别引擎 |
| [Isayama-Kagura/TsubakiTranslator](https://github.com/Isayama-Kagura/TsubakiTranslator) | Galgame OCR 翻译             |
| [hanmin0822/MisakaTranslator](https://github.com/hanmin0822/MisakaTranslator)           | Galgame+漫画 OCR，实时翻译        |
