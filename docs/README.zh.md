# Mobix - 中文文档

通过web页面查看手机状态监控与短信、通话管理

## 目录

- [功能说明](#功能说明)
- [环境要求](#环境要求)
- [安装 Termux:API](#安装-termuxapi)
- [安装](#安装)
- [快速开始](#快速开始)
- [命令说明](#命令说明)
- [配置](#配置)
- [后台运行说明](#后台运行说明)
- [国际化](#国际化)
- [TODO List](#todo-list)
- [开发与贡献](#开发与贡献)
- [许可证](#许可证)

## 功能说明

### 手机状态

- **网络状态**：SSID、IP 地址、信号强度、连接速率
- **SIM 卡状态**：运营商名称、SIM 卡状态
- **电池状态**：电量百分比、温度、充电状态、电源连接类型

### 短信管理

- **收件箱/发件箱**：按 type 字段分类切换，独立分页，显示分类计数
- **发送短信**：支持手动输入号码或从联系人列表选取
- **快速回复**：列表项提供"回复"入口，一键跳转发送表单并预填号码
- **分页浏览**：支持翻页查看历史短信

### 通话记录

- **分类标签**：来电、去电、未接
- **未知号码**：直接显示手机号码（而非占位文案）
- **排序**：按时间倒序排列

### 访问密码保护

- 通过 `mobix pwd` 命令设置访问密码
- 密码使用 AES-256-GCM 加密存储于配置文件
- 未设置密码时免密访问
- 设置/清除密码后需重启服务生效

## 环境要求

本项目需要运行在 Android 设备上，并依赖 Termux、Termux:API 和 Node.js。

### 需要安装的应用

建议通过 F-Droid 安装以下应用：

- [Termux](https://f-droid.org/en/packages/com.termux/)
- [Termux:API](https://f-droid.org/en/packages/com.termux.api/)

Termux 和 Termux:API 建议从同一渠道安装，避免因为签名或版本不一致导致插件无法正常工作。

### Android 权限

项目会通过 Termux:API 调用 Android 的部分系统功能。首次使用相关功能时，需要在系统设置中为 Termux:API 授予对应权限。

通常可以在以下位置进行设置：

```设置 → 应用 → Termux:API → 权限```

不同 Android 版本和手机厂商的菜单名称可能略有不同。

命令与权限对应关系

| 命令 | 功能 | 所需权限 |
| --- | ---| --- |
| termux-battery-status | 获取电池状态 | 通常不需要额外权限 |
| termux-wifi-connectioninfo | 获取 Wi-Fi 连接信息 | 网络权限；部分系统还需要开启位置信息 |
| termux-telephony-deviceinfo | 获取设备和 SIM 卡信息 | 电话或设备信息权限 |
| termux-sms-list | 读取短信 | 短信读取权限 |
| termux-sms-send | 发送短信 | 短信发送权限 |
| termux-contact-list | 读取联系人 | 联系人权限 |
| termux-call-log | 读取通话记录 | 通话记录权限 |

不使用某项功能时，不需要授予对应权限。

### Android 短信发送确认

部分 Android 版本或手机系统在首次发送短信时，可能会要求手动确认，或者弹出短信、付费短信等授权提示。

如果发送短信失败，请检查以下内容：

确认已经为 Termux:API 授予短信权限；
手动执行一次短信测试命令：

```bash
termux-sms-send -n "10086" ""
```

- 如果系统弹出确认窗口，请手动允许；
- 如果系统要求允许“付费短信”，请根据需要进行确认；
- 检查系统是否限制了 Termux 或 Termux:API 的后台运行；

部分设备可能要求将某个应用设置为默认短信应用。

<b>短信发送可能产生运营商费用，建议先使用自己的手机号进行测试。</b>

### 温馨提示

为避免 Android 系统限制后台运行或回收 Termux 进程，导致服务中断，建议在系统设置中：

- 将 Termux 加入后台运行白名单；
- 关闭 Termux 的电池优化或省电限制；
- 允许 Termux 在后台运行。

不同品牌手机的设置名称可能有所不同，通常可以在以下位置找到相关选项：

```text
设置 → 应用 → Termux → 电池
```

请根据设备系统选择“允许后台运行”“不受限制”或类似选项。

## 安装 Termux:API

打开 Termux，执行以下命令：

```bash
pkg update
pkg upgrade -y
pkg install termux-api -y
```

## 安装

### 安装 Node.js

- （推荐）安装 Node.js 长期支持版（LTS）
   ```
   pkg install nodejs-lts -y
   ```
- 安装当前版本
  ```
  pkg install nodejs -y
  ```

安装完成后可运行以下命令，确认安装是否成功和查看当前版本号

```bash
# 查看 Node.js 版本
node -v

# 查看npm版本
npm -v
```

### 方式一：npm 全局安装（推荐）

```bash
npm install -g @hreign/mobix
```

安装后 `mobix` 命令全局可用。

### 方式二：zip 分发

如果你有 Node.js 相关的知识和经验，
可以在 [Release](https://github.com/hreign/mobix-android/releases) 里下载 `mobix-app.zip` 到本地解压后运行：

```bash
node app/dist/server.js
```

## 快速开始

```bash
# 启动服务（默认端口 7788，后台运行）
mobix start

# 查看服务状态
mobix status

# 浏览器访问
# http://<设备IP>:7788

# 停止服务
mobix stop
```

## 命令说明

### mobix start

启动 Mobix 服务，后台运行，关闭终端后服务继续运行。

```bash
mobix start                # 默认端口 7788
mobix start --port 8080    # 临时指定端口
```

### mobix stop

停止正在运行的服务。

```bash
mobix stop
```

### mobix status

查看服务运行状态，显示 PID 与端口信息。

```bash
mobix status
```

### mobix restart

重启服务，使用最新配置。

```bash
mobix restart
```

### mobix pwd

设置或查看访问密码。密码使用 AES-256-GCM 加密存储。

```bash
mobix pwd                  # 查看密码状态
mobix pwd mypassword       # 设置访问密码
mobix pwd ""               # 清除密码，免密访问
```

设置密码后需重启服务生效：

```bash
mobix pwd mypassword
mobix restart
```

### mobix port

设置或查看监听端口。

```bash
mobix port                 # 查看当前端口
mobix port 9000            # 修改端口
```

修改端口后需重启服务生效：

```bash
mobix port 9000
mobix restart
```

### mobix help

显示帮助信息。

```bash
mobix help                 # 顶级帮助
mobix help start           # start 命令详细帮助
```

## 配置

配置文件位于 `~/.mobix/config.json`，文件权限 0600。

```json
{
  "version": 1,
  "port": 7788,
  "password": {
    "algorithm": "aes-256-gcm",
    "iv": "...",
    "data": "..."
  }
}
```

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| port | 监听端口 | 7788 |
| password | 访问密码（加密存储） | 无（免密访问） |

端口解析优先级：配置文件 > 环境变量 `PORT` > 默认值 7788

密码解析优先级：配置文件 > 环境变量 `MOBIX_PASSWORD` > 免密

## 后台运行说明

- `mobix start` 以后台守护进程方式启动，关闭终端后服务继续运行
- 不依赖 systemd / init / launchd 等系统服务管理器
- 在 Android Termux 中，可选执行 `termux-wake-lock` 防止设备休眠导致服务中断
- PID 文件位于 `~/.mobix/mobix.pid`，用于 stop / status / restart 命令管理进程

## 国际化

当前应用共支持 8 种语言：中文、英语、日语、韩语、法语、德语、西班牙语、俄语。

根据系统语言自动切换，无需额外配置。

如果检测失败或者遇到不支持的语言，自动回退到英文。

## TODO List

- [ ] 优化短信发送体验
- [ ] 增加更多手机状态监控功能
- [ ] 改进界面设计
- [ ] 增加更多国际化支持
- [ ] 远程通话功能
- [ ] 消息推送功能（电量告警、短信通知、来电通知）
  - 需要评估不同监听方案对设备续航的影响
  - 优先考虑低功耗实现，减少不必要的轮询
  - 支持自定义告警条件、通知频率和重复消息过滤


## 开发与贡献

欢迎任何形式的贡献，包括但不限于：

- 提交 issue 反馈问题或提出建议
- 提交 pull request 共享代码
- 分享使用经验或编写文档


## 许可证

MIT
