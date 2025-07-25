# Ads.txt 文件配置说明

## 什么是 ads.txt？

Ads.txt（Authorized Digital Sellers）是 IAB Tech Lab 推出的一项倡议，用于确保您的数字广告库存只通过您授权的销售商（如 AdSense）进行销售。

## 为什么需要 ads.txt？

根据 [Google AdSense官方指南](https://support.google.com/adsense/answer/12171612?sjid=5569412233631473513-NC#create)：

- ✅ **防止伪造库存**: 帮助广告购买者识别伪造库存
- ✅ **增加收入**: 避免广告支出流向伪造库存
- ✅ **更好控制**: 控制谁可以在您的网站上销售广告
- ✅ **提高信任**: 向广告商证明您的库存是合法的

## 文件内容说明

当前项目的 `public/ads.txt` 文件内容：

```
google.com, pub-6451531797615157, DIRECT, f08c47fec0942fa0
```

### 字段说明：

1. **google.com** - 广告系统域名
2. **pub-6451531797615157** - 您的 AdSense 发布商 ID
3. **DIRECT** - 关系类型（直接关系）
4. **f08c47fec0942fa0** - Google 的认证机构 ID

## 部署位置

- **文件路径**: `public/ads.txt`
- **访问URL**: `https://your-domain.com/ads.txt`
- **位置要求**: 必须位于网站根目录

## 验证方法

### 1. 本地验证
部署后，在浏览器中访问：
```
https://mermaid-drawing.com/ads.txt
```

### 2. AdSense 控制台验证
1. 登录您的 AdSense 账户
2. 点击 **Sites** (网站)
3. 查看您网站的 ads.txt 状态
4. 如果状态不是 "Authorized"，点击 **Check for updates**

### 3. 格式验证
确保文件格式符合 [IAB Tech Lab 规范](https://iabtechlab.com/ads-txt/)：
- 使用纯文本格式
- 每行一个条目
- 字段用逗号分隔
- 无 BOM 标记

## 更新说明

### 添加其他广告网络
如果您使用其他广告网络，需要将其信息添加到 ads.txt 文件中：

```
google.com, pub-6451531797615157, DIRECT, f08c47fec0942fa0
example-adnetwork.com, your-publisher-id, DIRECT, certification-id
```

### 获取发布商 ID
根据 [Google 官方指南](https://support.google.com/adsense/answer/105516#adsense-account)，您可以通过以下方式找到发布商 ID：

1. **AdSense 账户**: Account → Settings → Account Information
2. **邮件通知**: 查找 AdSense 发送的邮件
3. **广告代码**: 在现有广告代码中查找
4. **帮助中心**: 访问您的 AdSense 页面

## 故障排除

### 常见问题

1. **文件未找到**
   - 确保文件位于 `public/` 目录
   - 检查文件名是否为 `ads.txt`（无扩展名错误）

2. **状态为 "Unauthorized"**
   - 验证发布商 ID 是否正确
   - 检查文件格式是否符合规范

3. **更新不生效**
   - 等待 24-48 小时让更改生效
   - 在 AdSense 中点击 "Check for updates"

### 验证命令

您可以使用以下命令验证文件：

```bash
# 检查文件是否存在
curl -I https://mermaid-drawing.com/ads.txt

# 查看文件内容
curl https://mermaid-drawing.com/ads.txt
```

## 重要提醒

- ⚠️ **必须位于根目录**: ads.txt 文件必须可以通过 `domain.com/ads.txt` 访问
- ⚠️ **纯文本格式**: 不要使用 HTML 或其他格式
- ⚠️ **发布商 ID 准确性**: 确保 ID 与您的 AdSense 账户匹配
- ⚠️ **定期检查**: 监控 AdSense 中的 ads.txt 状态 