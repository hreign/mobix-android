# Mobix - 한국어 문서

웹 인터페이스로 휴대폰 상태 모니터링, SMS 관리, 통화 관리를 확인합니다.

## 목차

- [기능](#기능)
- [요구사항](#요구사항)
- [Termux:API 설치](#termuxapi-설치)
- [설치](#설치)
- [빠른 시작](#빠른-시작)
- [명령어](#명령어)
- [설정](#설정)
- [백그라운드 실행](#백그라운드-실행)
- [국제화](#국제화)
- [TODO List](#todo-list)
- [개발 및 기여](#개발-및-기여)
- [라이선스](#라이선스)

## 기능

### 휴대폰 상태

- **네트워크 상태**: SSID, IP 주소, 신호 강도, 연결 속도
- **SIM 카드 상태**: 통신사 이름, SIM 카드 상태
- **배터리 상태**: 배터리 잔량, 온도, 충전 상태, 전원 연결 유형

### SMS 관리

- **받은편지함/보낸편지함**: type 필드로 분류 전환, 독립 페이지네이션, 분류 카운트 표시
- **SMS 전송**: 수동 입력 또는 연락처 목록에서 선택
- **빠른 회신**: 목록 항목의 "회신" 입구, 원클릭으로 전송 폼으로 이동하여 번호 미리 입력
- **페이지네이션**: 과거 SMS 페이지 이동

### 통화 기록

- **분류 태그**: 수신, 발신, 부재중
- **알 수 없는 번호**: 전화번호를 직접 표시 (자리 표시자 텍스트가 아닌)
- **정렬**: 시간 역순으로 정렬

### 접근 비밀번호 보호

- `mobix pwd` 명령어로 접근 비밀번호 설정
- 비밀번호는 AES-256-GCM으로 암호화하여 설정 파일에 저장
- 미설정 시 비밀번호 불필요
- 설정/제거 후 재시작 필요

## 요구사항

본 프로젝트는 Android 기기에서 실행해야 하며, Termux, Termux:API, Node.js에 의존합니다.

### 설치 필요 앱

F-Droid를 통해 다음 앱을 설치하는 것을 권장합니다:

- [Termux](https://f-droid.org/en/packages/com.termux/)
- [Termux:API](https://f-droid.org/en/packages/com.termux.api/)

Termux와 Termux:API는 동일한 채널에서 설치하는 것을 권장합니다. 서명이나 버전 불일치로 인해 플러그인이 정상적으로 작동하지 않을 수 있습니다.

### Android 권한

프로젝트는 Termux:API를 통해 Android 시스템 기능을 호출합니다. 관련 기능을 처음 사용할 때, 시스템 설정에서 Termux:API에 해당 권한을 부여해야 합니다.

일반적으로 다음 위치에서 설정할 수 있습니다:

```
설정 → 앱 → Termux:API → 권한
```

Android 버전과 스마트폰 제조사에 따라 메뉴 이름이 약간 다를 수 있습니다.

명령어와 권한 대응 관계:

| 명령어 | 기능 | 필요 권한 |
| --- | ---| --- |
| termux-battery-status | 배터리 상태 가져오기 | 일반적으로 추가 권한 불필요 |
| termux-wifi-connectioninfo | Wi-Fi 연결 정보 가져오기 | 네트워크 권한; 일부 시스템은 위치 정보도 필요 |
| termux-telephony-deviceinfo | 기기 및 SIM 카드 정보 가져오기 | 전화 또는 기기 정보 권한 |
| termux-sms-list | SMS 읽기 | SMS 읽기 권한 |
| termux-sms-send | SMS 전송 | SMS 전송 권한 |
| termux-contact-list | 연락처 읽기 | 연락처 권한 |
| termux-call-log | 통화 기록 읽기 | 통화 기록 권한 |

기능을 사용하지 않을 때는 해당 권한이 불필요합니다.

### Android SMS 전송 확인

일부 Android 버전이나 스마트폰 시스템은 처음 SMS를 전송할 때 수동 확인을 요구하거나, SMS, 유료 SMS 등의 인증 프롬프트를 표시할 수 있습니다.

SMS 전송이 실패한 경우, 다음을 확인하세요:

Termux:API에 SMS 권한이 부여되었는지 확인;
수동으로 테스트 SMS 명령어 실행:

```bash
termux-sms-send -n "10086" ""
```

- 시스템이 확인 창을 표시하면 수동으로 허용하세요;
- 시스템이 "유료 SMS" 허용을 요구하면 필요에 따라 확인하세요;
- 시스템이 Termux 또는 Termux:API의 백그라운드 실행을 제한하는지 확인하세요;

일부 기기는 특정 앱을 기본 SMS 앱으로 설정해야 할 수 있습니다.

<b>SMS 전송 시 통신사 요금이 발생할 수 있습니다. 먼저 자신의 전화번호로 테스트하는 것을 권장합니다.</b>

### 팁

Android 시스템이 백그라운드 실행을 제한하거나 Termux 프로세스를 회수하여 서비스가 중단되는 것을 방지하기 위해, 시스템 설정에서 다음을 권장합니다:

- Termux를 백그라운드 실행 허용 목록에 추가;
- Termux의 배터리 최적화 또는 절전 제한 비활성화;
- Termux의 백그라운드 실행 허용.

스마트폰 브랜드에 따라 설정 이름이 다를 수 있습니다. 일반적으로 다음 위치에서 관련 옵션을 찾을 수 있습니다:

```text
설정 → 앱 → Termux → 배터리
```

기기 시스템에 따라 "백그라운드 실행 허용", "제한 없음" 또는 유사한 옵션을 선택하세요.

## Termux:API 설치

Termux를 열고 다음 명령어를 실행:

```bash
pkg update
pkg upgrade -y
pkg install termux-api -y
```

## 설치

### Node.js 설치

- (권장) Node.js LTS 설치
   ```
   pkg install nodejs-lts -y
   ```
- 현재 버전 설치
  ```
  pkg install nodejs -y
  ```

설치 완료 후 다음 명령어를 실행하여 설치 성공 여부와 버전 번호를 확인:

```bash
# Node.js 버전 확인
node -v

# npm 버전 확인
npm -v
```

### 방식 1: npm 전역 설치 (권장)

```bash
npm install -g @hreign/mobix
```

설치 후 `mobix` 명령어를 전역으로 사용할 수 있습니다.

### 방식 2: zip 배포

Node.js 관련 지식과 경험이 있는 경우,
[Release](https://github.com/hreign/mobix-android/releases)에서 `mobix-app.zip`을 다운로드하여 압축 해제 후 실행:

```bash
node app/dist/server.js
```

## 빠른 시작

```bash
# 서비스 시작 (기본 포트 7788, 백그라운드)
mobix start

# 서비스 상태 확인
mobix status

# 브라우저에서 접속
# http://<기기IP>:7788

# 서비스 중지
mobix stop
```

## 명령어

### mobix start

Mobix 서비스를 백그라운드에서 시작합니다. 터미널을 닫아도 서비스가 계속 실행됩니다.

```bash
mobix start                # 기본 포트 7788
mobix start --port 8080    # 포트 지정
```

### mobix stop

실행 중인 서비스를 중지합니다.

```bash
mobix stop
```

### mobix status

서비스 상태를 표시합니다. PID와 포트 정보를 표시합니다.

```bash
mobix status
```

### mobix restart

최신 설정으로 서비스를 재시작합니다.

```bash
mobix restart
```

### mobix pwd

접근 비밀번호를 설정하거나 조회합니다. 비밀번호는 AES-256-GCM으로 암호화됩니다.

```bash
mobix pwd                  # 비밀번호 상태 조회
mobix pwd mypassword       # 비밀번호 설정
mobix pwd ""               # 비밀번호 제거
```

비밀번호 설정 후 재시작 필요:

```bash
mobix pwd mypassword
mobix restart
```

### mobix port

수신 포트를 설정하거나 조회합니다.

```bash
mobix port                 # 현재 포트 조회
mobix port 9000            # 포트 변경
```

포트 변경 후 재시작 필요:

```bash
mobix port 9000
mobix restart
```

### mobix help

도움말 정보를 표시합니다.

```bash
mobix help                 # 최상위 도움말
mobix help start           # start 명령어 상세 도움말
```

## 설정

설정 파일은 `~/.mobix/config.json`, 파일 권한 0600.

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

| 설정 항목 | 설명 | 기본값 |
|--------|------|--------|
| port | 수신 포트 | 7788 |
| password | 접근 비밀번호 (암호화) | 없음 (비밀번호 불필요) |

포트 해결 우선순위: 설정 파일 > 환경변수 `PORT` > 기본값 7788

비밀번호 해결 우선순위: 설정 파일 > 환경변수 `MOBIX_PASSWORD` > 없음

## 백그라운드 실행

- `mobix start`는 백그라운드 데몬으로 시작, 터미널을 닫아도 계속 실행
- systemd / init / launchd에 의존하지 않음
- Android Termux에서 `termux-wake-lock`으로 기기 절전으로 인한 서비스 중단 방지 가능
- PID 파일은 `~/.mobix/mobix.pid`, stop / status / restart 명령어에서 사용

## 국제화

현재 앱은 8개 언어를 지원: 중국어, 영어, 일본어, 한국어, 프랑스어, 독일어, 스페인어, 러시아어.

시스템 언어에 따라 자동 전환, 추가 설정 불필요.

감지 실패 또는 지원되지 않는 언어가 감지된 경우, 영어로 폴백.

## TODO List

- [ ] SMS 전송 경험 개선
- [ ] 휴대폰 상태 모니터링 기능 추가
- [ ] 인터페이스 설계 개선
- [ ] 국제화 지원 추가
- [ ] 원격 통화 기능
- [ ] 메시지 푸시 기능 (배터리 알림, SMS 알림, 수신 알림)
  - 다양한 모니터링 방식이 기기 배터리 수명에 미치는 영향 평가
  - 저전력 구현 우선, 불필요한 폴링 감소
  - 사용자 정의 알림 조건, 알림 빈도, 중복 메시지 필터링 지원


## 개발 및 기여

어떤 형태의 기여도 환영합니다. 다음이 포함되지만 이에 국한되지 않습니다:

- issue를 제출하여 문제 보고 또는 제안
- pull request를 제출하여 코드 공유
- 사용 경험 공유 또는 문서 작성


## 라이선스

MIT
