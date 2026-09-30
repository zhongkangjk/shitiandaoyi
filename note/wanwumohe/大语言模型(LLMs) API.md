> For the complete documentation index, see [llms.txt](https://i.pixcat.cn/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://i.pixcat.cn/da-yu-yan-mo-xing-llms-api.md).

# 大语言模型(LLMs) API

#### 相关

{% embed url="<https://github.com/open-free-llm-api/awesome-freellm-apis/blob/main/README.zh-CN.md>" %}

{% embed url="<https://models.dev/>" %}

{% embed url="<https://priceai.cc/>" %}

### 一、提供免费额度的模型供应商

> 以下提供商均提供永久或长期免费层级，暴露 OpenAI 兼容接口。按获取免费额度的门槛由低到高排列。

#### 1.1 无需信用卡

| 提供商                       | 免费模型数 | 最大上下文 | 能力                       | 获取密钥                                                                   |
| ------------------------- | ----- | ----- | ------------------------ | ---------------------------------------------------------------------- |
| **Cloudflare Workers AI** | 39    | 10M   | 代码、图像、推理、文本、视频           | [console.cloudflare.com](https://console.cloudflare.com)               |
| **GitHub Models**         | 16    | 1M    | 图像、PDF、推理、文本             | [github.com/marketplace/models](https://github.com/marketplace/models) |
| **Google Gemini**         | 15    | 1M    | 音频、图像、PDF、推理、文本、视频、视觉    | [aistudio.google.com](https://aistudio.google.com)                     |
| **LLM7.io**               | 13    | 1M    | 音频、代码、图像、PDF、推理、文本、视频、视觉 | [llm7.io](https://llm7.io)                                             |
| **Groq**                  | 12    | 262K  | 图像、推理、文本                 | [console.groq.com](https://console.groq.com)                           |
| **Mistral AI**            | 12    | 256K  | 代码、图像、文本                 | [console.mistral.ai](https://console.mistral.ai)                       |
| **Cohere**                | 12    | 436K  | 图像、文本                    | [cohere.com](https://cohere.com)                                       |
| **Kilo Code**             | 12    | 1M    | 音频、代码、图像、推理、文本、视频        | [kilo.ai](https://kilo.ai)                                             |
| **Cerebras**              | 8     | 131K  | 图像、推理、文本                 | [cerebras.ai](https://cerebras.ai)                                     |
| **Hugging Face**          | 7     | 131K  | 代码、文本                    | [huggingface.co](https://huggingface.co)                               |
| **Z AI (智谱AI)**           | 4     | 200K  | 图像、推理、文本、视频              | [open.bigmodel.cn](https://open.bigmodel.cn)                           |

**亮点说明：**

* **Groq** — 美国 AI 芯片独角兽，推理速度极快，推荐新手首选（30次/分钟免费额度）
* **Google Gemini** — 免费层级最强，Gemini 2.5 Flash 支持 1M 上下文与多模态，250,000 tokens/分钟
* **Cloudflare Workers AI** — 模型数量最多（39个），涵盖代码、图像、视频等多领域
* **GitHub Models** — 免费提供 GPT-5、GPT-4.1、GPT-4o、o4-mini、Grok 3 等主流模型（速率限制与 Copilot 订阅等级挂钩）
* **Cerebras** — 开源模型为主，推理速度极快，支持 `openai/gpt-oss-120b` 和 `gpt-oss-20b`

***

#### 1.2 需注册（无需信用卡）

| 提供商                       | 免费模型数 | 最大上下文 | 能力                | 获取密钥                                                   |
| ------------------------- | ----- | ----- | ----------------- | ------------------------------------------------------ |
| **ModelScope (魔搭社区)**     | 53    | 1M    | 音频、图像、推理、文本、视频、视觉 | [modelscope.cn](https://www.modelscope.cn)             |
| **Ollama Cloud**          | 14    | 1M    | 音频、代码、图像、推理、文本、视频 | [ollama.com](https://ollama.com)                       |
| **OVHcloud AI Endpoints** | 14    | 262K  | 音频、代码、图像、推理、文本、视频 | [ovhcloud.com](https://ovhcloud.com)                   |
| **OpenCode Zen**          | 8     | 1M    | 音频、推理、视觉          | [opencode.ai](https://opencode.ai)                     |
| **Aion Labs**             | 7     | 131K  | 文本                | [aionlabs.ai](https://aionlabs.ai)                     |
| **Agnes AI**              | 5     | 256K  | 图像、文本、视频、视觉       | [agnes-ai.com](https://agnes-ai.com)                   |
| **阿里云百炼**                 | 5     | 1M    | 代码、图像、文本          | [dashscope.aliyun.com](https://dashscope.aliyun.com)   |
| **SambaNova**             | 4     | 128K  | 图像、推理、文本          | [sambanova.ai](https://sambanova.ai)                   |
| **SiliconFlow (硅基流动)**    | 3     | 131K  | 文本                | [siliconflow.cn](https://siliconflow.cn)               |
| **xAI**                   | 3     | 2M    | 文本                | [x.ai](https://x.ai)                                   |
| **DeepSeek**              | 2     | 128K  | 文本                | [platform.deepseek.com](https://platform.deepseek.com) |
| **AI21 Labs**             | 2     | 256K  | 文本                | [studio.ai21.com](https://studio.ai21.com)             |
| **Nebius**                | 1     | 128K  | 文本                | [studio.nebius.com](https://studio.nebius.com)         |

**亮点说明：**

* **ModelScope (魔搭社区)** — 阿里云旗下，绑定阿里云账号即可免费使用，共享每天 2000 次调用额度，模型数量最多（53个）
* **SiliconFlow** — 国内站注册送 14 元余额，国际站注册送 1 美元，主要提供开源模型，部分模型可免费使用
* **DeepSeek** — 代码和数学能力突出，官方平台提供 DeepSeek Chat (V3.2) 等模型免费额度
* **SambaNova** — 美国 AI 芯片公司，推理速度极快，开源模型为主
* **阿里云百炼** — 提供通义千问（Qwen）系列，Qwen3-Max 等模型可免费使用

***

#### 1.3 需手机验证

| 提供商            | 免费模型数 | 最大上下文 | 能力                       | 获取密钥                                         |
| -------------- | ----- | ----- | ------------------------ | -------------------------------------------- |
| **NVIDIA NIM** | 123   | 1M    | 音频、嵌入、图像、推理、重排序、文本、视频、视觉 | [build.nvidia.com](https://build.nvidia.com) |

**亮点说明：**

* **NVIDIA NIM** — 模型数量最多（123个），涵盖音频、嵌入、图像、视频、视觉等全模态能力。需手机验证但无需信用卡。支持 DeepSeek R1、DeepSeek V3 等热门模型。

***

#### 1.4 付费后享有免费层

| 提供商            | 免费模型数 | 说明                     | 获取密钥                                   |
| -------------- | ----- | ---------------------- | -------------------------------------- |
| **OpenRouter** | 22+   | 免费层 + 充值 $10 → 1000次/天 | [openrouter.ai](https://openrouter.ai) |

**亮点说明：**

* **OpenRouter** — 国际最大的中转站之一，部分模型可免费使用。新模型发布前可能在此匿名测试。支持 35+ 免费模型，单 API Key 统一管理。

***

#### 1.5 各提供商最佳免费模型推荐

| 提供商           | 推荐模型                      | 模型 ID                                      | 最大上下文 |
| ------------- | ------------------------- | ------------------------------------------ | ----- |
| Groq          | Moonshot Kimi K2          | `moonshotai/kimi-k2-instruct`              | 131K  |
| Google Gemini | Gemini 3.6 Flash          | `gemini-3.6-flash`                         | 1M    |
| Mistral AI    | Mistral Medium 3.5 (128B) | `mistral-medium-3-5-128b`                  | 256K  |
| Cohere        | Command A+ (218B)         | `command-a-218b`                           | 436K  |
| Cloudflare    | Llama 3.3 70B (FP8)       | `@cf/meta/llama-3.3-70b-instruct-fp8-fast` | 131K  |
| DeepSeek      | DeepSeek Chat (V3.2)      | `deepseek-chat-v3-2`                       | 128K  |
| Z AI (智谱AI)   | GLM-4.7-Flash             | `glm-4.7`                                  | 200K  |
| 阿里云百炼         | Qwen3-Max                 | `qwen3-max`                                | 128K  |
| OpenRouter    | Nemotron 3 Ultra (免费)     | `nvidia/nemotron-3-ultra-550b-a55b:free`   | 1M    |

***

### 二、API 中转站

> 中转站适合需要统一入口、灵活计费或官方渠道受限的场景。以下按服务区域和用途分类。

#### 2.1 国内中转站

| 名称             | 网址                                       | 说明                                                                                         |
| -------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------ |
| **硅基流动**       | [siliconflow.cn](https://siliconflow.cn) | 开源模型为主，注册送 14 元余额，部分模型免费。只支持手机号注册。                                                         |
| **七牛云**        | [qiniu.com](https://www.qiniu.com)       | 主要提供国内开源模型，也有国外部分模型。走邀请链接得 300 万 Token。                                                    |
| **packyapi**   | [packyapi.com](https://www.packyapi.com) | 注册送 $1 余额，支持 Claude Code & CodeX & Gemini CLI。                                             |
| **FishXCode**  | [fishxcode.com](https://fishxcode.com)   | 声称 Anthropic 官方 API 直连，支持 Claude Code & CodeX，可开发票，注册送 $0.1。                               |
| **Code Link**  | [aicodelink.top](https://aicodelink.top) | 注册送 $2 余额，支持 Claude Code & CodeX。                                                          |
| **银河录像局**      | [nf.video](https://api.nf.video)         | 注册送 $0.4 余额，可开发票。Claude Code 独立站：[cc.yhlxj.com](https://cc.yhlxj.com/claude/web/dashboard) |
| **OAIPro**     | [oaipro.com](https://api.oaipro.com)     | 官转，价格和官方一致。                                                                                |
| **一叶知秋 API**   | [88996.cloud](https://88996.cloud)       | 支持 Claude Code & CodeX，可开发票。                                                               |
| **Right Code** | [right.codes](https://api.right.codes)   | 注册送 $1 余额，支持 Claude Code & CodeX。                                                          |
| **星辰 AI**      | [centos.hk](https://ai.centos.hk)        | 支持 Claude Code & CodeX，支持 gpt-image-2 生图，可开发票（累计充值 $1000 以上）。                              |
| **aiapi**      | [aiapi.cc](https://aiapi.cc)             | 注册送 $5 余额，支持 Claude Code，提供“无限包月”套餐（最低 399 元起）。                                            |
| **UoCode**     | [uocode.com](https://www.uocode.com)     | 注册送 $0.2 余额，支持 Claude Code & CodeX。                                                        |

***

#### 2.2 国际中转站

| 名称                   | 网址                                                                 | 说明                                                             |
| -------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------- |
| **OpenRouter**       | [openrouter.ai](https://openrouter.ai)                             | 国际最大中转站之一，官转，部分模型免费。                                           |
| **Nebius AI Studio** | [studio.nebius.com](https://studio.nebius.com)                     | 开源模型为主，国际站。                                                    |
| **SiliconFlow**      | [siliconflow.com](https://www.siliconflow.com)                     | 硅基流动国际站，比国内站多些国外模型，注册送 $1。                                     |
| **Cerebras**         | [cerebras.ai](https://www.cerebras.ai)                             | 开源模型为主，美国 AI 芯片公司，推理速度极快。                                      |
| **Groq**             | [groq.com](https://groq.com)                                       | 开源模型为主，美国 AI 芯片公司，推理速度极快。                                      |
| **SambaNova**        | [sambanova.ai](https://sambanova.ai)                               | 开源模型为主，美国 AI 芯片公司，推理速度极快。                                      |
| **DigitalOcean**     | [digitalocean.com](https://www.digitalocean.com/products/gradient) | 主要做 VPS 业务，兼营 AI 推理。                                           |
| **Chutes**           | [chutes.ai](https://chutes.ai)                                     | 去中心化 AI 推理网络。                                                  |
| **MegaLLM**          | [megallm.io](https://megallm.io)                                   | 单 API 访问 Claude、GPT-5、Gemini、Llama 等 70+ 模型。暂不支持邮箱注册，需第三方账号登录。 |

***

#### 2.3 Claude Code / CodeX 专用中转站

> 以下中转站 API 仅限在 Claude Code、CodeX 或 Gemini CLI 中使用。

**有免费额度**

| 名称              | 网址                                         | 说明                                                      |
| --------------- | ------------------------------------------ | ------------------------------------------------------- |
| **Any Router**  | [anyrouter.top](https://anyrouter.top)     | 老牌公益站，需 EDU 邮箱注册，每天登录自动签到得 $25 余额。建议避开高峰期。              |
| **FreeModel**   | [freemodel.dev](https://freemodel.dev)     | 注册免费送 Pro 会员，$300 额度分 4 周送（每周 $66.67）。需验证手机号或 Telegram。 |
| **RawChat 公益站** | [sharedchat.cc](https://new.sharedchat.cc) | 需 QQ 数字邮箱注册，每天 $30 额度，每天重置不累加，需每天手动领取。                  |

**收费中转站**

| 名称              | 网址                                           | 说明                                   |
| --------------- | -------------------------------------------- | ------------------------------------ |
| **RawChat**     | [rawchat.cn](https://rawchat.cn)             | 主站为网页聊天，编程用需进入左侧栏 "Vibe Code"。       |
| **Right Code**  | [right.codes](https://right.codes)           | 走邀请注册后购买订阅可多获 5% 额度。                 |
| **HorseCoding** | [horsecoding.cc](https://www.horsecoding.cc) | 目前关闭注册，需邀请码。稳定性一般，建议仅用免费额度。          |
| **Pirvnode**    | [privnode.com](https://privnode.com)         | 注册送 $10 余额。                          |
| **FoxCode**     | [foxcode.rjj.cc](https://foxcode.rjj.cc)     | 支持 Claude Code & CodeX。              |
| **SSSAiCode**   | [sssaicode.com](https://www.sssaicode.com)   | 仅支持 Claude Code & CodeX。             |
| **SuperXiaoai** | [superxiaoai.com](https://superxiaoai.com)   | 支持 Claude Code & CodeX。              |
| **UUCode**      | [uucode.org](https://www.uucode.org)         | 支持 Claude Code & CodeX，可开发票。         |
| **Augmunt**     | [augmunt.com](https://www.augmunt.com)       | 支持 Claude Code & CodeX & Gemini CLI。 |
| **CCHK**        | [cchk.ai](https://cchk.ai)                   | 支持 Claude Code。                      |
| **PoloAPI**     | [poloai.top](https://poloai.top)             | 支持 Claude Code & CodeX。              |
| **BestModel**   | [bestmodel.dev](https://bestmodel.dev)       | 注册送 $5 体验金，有时间限制。                    |
| **斑马 API**      | [bmapi.020212.xyz](https://bmapi.020212.xyz) | 支持 Claude Code & CodeX。              |

***

### 三、模型供应商官方开放平台

> 以下为各 AI 厂商官方直接提供的 API 平台，适合生产环境接入。

#### 3.1 国外平台

| 平台                         | 官网                                                                                           | API URL                                        | 主要模型                               | 网页体验                                           |
| -------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------- | ---------------------------------------------- |
| **OpenAI**                 | [openai.com/api](https://openai.com/api)                                                     | `https://api.openai.com/v1`                    | GPT-5、GPT-4.1、GPT-4o 等             | [chatgpt.com](https://chatgpt.com)             |
| **Google Gemini**          | [ai.google.dev](https://ai.google.dev)                                                       | `https://generativelanguage.googleapis.com/v1` | Gemini Pro、Gemini Flash 等          | [gemini.google.com](https://gemini.google.com) |
| **Anthropic Claude**       | [anthropic.com/api](https://www.anthropic.com/api)                                           | `https://api.anthropic.com/v1`                 | Claude 3.5 Sonnet、Claude 3 Haiku 等 | [claude.ai](https://claude.ai)                 |
| **Microsoft Azure OpenAI** | [azure.microsoft.com](https://azure.microsoft.com/en-us/products/ai-services/openai-service) | `https://<resource>.openai.azure.com/`         | GPT-4、GPT-3.5 等（Azure 版本）          | —                                              |
| **Meta Llama**             | [llama.com](https://www.llama.com/products/llama-api/)                                       | `https://api.llama.com/v1`                     | Llama 4、Llama 3.3 等                | —                                              |
| **xAI Grok**               | [x.ai/api](https://x.ai/api)                                                                 | `https://api.x.ai/v1`                          | Grok 3、Grok 2 等                    | [grok.com](https://grok.com)                   |
| **Mistral AI**             | [mistral.ai](https://mistral.ai/products/la-plateforme)                                      | `https://api.mistral.ai/v1`                    | Mistral Large、Mistral Medium 等     | —                                              |
| **Cohere AI**              | [cohere.com](https://cohere.com)                                                             | `https://api.cohere.ai/v1`                     | Command R+、Command R 等             | —                                              |
| **Stability AI**           | [platform.stability.ai](https://platform.stability.ai)                                       | `https://api.stability.ai/v1`                  | Stable Diffusion 3、SDXL 等          | —                                              |
| **Groq**                   | [groq.com](https://groq.com)                                                                 | `https://api.groq.com/openai/v1`               | Llama、Mixtral 等                    | —                                              |
| **Fireworks AI**           | [fireworks.ai](https://fireworks.ai)                                                         | `https://api.fireworks.ai/inference/v1`        | 各种开源 LLM 和图像模型                     | —                                              |
| **StreamLake**             | [streamlake.ai](https://www.streamlake.ai)                                                   | —                                              | 快手开放平台国际站                          | —                                              |

***

#### 3.2 国内平台

| 平台                     | 官网                                                          | API URL                                                                       | 主要模型          | 网页体验                                                       |
| ---------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------- | ---------------------------------------------------------- |
| **智谱 AI (Z AI)**       | [bigmodel.cn](https://open.bigmodel.cn)                     | `https://open.bigmodel.cn/api/paas/v4/chat/completions`                       | GLM-4 系列      | [chatglm.cn](https://chatglm.cn)                           |
| **Xiaomi MiMo**        | [xiaomimimo.com](https://platform.xiaomimimo.com)           | `https://api.xiaomimimo.com/v1/chat/completions`                              | MiMo V2.5 等   | [aistudio.xiaomimimo.com](https://aistudio.xiaomimimo.com) |
| **LongCat API**        | [longcat.chat](https://longcat.chat/platform)               | `https://api.longcat.chat/openai/`                                            | LongCat 大模型   | [longcat.chat](https://longcat.chat)                       |
| **百度文心**               | [baidu.com](https://cloud.baidu.com/product/wenxinworkshop) | `https://qianfan.baidubce.com/v2/chat/completions`                            | 文心（ERNIE）系列   | [yiyan.baidu.com](https://yiyan.baidu.com)                 |
| **阿里巴巴通义千问**           | [aliyun.com](https://www.aliyun.com/product/tongyi)         | `https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions`          | 通义千问（Qwen）系列  | [qianwen.com](https://www.qianwen.com)                     |
| **腾讯混元**               | [tencent.com](https://cloud.tencent.com/product/hunyuan)    | `https://api.hunyuan.cloud.tencent.com/v1/chat/completions`                   | 混元（Hunyuan）系列 | [hunyuan.tencent.com](https://hunyuan.tencent.com)         |
| **字节跳动豆包**             | [volcengine.com](https://www.volcengine.com/product/ark)    | `https://ark.cn-beijing.volces.com/api/v3/chat/completions`                   | 豆包系列          | [doubao.com](https://www.doubao.com)                       |
| **月之暗面 (Moonshot AI)** | [moonshot.cn](https://platform.moonshot.cn)                 | `https://api.moonshot.cn/v1/chat/completions`                                 | Kimi 系列       | [kimi.com](https://www.kimi.com)                           |
| **百川智能**               | [baichuan-ai.com](https://platform.baichuan-ai.com)         | `https://api.baichuan-ai.com/v1/chat/completions`                             | Baichuan 系列   | [ying.baichuan-ai.com](https://ying.baichuan-ai.com)       |
| **科大讯飞**               | [xfyun.cn](https://xinghuo.xfyun.cn/sparkapi)               | `https://spark-api-open.xf-yun.com/v2/chat/completions`                       | 讯飞星火          | [xinghuo.xfyun.cn](https://xinghuo.xfyun.cn)               |
| **零一万物**               | [lingyiwanwu.com](https://platform.lingyiwanwu.com)         | `https://api.lingyiwanwu.com/v1/chat/completions`                             | Yi 系列         | —                                                          |
| **DeepSeek**           | [deepseek.com](https://platform.deepseek.com)               | `https://api.deepseek.com/v1/chat/completions`                                | DeepSeek 系列   | [chat.deepseek.com](https://chat.deepseek.com)             |
| **StreamLake (快手万擎)**  | [streamlake.com](https://streamlake.com)                    | `https://wanqing.streamlakeapi.com/api/gateway/v1/endpoints/chat/completions` | KAT-Coder 等   | —                                                          |

**国内平台免费额度说明：**

* **智谱 AI**：提供免费模型 glm-4.5-flash、glm-4-flash、glm-4v-flash、cogview-3-flash、cogvideox-flash
* **Xiaomi MiMo**：新用户注册送 ¥10 API 体验金，限时活动可申请免费 Token
* **LongCat API**：目前每天免费 50W Token，可申请每天免费 500W Token
* **StreamLake**：KAT-Coder 模型限时免费

***

### 四、快速配置参考

#### 4.1 Base URL 速查

| 提供商                   | Base URL                                                            |
| --------------------- | ------------------------------------------------------------------- |
| NVIDIA NIM            | `https://integrate.api.nvidia.com/v1`                               |
| ModelScope            | `https://api-inference.modelscope.cn/v1`                            |
| Cloudflare Workers AI | `https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run` |
| OpenRouter            | `https://openrouter.ai/api/v1`                                      |
| GitHub Models         | `https://models.github.ai/inference`                                |
| Google Gemini         | `https://generativelanguage.googleapis.com/v1beta`                  |
| Ollama Cloud          | `https://api.ollama.com`                                            |
| OVHcloud AI Endpoints | `https://oai.endpoints.kepler.ai.cloud.ovh.net/v1`                  |
| LLM7.io               | `https://api.llm7.io/v1`                                            |
| Groq                  | `https://api.groq.com/openai/v1`                                    |
| Mistral AI            | `https://api.mistral.ai/v1`                                         |
| Cohere                | `https://api.cohere.com/v2`                                         |
| Kilo Code             | `https://api.kilo.ai/api/gateway`                                   |
| Cerebras              | `https://api.cerebras.ai/v1`                                        |
| OpenCode Zen          | `https://opencode.ai/zen/v1`                                        |
| Aion Labs             | `https://api.aionlabs.ai/v1`                                        |
| Hugging Face          | `https://router.huggingface.co/v1`                                  |
| Agnes AI              | `https://apihub.agnes-ai.com/v1`                                    |
| 阿里云百炼                 | `https://dashscope-intl.aliyuncs.com/compatible-mode/v1`            |
| Z AI (智谱AI)           | `https://open.bigmodel.cn/api/paas/v4`                              |
| SambaNova             | `https://api.sambanova.ai/v1`                                       |
| SiliconFlow           | `https://api.siliconflow.cn/v1`                                     |
| xAI                   | `https://api.x.ai/v1`                                               |
| AI21 Labs             | `https://api.ai21.com/studio/v1`                                    |
| DeepSeek              | `https://api.deepseek.com/v1`                                       |
| Nebius                | `https://api.studio.nebius.com/v1`                                  |

***

#### 4.2 工具配置速查

| 工具                  | 环境变量 / 配置方式                                   |
| ------------------- | --------------------------------------------- |
| **Codex CLI**       | `OPENAI_BASE_URL` + `OPENAI_API_KEY`          |
| **Cursor**          | Settings → Models → Add Model                 |
| **Claude Code**     | `ANTHROPIC_BASE_URL` + `ANTHROPIC_AUTH_TOKEN` |
| **Aider 编辑器**       | `.aider.conf.yml`                             |
| **Cline (VS Code)** | API provider 设置                               |

> 更多工具即用配置：[freellm.net/config](https://freellm.net/config)

***

#### 4.3 Python 快速示例

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key="你的GROQ_API_KEY",  # 获取: console.groq.com/keys
)

response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[{"role": "user", "content": "你好！"}],
)
print(response.choices[0].message.content)
```

***

### 附录：快速选择指南

| 场景                   | 推荐方案                                 |
| -------------------- | ------------------------------------ |
| **零基础快速上手**          | Groq（无需信用卡，30次/分钟）                   |
| **最强免费多模态**          | Google Gemini（1M 上下文，音频/图像/视频）       |
| **最多免费模型**           | NVIDIA NIM（123个模型，需手机验证）             |
| **最多开源模型**           | ModelScope（53个模型，绑定阿里云）              |
| **最快推理速度**           | Groq / Cerebras / SambaNova          |
| **Claude Code 免费使用** | Any Router / FreeModel / RawChat 公益站 |
| **统一入口管理多模型**        | OpenRouter                           |
| **国内开发者首选**          | 智谱 AI / 阿里云百炼 / DeepSeek             |
| **生产环境官方接入**         | 对应厂商官方平台（第三章）                        |

***

> **提示**：免费额度和政策可能随时调整，建议注册后查看各平台最新公告。部分国际平台在中国 IP 下可能受限，可配合代理或选择国内中转站使用。

三步获取免费API并开始使用：

1. **选择提供商** — 推荐从 Groq 开始（无需信用卡，免费额度30次/分钟）
2. **获取API Key** — 点击下方列表中对应提供商的"获取密钥"链接，注册账号（大多只需邮箱），复制密钥
3. **填入代码** — 将base URL和API Key粘贴到以下示例中

#### Python示例（OpenAI SDK）

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key="你的GROQ_API_KEY",  # 获取: console.groq.com/keys
)

response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[{"role": "user", "content": "你好！"}],
)
print(response.choices[0].message.content)
```

### 工具配置速查

| 工具              | 环境变量 / 配置方式                                   |
| --------------- | --------------------------------------------- |
| Codex CLI       | OPENAI\_BASE\_URL + OPENAI\_API\_KEY          |
| Cursor          | Settings → Models → Add Model                 |
| Claude Code     | ANTHROPIC\_BASE\_URL + ANTHROPIC\_AUTH\_TOKEN |
| Aider 编辑器       | .aider.conf.yml                               |
| Cline (VS Code) | API provider 设置                               |

> 更多工具即用配置：<https://freellm.net/config/>

***

### 免费API提供商列表

> 说明：所有提供商均暴露OpenAI兼容接口，任何接受baseURL + apiKey的工具均可直接使用。

#### 无需信用卡

| 提供商                   | 免费模型数 | 最大上下文 | 能力                       | 获取密钥                                                                 |
| --------------------- | ----- | ----- | ------------------------ | -------------------------------------------------------------------- |
| Cloudflare Workers AI | 39    | 10M   | 代码、图像、推理、文本、视频           | [获取 →](https://www.cloudflare.com/developer-platform/cloudflare-ai/) |
| GitHub Models         | 16    | 1M    | 图像、PDF、推理、文本             | [获取 →](https://github.com/marketplace/models)                        |
| Google Gemini         | 15    | 1M    | 音频、图像、PDF、推理、文本、视频、视觉    | [获取 →](https://aistudio.google.com/apikey)                           |
| LLM7.io               | 13    | 1M    | 音频、代码、图像、PDF、推理、文本、视频、视觉 | [获取 →](https://llm7.io)                                              |
| Groq                  | 12    | 262K  | 图像、推理、文本                 | [获取 →](https://console.groq.com/keys)                                |
| Mistral AI            | 12    | 256K  | 代码、图像、文本                 | [获取 →](https://console.mistral.ai/api-keys/)                         |
| Cohere                | 12    | 436K  | 图像、文本                    | [获取 →](https://dashboard.cohere.com/api-keys)                        |
| Kilo Code             | 12    | 1M    | 音频、代码、图像、推理、文本、视频        | [获取 →](https://kilo.ai/code)                                         |
| Cerebras              | 8     | 131K  | 图像、推理、文本                 | [获取 →](https://cerebras.ai/inference)                                |
| Hugging Face          | 7     | 131K  | 代码、文本                    | [获取 →](https://huggingface.co/settings/inference-endpoints)          |
| Z AI (智谱AI)           | 4     | 200K  | 图像、推理、文本、视频              | [获取 →](https://open.bigmodel.cn/)                                    |

#### 需注册（无需信用卡）

| 提供商                   | 免费模型数 | 最大上下文 | 能力                | 获取密钥                                                  |
| --------------------- | ----- | ----- | ----------------- | ----------------------------------------------------- |
| ModelScope            | 53    | 1M    | 音频、图像、推理、文本、视频、视觉 | [获取 →](https://modelscope.cn/my/setting)              |
| Ollama Cloud          | 14    | 1M    | 音频、代码、图像、推理、文本、视频 | [获取 →](https://ollama.com/cloud)                      |
| OVHcloud AI Endpoints | 14    | 262K  | 音频、代码、图像、推理、文本、视频 | [获取 →](https://ai.endpoints.kepler.ai.cloud.ovh.net/) |
| OpenCode Zen          | 8     | 1M    | 音频、推理、视觉          | [获取 →](https://opencode.ai/zen)                       |
| Aion Labs             | 7     | 131K  | 文本                | [获取 →](https://www.aionlabs.ai)                       |
| Agnes AI              | 5     | 256K  | 图像、文本、视频、视觉       | [获取 →](https://agnes-ai.com)                          |
| 阿里云百炼                 | 5     | 1M    | 代码、图像、文本          | [获取 →](https://bailian.console.aliyun.com)            |
| SambaNova             | 4     | 128K  | 图像、推理、文本          | [获取 →](https://cloud.sambanova.ai)                    |
| SiliconFlow           | 3     | 131K  | 文本                | [获取 →](https://siliconflow.cn)                        |
| xAI                   | 3     | 2M    | 文本                | [获取 →](https://x.ai/api)                              |
| DeepSeek              | 2     | 128K  | 文本                | [获取 →](https://platform.deepseek.com)                 |
| AI21 Labs             | 2     | 256K  | 文本                | [获取 →](https://www.ai21.com/studio)                   |
| Nebius                | 1     | 128K  | 文本                | [获取 →](https://studio.nebius.com)                     |

#### 需手机验证

| 提供商        | 免费模型数 | 最大上下文 | 能力                       | 获取密钥                           |
| ---------- | ----- | ----- | ------------------------ | ------------------------------ |
| NVIDIA NIM | 123   | 1M    | 音频、嵌入、图像、推理、重排序、文本、视频、视觉 | [获取 →](https://org.nvidia.com) |

#### 付费后享有免费层

| 提供商        | 免费模型数 | 说明                    | 获取密钥                               |
| ---------- | ----- | --------------------- | ---------------------------------- |
| OpenRouter | 22    | 免费层 + 充值$10 → 1000次/天 | [获取 →](https://openrouter.ai/keys) |

***

### Base URL 与 API Key 快速参考

| 提供商                   | Base URL                                                            | 获取密钥                                                                 |
| --------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------- |
| NVIDIA NIM            | `https://integrate.api.nvidia.com/v1`                               | [获取 →](https://org.nvidia.com)                                       |
| ModelScope            | `https://api-inference.modelscope.cn/v1`                            | [获取 →](https://modelscope.cn/my/setting)                             |
| Cloudflare Workers AI | `https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run` | [获取 →](https://www.cloudflare.com/developer-platform/cloudflare-ai/) |
| OpenRouter            | `https://openrouter.ai/api/v1`                                      | [获取 →](https://openrouter.ai/keys)                                   |
| GitHub Models         | `https://models.github.ai/inference`                                | [获取 →](https://github.com/marketplace/models)                        |
| Google Gemini         | `https://generativelanguage.googleapis.com/v1beta`                  | [获取 →](https://aistudio.google.com/apikey)                           |
| Ollama Cloud          | `https://api.ollama.com`                                            | [获取 →](https://ollama.com/cloud)                                     |
| OVHcloud AI Endpoints | `https://oai.endpoints.kepler.ai.cloud.ovh.net/v1`                  | [获取 →](https://ai.endpoints.kepler.ai.cloud.ovh.net/)                |
| LLM7.io               | `https://api.llm7.io/v1`                                            | [获取 →](https://llm7.io)                                              |
| Groq                  | `https://api.groq.com/openai/v1`                                    | [获取 →](https://console.groq.com/keys)                                |
| Mistral AI            | `https://api.mistral.ai/v1`                                         | [获取 →](https://console.mistral.ai/api-keys/)                         |
| Cohere                | `https://api.cohere.com/v2`                                         | [获取 →](https://dashboard.cohere.com/api-keys)                        |
| Kilo Code             | `https://api.kilo.ai/api/gateway`                                   | [获取 →](https://kilo.ai/code)                                         |
| Cerebras              | `https://api.cerebras.ai/v1`                                        | [获取 →](https://cerebras.ai/inference)                                |
| OpenCode Zen          | `https://opencode.ai/zen/v1`                                        | [获取 →](https://opencode.ai/zen)                                      |
| Aion Labs             | `https://api.aionlabs.ai/v1`                                        | [获取 →](https://www.aionlabs.ai)                                      |
| Hugging Face          | `https://router.huggingface.co/v1`                                  | [获取 →](https://huggingface.co/settings/inference-endpoints)          |
| Agnes AI              | `https://apihub.agnes-ai.com/v1`                                    | [获取 →](https://agnes-ai.com)                                         |
| 阿里云百炼                 | `https://dashscope-intl.aliyuncs.com/compatible-mode/v1`            | [获取 →](https://bailian.console.aliyun.com)                           |
| Z AI (智谱AI)           | `https://open.bigmodel.cn/api/paas/v4`                              | [获取 →](https://open.bigmodel.cn/)                                    |
| SambaNova             | `https://api.sambanova.ai/v1`                                       | [获取 →](https://cloud.sambanova.ai)                                   |
| SiliconFlow           | `https://api.siliconflow.cn/v1`                                     | [获取 →](https://siliconflow.cn)                                       |
| xAI                   | `https://api.x.ai/v1`                                               | [获取 →](https://x.ai/api)                                             |
| Chutes.ai             | `https://api.chutes.ai/v1`                                          | -                                                                    |
| Glhf.chat             | `https://glhf.chat/api/openai/v1`                                   | -                                                                    |
| Grok (xAI)            | `https://api.x.ai/v1`                                               | [获取 →](https://x.ai/api)                                             |
| AI21 Labs             | `https://api.ai21.com/studio/v1`                                    | [获取 →](https://www.ai21.com/studio)                                  |
| DeepSeek              | `https://api.deepseek.com/v1`                                       | [获取 →](https://platform.deepseek.com)                                |
| Nscale                | `https://inference.api.nscale.com/v1`                               | -                                                                    |
| Nebius                | `https://api.studio.nebius.com/v1`                                  | [获取 →](https://studio.nebius.com)                                    |

***

### 各提供商最佳免费模型推荐

| 提供商           | 推荐模型                      | 模型ID                                       | 最大上下文 |
| ------------- | ------------------------- | ------------------------------------------ | ----- |
| Groq          | Moonshot Kimi K2          | `moonshotai/kimi-k2-instruct`              | 131K  |
| Google Gemini | Gemini 3.6 Flash          | `gemini-3.6-flash`                         | 1M    |
| Mistral AI    | Mistral Medium 3.5 (128B) | `mistral-medium-3-5-128b`                  | 256K  |
| Cohere        | Command A+ (218B)         | `command-a-218b`                           | 436K  |
| Cloudflare    | Llama 3.3 70B (FP8)       | `@cf/meta/llama-3.3-70b-instruct-fp8-fast` | 131K  |
| DeepSeek      | DeepSeek Chat (V3.2)      | `deepseek-chat-v3-2`                       | 128K  |
| Z AI (智谱AI)   | GLM-4.7-Flash             | `glm-4.7`                                  | 200K  |
| 阿里云百炼         | Qwen3-Max                 | `qwen3-max`                                | 128K  |
| OpenRouter    | Nemotron 3 Ultra (免费)     | `nvidia/nemotron-3-ultra-550b-a55b:free`   | 1M    |
