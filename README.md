<h1 align="center">Mobix</h1>

<p align="center">
  <a href="docs/README.zh.md">中文文档</a> | <a href="docs/README.en.md">English</a> | <a href="docs/README.ja.md">日本語</a> | <a href="docs/README.ko.md">한국어</a> | <a href="docs/README.fr.md">Français</a> | <a href="docs/README.de.md">Deutsch</a> | <a href="docs/README.es.md">Español</a> | <a href="docs/README.ru.md">Русский</a>
</p>

---

这是一个运行于 Android Termux 环境中的轻量级远程设备管理工具。项目通过 Web 界面连接 Android 手机，将设备状态、短信、通话记录等信息集中呈现，为用户提供更加直观、高效的设备管理体验。

无需安装复杂的桌面客户端，也无需依赖第三方云端服务。用户只需在 Android 设备上运行项目服务，即可通过浏览器访问管理界面，实现对个人设备的远程查看与管理。

This is a lightweight remote device management tool running in the Android Termux environment. The project connects to Android phones via a web interface, centrally presenting device status, SMS, call logs and other information, providing users with a more intuitive and efficient device management experience.

No need to install complex desktop clients, nor rely on third-party cloud services. Users only need to run the project service on the Android device, and can access the management interface through a browser to remotely view and manage personal devices.

### 核心能力 / Core Capabilities

- 通过 Web 界面远程查看 Android 设备状态
- Remotely view Android device status via web interface
- 获取并管理短信内容
- Retrieve and manage SMS content
- 查看通话记录
- View call logs
- 查询设备基础信息与运行状态
- Query device basic information and running status
- 运行于 Termux 环境，部署轻量、操作灵活
- Runs in Termux environment, lightweight deployment, flexible operation
- 搭配 frp、cloudflare tunnel 等技术或工具实现外网访问
- Combine with frp, cloudflare tunnel and similar tools for external network access

### Termux

Termux 是一个适用于 Android 的终端模拟器，其环境类似于 Linux 环境。无需 Root 或设置即可使用。Termux 会自动进行最小安装 — 使用 APT 包管理器即可获得其他软件包。

Termux is a terminal emulator for Android, with an environment similar to a Linux environment. No root or setup is required. Termux will automatically install a minimal base system — additional packages can be installed using the APT package manager.

推荐使用 F-Droid 下载。
It is recommended to download via F-Droid.

<p align="center">
  <a href="https://f-droid.org/en/packages/com.termux"><img src="https://termux.dev/assets/globals/hosts/get-it-on-fdroid.png" alt="F-Droid" width="215" height="83"></a>
  &nbsp;&nbsp;
  <a href="https://github.com/termux/termux-app"><img src="https://termux.dev/assets/globals/hosts/get-it-on-github.png" alt="GitHub" width="215" height="83"></a>
</p>

### Termux API

这是一个将 Android API 暴露给命令行、脚本或程序使用的应用。

在开发或打包时，请注意此应用需要与主 Termux 应用使用相同的密钥签名，权限才能正常工作（只有主 Termux 应用被允许调用此应用中的 API 方法）。

This is an app exposing Android API to command line usage and scripts or programs.

When developing or packaging, note that this app needs to be signed with the same key as the main Termux app for permissions to work (only the main Termux app are allowed to call the API methods in this app).

推荐使用 F-Droid 下载。
It is recommended to download via F-Droid.

<p align="center">
  <a href="https://f-droid.org/en/packages/com.termux.api/"><img src="https://termux.dev/assets/globals/hosts/get-it-on-fdroid.png" alt="F-Droid" width="215" height="83"></a>
  &nbsp;&nbsp;
  <a href="https://github.com/termux/termux-api/releases"><img src="https://termux.dev/assets/globals/hosts/get-it-on-github.png" alt="GitHub" width="215" height="83"></a>
</p>

---

## License

MIT
