## picgo里图床设置中的七牛云设置每个配置选项都是什么意思，怎么填
在PicGo中设置七牛云图床，需要填入以下配置项：

1. **AccessKey**：七牛云账号的Access Key。可以在七牛云的“个人中心”或者“密钥管理”中找到。
2. **SecretKey**：七牛云账号的Secret Key。和Access Key对应，在“个人中心”或者“密钥管理”中找到。
3. **Bucket**：存储空间的名称。创建存储空间（Bucket）时设置的名称，需要确保填写正确。
4. **URL**：七牛云存储空间绑定的域名，用于访问上传的图片。可以在七牛云存储空间的“空间设置”中查看或者绑定。
5. **Zone**：存储区域。根据存储空间所在区域选择合适的选项，一般为`z0`（华东），`z1`（华北），`z2`（华南），`na0`（北美），`as0`（东南亚）。
6. **Options**：可选配置项，用于指定上传图片的处理参数，例如图片的缩放、裁剪等。
7. **Path**：可选配置项，用于指定上传图片的存储路径，可以设置为某个文件夹的路径。例如，`images/`，则所有图片会存储在这个文件夹下。

### 如何填入这些配置

1. **AccessKey**和**SecretKey**：
   - 登录七牛云控制台。
   - 进入“个人中心”或者“密钥管理”。
   - 找到并复制相应的Access Key和Secret Key。
2. **Bucket**：
   - 登录七牛云控制台。
   - 进入“对象存储”。
   - 创建或选择一个存储空间（Bucket）。
   - 复制该存储空间的名称。
3. **URL**：
   - 登录七牛云控制台。
   - 进入存储空间的“空间设置”。
   - 找到并复制绑定的域名，通常是以`http://`或`https://`开头的URL。
4. **Zone**：
   - 确定存储空间所在的区域。
   - 根据区域选择正确的zone代码：
     - 华东（z0）
     - 华北（z1）
     - 华南（z2）
     - 北美（na0）
     - 东南亚（as0）
5. **Options**和**Path**：
   - 这些是可选项，根据个人需求设置。
   - `Options`可以填写七牛云图片处理的参数，例如`imageView2/2/w/800/h/400`（调整图片宽度为800，高度为400）。
   - `Path`可以设置为你希望存储图片的文件夹路径，例如`images/`。

### 示例配置

假设你的Access Key是`your-access-key`，Secret Key是`your-secret-key`，Bucket名称是`your-bucket`，URL是`http://your-domain.com`，区域是华东（z0），设置如下：

- **AccessKey**: `your-access-key`
- **SecretKey**: `your-secret-key`
- **Bucket**: `your-bucket`
- **URL**: `http://your-domain.com`
- **Zone**: `z0`
- **Options**: `imageView2/2/w/800/h/400`（可选）
- **Path**: `images/`（可选）

将这些信息填写到PicGo的七牛云图床设置中，就可以使用七牛云图床上传图片了。