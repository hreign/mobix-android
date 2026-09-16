# Mobix - English Documentation

View phone status monitoring, SMS management, and call management via a web interface.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Install Termux:API](#install-termuxapi)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Commands](#commands)
- [Configuration](#configuration)
- [Background Service](#background-service)
- [Internationalization](#internationalization)
- [TODO List](#todo-list)
- [Development and Contributing](#development-and-contributing)
- [License](#license)

## Features

### Phone Status

- **Network**: SSID, IP address, signal strength, link speed
- **SIM Card**: Carrier name, SIM card status
- **Battery**: Battery percentage, temperature, charging status, power source type

### SMS Management

- **Inbox/Sent**: Switch by type field, independent pagination, category counts
- **Send SMS**: Manual number input or pick from contact list
- **Quick Reply**: "Reply" entry in list items, one-click jump to send form with pre-filled number
- **Pagination**: Browse historical SMS with pagination

### Call Log

- **Classification**: Incoming, Outgoing, Missed
- **Unknown Numbers**: Display phone number directly (not placeholder text)
- **Sorting**: Reverse chronological order

### Password Protection

- Set access password via `mobix pwd` command
- Password encrypted with AES-256-GCM in config file
- No password needed if unset
- Restart required after setting/clearing password

## Requirements

This project needs to run on an Android device, and depends on Termux, Termux:API, and Node.js.

### Required Apps

It is recommended to install the following apps via F-Droid:

- [Termux](https://f-droid.org/en/packages/com.termux/)
- [Termux:API](https://f-droid.org/en/packages/com.termux.api/)

Termux and Termux:API should be installed from the same channel to avoid plugin issues caused by signature or version mismatch.

### Android Permissions

The project calls Android system functions via Termux:API. On first use of relevant functions, you need to grant corresponding permissions to Termux:API in system settings.

Usually found at:

```
Settings → Apps → Termux:API → Permissions
```

Menu names may vary across Android versions and phone manufacturers.

Command and permission mapping:

| Command | Function | Required Permission |
| --- | ---| --- |
| termux-battery-status | Get battery status | Usually no extra permission |
| termux-wifi-connectioninfo | Get Wi-Fi connection info | Network permission; some systems also require location |
| termux-telephony-deviceinfo | Get device and SIM card info | Phone or device info permission |
| termux-sms-list | Read SMS | SMS read permission |
| termux-sms-send | Send SMS | SMS send permission |
| termux-contact-list | Read contacts | Contacts permission |
| termux-call-log | Read call log | Call log permission |

If you don't use a feature, no permission is needed.

### Android SMS Send Confirmation

Some Android versions or phone systems may require manual confirmation on first SMS send, or pop up SMS, premium SMS, or other authorization prompts.

If SMS sending fails, check the following:

Confirm that SMS permission has been granted to Termux:API;
Manually run a test SMS command:

```bash
termux-sms-send -n "10086" ""
```

- If the system pops up a confirmation window, allow manually;
- If the system asks to allow "premium SMS", confirm as needed;
- Check if the system restricts Termux or Termux:API from running in the background;

Some devices may require setting an app as the default SMS app.

<b>SMS sending may incur carrier charges. It is recommended to test with your own phone number first.</b>

### Tips

To avoid Android system restricting background running or reclaiming Termux process, causing service interruption, it is recommended in system settings:

- Add Termux to background running whitelist;
- Disable battery optimization or power saving for Termux;
- Allow Termux to run in the background.

Settings names may vary by brand. Usually found at:

```text
Settings → Apps → Termux → Battery
```

Choose "Allow background running", "Unrestricted", or similar options.

## Install Termux:API

Open Termux and run:

```bash
pkg update
pkg upgrade -y
pkg install termux-api -y
```

## Installation

### Install Node.js

- (Recommended) Install Node.js LTS
   ```
   pkg install nodejs-lts -y
   ```
- Install current version
  ```
  pkg install nodejs -y
  ```

After installation, run the following commands to verify:

```bash
# Check Node.js version
node -v

# Check npm version
npm -v
```

### Option 1: npm global install (recommended)

```bash
npm install -g @hreign/mobix
```

The `mobix` command will be globally available.

### Option 2: zip distribution

If you have Node.js knowledge and experience,
download `mobix-app.zip` from [Release](https://github.com/hreign/mobix-android/releases), extract and run:

```bash
node app/dist/server.js
```

## Quick Start

```bash
# Start service (default port 7788, background)
mobix start

# Check service status
mobix status

# Browser access
# http://<device-ip>:7788

# Stop service
mobix stop
```

## Commands

### mobix start

Start Mobix service in background, survives terminal close.

```bash
mobix start                # Default port 7788
mobix start --port 8080    # Override port
```

### mobix stop

Stop the running service.

```bash
mobix stop
```

### mobix status

Show service status, displays PID and port info.

```bash
mobix status
```

### mobix restart

Restart service with latest config.

```bash
mobix restart
```

### mobix pwd

Set or view access password. Password is encrypted with AES-256-GCM.

```bash
mobix pwd                  # Show password status
mobix pwd mypassword       # Set access password
mobix pwd ""               # Clear password, no password needed
```

Restart required after setting password:

```bash
mobix pwd mypassword
mobix restart
```

### mobix port

Set or view listening port.

```bash
mobix port                 # Show current port
mobix port 9000            # Change port
```

Restart required after changing port:

```bash
mobix port 9000
mobix restart
```

### mobix help

Show help information.

```bash
mobix help                 # Top-level help
mobix help start           # Detailed help for start command
```

## Configuration

Config file located at `~/.mobix/config.json`, file permission 0600.

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

| Option | Description | Default |
|--------|------|--------|
| port | Listening port | 7788 |
| password | Access password (encrypted) | None (no password) |

Port resolution priority: config file > env `PORT` > default 7788

Password resolution priority: config file > env `MOBIX_PASSWORD` > none

## Background Service

- `mobix start` launches as background daemon, survives terminal close
- Does not depend on systemd / init / launchd
- In Android Termux, optionally run `termux-wake-lock` to prevent device sleep
- PID file at `~/.mobix/mobix.pid`, used by stop / status / restart commands

## Internationalization

The app supports 8 languages: Chinese, English, Japanese, Korean, French, German, Spanish, Russian.

Auto-switches based on system language, no extra configuration needed.

If detection fails or an unsupported language is encountered, falls back to English.

## TODO List

- [ ] Improve SMS sending experience
- [ ] Add more phone status monitoring features
- [ ] Improve UI design
- [ ] Add more internationalization support
- [ ] Remote call function
- [ ] Message push (battery alert, SMS notification, call notification)
  - Evaluate impact of different monitoring approaches on battery life
  - Prioritize low-power implementation, reduce unnecessary polling
  - Support custom alert conditions, notification frequency, and duplicate message filtering


## Development and Contributing

Contributions in any form are welcome, including but not limited to:

- Submit issues to report problems or suggestions
- Submit pull requests to share code
- Share usage experience or write documentation


## License

MIT
