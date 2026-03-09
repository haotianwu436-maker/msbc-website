# 部署后访问 Admin 页面指南

## 📍 访问方式

### 方法 1: 直接访问 URL
部署后，在浏览器地址栏输入：
```
https://你的域名.com/admin
```

例如：
- `https://msbc2026.com/admin`
- `https://www.msbc2026.com/admin`
- `https://msbc-website.vercel.app/admin` (如果使用 Vercel)

### 方法 2: 从网站首页跳转
如果需要在网站首页添加一个隐藏的入口链接（可选），可以：
1. 在页脚添加一个不显眼的链接
2. 或者使用快捷键/特殊组合键触发

---

## 🔒 安全建议

### 1. 使用强密码
- ✅ **Supabase Auth**: 使用强密码（至少 12 位，包含大小写字母、数字、特殊字符）
- ✅ **简单密码**: 如果使用简单密码验证，确保密码足够复杂（建议至少 16 位）

### 2. 隐藏 Admin 路径（可选）
如果不想让 `/admin` 路径太明显，可以考虑：

#### 选项 A: 使用环境变量配置路径
```typescript
// 在 .env.local 中添加
VITE_ADMIN_PATH=/your-secret-path

// 在 App.tsx 中使用
const adminPath = import.meta.env.VITE_ADMIN_PATH || '/admin';
<Route path={adminPath} component={Admin} />
```

#### 选项 B: 使用更隐蔽的路径
例如：
- `/manage`
- `/cms`
- `/backend`
- `/msbc-admin-2026` (带年份，更不容易被猜到)

### 3. 配置 Supabase RLS 策略
确保 Supabase 数据库的 Row Level Security (RLS) 策略正确配置：
- ✅ Admin 操作需要认证
- ✅ 公开页面只能读取数据
- ✅ 只有管理员可以写入/删除数据

### 4. 限制 IP 访问（高级，可选）
如果使用 Vercel、Netlify 等平台，可以配置：
- **Vercel**: 使用 Edge Middleware 限制 IP
- **Netlify**: 使用 Netlify Functions + IP 白名单
- **传统服务器**: 使用 Nginx/Apache 配置 IP 限制

---

## 🚀 不同部署平台的路由配置

### Vercel
Vercel 自动支持 SPA 路由，无需额外配置。确保 `vercel.json` 存在：

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Netlify
在 `netlify.toml` 中添加：

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Railway / Render / 传统服务器
确保服务器配置了 SPA 路由回退：
- 所有路由都指向 `index.html`
- 让前端路由（Wouter）处理路径匹配

---

## 📝 部署检查清单

- [ ] 确保 `.env.local` 中的 Supabase 配置正确
- [ ] 确保 Supabase RLS 策略已配置
- [ ] 测试登录功能（Supabase Auth 和简单密码）
- [ ] 测试数据读写功能
- [ ] 测试图片上传功能
- [ ] 确认 Admin 页面在生产环境可以正常访问
- [ ] 确认公开页面不受影响

---

## 🔧 常见问题

### Q: 访问 `/admin` 显示 404？
**A**: 检查服务器是否配置了 SPA 路由回退。所有路径都应该指向 `index.html`。

### Q: 登录后无法保存数据？
**A**: 
1. 检查 Supabase 环境变量是否正确配置
2. 检查 Supabase RLS 策略是否允许写入
3. 检查浏览器控制台是否有错误信息

### Q: 图片上传失败？
**A**: 
1. 检查 Supabase Storage bucket 是否创建
2. 检查 Storage RLS 策略是否允许上传
3. 检查文件大小限制（Supabase 默认 50MB）

### Q: 如何更换 Admin 路径？
**A**: 
1. 修改 `client/src/App.tsx` 中的路由路径
2. 重新部署
3. 使用新路径访问

---

## 💡 最佳实践

1. **使用 Supabase Auth**: 比简单密码更安全
2. **定期更换密码**: 建议每 3-6 个月更换一次
3. **记录访问日志**: 在 Supabase Dashboard 中查看 Auth 日志
4. **限制管理员数量**: 只给必要的人员提供访问权限
5. **备份数据**: 定期导出 Supabase 数据作为备份

---

## 📞 需要帮助？

如果遇到问题，检查：
1. 浏览器控制台（F12）的错误信息
2. Supabase Dashboard 的日志
3. 部署平台的日志
