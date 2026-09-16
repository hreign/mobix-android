export type Lang = 'zh' | 'en' | 'ja' | 'ko' | 'fr' | 'de' | 'es' | 'ru'

export interface Messages {
  nodeVersionRequired: string
  unknownCommand: string

  serviceRunning: string
  serviceStarted: string
  serviceNotRunning: string
  serviceStopped: string
  serviceStopFailed: string
  statusStopped: string
  statusRunning: string
  serviceRestarted: string

  pwdStatusSet: string
  pwdStatusUnset: string
  pwdSet: string
  pwdCleared: string

  currentPort: string
  portInvalid: string
  portSet: string

  helpText: string
  helpStart: string
  helpStop: string
  helpStatus: string
  helpRestart: string
  helpPwd: string
  helpPort: string
  helpHelp: string
  helpUnknownCommand: string
}

export const messages: Record<Lang, Messages> = {
  zh: {
    nodeVersionRequired: 'Mobix 需要 Node.js >= {min}，当前版本 {current}',
    unknownCommand: '未知命令：{command}',
    serviceRunning: '服务已在运行，端口 {port}',
    serviceStarted: 'Mobix 服务已启动\n  端口：{port}\n  PID：{pid}\n  访问地址：http://0.0.0.0:{port}',
    serviceNotRunning: '服务未运行',
    serviceStopped: 'Mobix 服务已停止',
    serviceStopFailed: '服务停止失败，可能需要手动终止进程 PID {pid}',
    statusStopped: 'Mobix 服务状态：未运行',
    statusRunning: 'Mobix 服务状态：运行中\n  PID：{pid}\n  端口：{port}',
    serviceRestarted: 'Mobix 服务已重启\n  端口：{port}\n  PID：{pid}\n  访问地址：http://0.0.0.0:{port}',
    pwdStatusSet: '密码状态：已设置',
    pwdStatusUnset: '密码状态：未设置',
    pwdSet: '密码已设置，重启服务后生效',
    pwdCleared: '密码已清除，服务将免密访问',
    currentPort: '当前端口：{port}',
    portInvalid: '端口号必须为 1-65535 之间的整数',
    portSet: '端口已设置为 {port}，重启服务后生效',
    helpText: `Mobix - Android Termux 手机管理工具

用法：mobix <命令> [参数]

可用命令：
  start [--port <端口号>]   启动服务（后台运行，关闭终端不退出）
  stop                      停止服务
  status                    查看服务运行状态
  restart                   重启服务
  pwd [密码]                设置/查看访问密码（无参数查看状态，空字符串清除）
  port [端口号]             设置/查看监听端口（无参数查看当前端口）
  help [命令]               显示帮助信息

示例：
  mobix start                启动服务（默认端口 7788）
  mobix start --port 8080    以指定端口启动
  mobix pwd mypassword       设置访问密码
  mobix pwd                  查看密码状态
  mobix port 9000            修改默认端口
  mobix stop                 停止服务

配置文件位置：~/.mobix/config.json`,
    helpStart: `mobix start [--port <端口号>]

启动 Mobix 服务，后台运行，关闭终端后服务继续运行。

参数：
  --port <端口号>   临时指定本次启动端口（不写入配置文件）

示例：
  mobix start
  mobix start --port 8080`,
    helpStop: `mobix stop

停止正在运行的 Mobix 服务。

示例：
  mobix stop`,
    helpStatus: `mobix status

查看 Mobix 服务运行状态，显示 PID 与端口信息。

示例：
  mobix status`,
    helpRestart: `mobix restart

重启 Mobix 服务，使用最新配置。

示例：
  mobix restart`,
    helpPwd: `mobix pwd [密码]

设置或查看访问密码。密码加密存储于配置文件中。

参数：
  无参数    查看密码状态（已设置/未设置），不回显明文
  <密码>    设置访问密码，重启服务后生效
  ""        空字符串清除密码，服务将免密访问

示例：
  mobix pwd
  mobix pwd mypassword
  mobix pwd ""`,
    helpPort: `mobix port [端口号]

设置或查看监听端口。

参数：
  无参数      查看当前端口
  <端口号>    设置端口（1-65535），重启服务后生效

示例：
  mobix port
  mobix port 9000`,
    helpHelp: `mobix help [命令]

显示帮助信息。

参数：
  无参数    显示顶级帮助
  <命令>    显示对应子命令的详细帮助

示例：
  mobix help
  mobix help start`,
    helpUnknownCommand: '未知命令：{command}',
  },

  en: {
    nodeVersionRequired: 'Mobix requires Node.js >= {min}, current version {current}',
    unknownCommand: 'Unknown command: {command}',
    serviceRunning: 'Service is already running on port {port}',
    serviceStarted: 'Mobix service started\n  Port: {port}\n  PID: {pid}\n  URL: http://0.0.0.0:{port}',
    serviceNotRunning: 'Service is not running',
    serviceStopped: 'Mobix service stopped',
    serviceStopFailed: 'Failed to stop service, you may need to manually kill process PID {pid}',
    statusStopped: 'Mobix service status: not running',
    statusRunning: 'Mobix service status: running\n  PID: {pid}\n  Port: {port}',
    serviceRestarted: 'Mobix service restarted\n  Port: {port}\n  PID: {pid}\n  URL: http://0.0.0.0:{port}',
    pwdStatusSet: 'Password status: set',
    pwdStatusUnset: 'Password status: not set',
    pwdSet: 'Password set, restart the service to take effect',
    pwdCleared: 'Password cleared, service will allow access without password',
    currentPort: 'Current port: {port}',
    portInvalid: 'Port must be an integer between 1 and 65535',
    portSet: 'Port set to {port}, restart the service to take effect',
    helpText: `Mobix - Android Termux phone management tool

Usage: mobix <command> [args]

Available commands:
  start [--port <port>]   Start service (background, survives terminal close)
  stop                    Stop service
  status                  Show service status
  restart                 Restart service
  pwd [password]          Set/view access password (no arg shows status, empty string clears)
  port [port]             Set/view listening port (no arg shows current port)
  help [command]          Show help information

Examples:
  mobix start                Start service (default port 7788)
  mobix start --port 8080    Start with specific port
  mobix pwd mypassword       Set access password
  mobix pwd                  Show password status
  mobix port 9000            Change default port
  mobix stop                 Stop service

Config file: ~/.mobix/config.json`,
    helpStart: `mobix start [--port <port>]

Start Mobix service in background, survives terminal close.

Arguments:
  --port <port>   Override port for this start (not saved to config)

Examples:
  mobix start
  mobix start --port 8080`,
    helpStop: `mobix stop

Stop the running Mobix service.

Example:
  mobix stop`,
    helpStatus: `mobix status

Show Mobix service status, displays PID and port info.

Example:
  mobix status`,
    helpRestart: `mobix restart

Restart Mobix service with latest config.

Example:
  mobix restart`,
    helpPwd: `mobix pwd [password]

Set or view access password. Password is encrypted in config file.

Arguments:
  (none)      Show password status (set/not set), no plaintext shown
  <password>  Set access password, restart to take effect
  ""          Empty string clears password, service allows access without password

Examples:
  mobix pwd
  mobix pwd mypassword
  mobix pwd ""`,
    helpPort: `mobix port [port]

Set or view listening port.

Arguments:
  (none)    Show current port
  <port>    Set port (1-65535), restart to take effect

Examples:
  mobix port
  mobix port 9000`,
    helpHelp: `mobix help [command]

Show help information.

Arguments:
  (none)    Show top-level help
  <command> Show detailed help for a specific command

Examples:
  mobix help
  mobix help start`,
    helpUnknownCommand: 'Unknown command: {command}',
  },

  ja: {
    nodeVersionRequired: 'Mobix には Node.js >= {min} が必要です。現在のバージョン {current}',
    unknownCommand: '不明なコマンド：{command}',
    serviceRunning: 'サービスは既に実行中です（ポート {port}）',
    serviceStarted: 'Mobix サービスを開始しました\n  ポート：{port}\n  PID：{pid}\n  URL：http://0.0.0.0:{port}',
    serviceNotRunning: 'サービスは実行されていません',
    serviceStopped: 'Mobix サービスを停止しました',
    serviceStopFailed: 'サービスの停止に失敗しました。プロセス PID {pid} を手動で終了してください',
    statusStopped: 'Mobix サービス状態：停止中',
    statusRunning: 'Mobix サービス状態：実行中\n  PID：{pid}\n  ポート：{port}',
    serviceRestarted: 'Mobix サービスを再起動しました\n  ポート：{port}\n  PID：{pid}\n  URL：http://0.0.0.0:{port}',
    pwdStatusSet: 'パスワード状態：設定済み',
    pwdStatusUnset: 'パスワード状態：未設定',
    pwdSet: 'パスワードを設定しました。サービスの再起動後に有効になります',
    pwdCleared: 'パスワードをクリアしました。パスワードなしでアクセスできます',
    currentPort: '現在のポート：{port}',
    portInvalid: 'ポートは 1〜65535 の整数で指定してください',
    portSet: 'ポートを {port} に設定しました。サービスの再起動後に有効になります',
    helpText: `Mobix - Android Termux 携帯電話管理ツール

使い方：mobix <コマンド> [引数]

使用可能なコマンド：
  start [--port <ポート>]   サービス開始（バックグラウンド、ターミナル終了後も継続）
  stop                      サービス停止
  status                    サービス状態表示
  restart                   サービス再起動
  pwd [パスワード]          アクセスパスワードの設定/表示
  port [ポート]             リッスンポートの設定/表示
  help [コマンド]           ヘルプ表示

例：
  mobix start                サービス開始（デフォルトポート 7788）
  mobix start --port 8080    指定ポートで開始
  mobix pwd mypassword       パスワード設定
  mobix pwd                  パスワード状態表示
  mobix port 9000            デフォルトポート変更
  mobix stop                 サービス停止

設定ファイル：~/.mobix/config.json`,
    helpStart: `mobix start [--port <ポート>]

Mobix サービスをバックグラウンドで開始します。

引数：
  --port <ポート>   今回の起動ポートを指定（設定ファイルには保存されません）

例：
  mobix start
  mobix start --port 8080`,
    helpStop: `mobix stop

実行中の Mobix サービスを停止します。

例：
  mobix stop`,
    helpStatus: `mobix status

Mobix サービスの状態を表示します。

例：
  mobix status`,
    helpRestart: `mobix restart

Mobix サービスを最新設定で再起動します。

例：
  mobix restart`,
    helpPwd: `mobix pwd [パスワード]

アクセスパスワードを設定または表示します。

引数：
  なし          パスワード状態表示（設定済み/未設定）
  <パスワード>  パスワード設定、再起動後に有効
  ""            空文字でパスワードクリア

例：
  mobix pwd
  mobix pwd mypassword
  mobix pwd ""`,
    helpPort: `mobix port [ポート]

リッスンポートを設定または表示します。

引数：
  なし        現在のポート表示
  <ポート>    ポート設定（1-65535）、再起動後に有効

例：
  mobix port
  mobix port 9000`,
    helpHelp: `mobix help [コマンド]

ヘルプ情報を表示します。

引数：
  なし        トップレベルヘルプ表示
  <コマンド>  指定コマンドの詳細ヘルプ表示

例：
  mobix help
  mobix help start`,
    helpUnknownCommand: '不明なコマンド：{command}',
  },

  ko: {
    nodeVersionRequired: 'Mobix는 Node.js >= {min}이 필요합니다. 현재 버전 {current}',
    unknownCommand: '알 수 없는 명령: {command}',
    serviceRunning: '서비스가 이미 실행 중입니다 (포트 {port})',
    serviceStarted: 'Mobix 서비스 시작됨\n  포트: {port}\n  PID: {pid}\n  URL: http://0.0.0.0:{port}',
    serviceNotRunning: '서비스가 실행 중이 아닙니다',
    serviceStopped: 'Mobix 서비스 중지됨',
    serviceStopFailed: '서비스 중지 실패, 프로세스 PID {pid}를 수동으로 종료해야 할 수 있습니다',
    statusStopped: 'Mobix 서비스 상태: 실행 중 아님',
    statusRunning: 'Mobix 서비스 상태: 실행 중\n  PID: {pid}\n  포트: {port}',
    serviceRestarted: 'Mobix 서비스 재시작됨\n  포트: {port}\n  PID: {pid}\n  URL: http://0.0.0.0:{port}',
    pwdStatusSet: '비밀번호 상태: 설정됨',
    pwdStatusUnset: '비밀번호 상태: 설정되지 않음',
    pwdSet: '비밀번호가 설정되었습니다, 서비스 재시작 후 적용됩니다',
    pwdCleared: '비밀번호가 제거되었습니다, 비밀번호 없이 접근 가능합니다',
    currentPort: '현재 포트: {port}',
    portInvalid: '포트는 1-65535 사이의 정수여야 합니다',
    portSet: '포트가 {port}로 설정되었습니다, 서비스 재시작 후 적용됩니다',
    helpText: `Mobix - Android Termux 휴대폰 관리 도구

사용법: mobix <명령> [인수]

사용 가능한 명령:
  start [--port <포트>]   서비스 시작 (백그라운드, 터미널 종료 후에도 유지)
  stop                    서비스 중지
  status                  서비스 상태 표시
  restart                 서비스 재시작
  pwd [비밀번호]          접근 비밀번호 설정/조회
  port [포트]             수신 포트 설정/조회
  help [명령]             도움말 표시

예:
  mobix start                서비스 시작 (기본 포트 7788)
  mobix start --port 8080    지정 포트로 시작
  mobix pwd mypassword       접근 비밀번호 설정
  mobix pwd                  비밀번호 상태 조회
  mobix port 9000            기본 포트 변경
  mobix stop                 서비스 중지

설정 파일: ~/.mobix/config.json`,
    helpStart: `mobix start [--port <포트>]

Mobix 서비스를 백그라운드에서 시작합니다.

인수:
  --port <포트>   이번 시작에만 포트 지정 (설정 파일에 저장되지 않음)

예:
  mobix start
  mobix start --port 8080`,
    helpStop: `mobix stop

실행 중인 Mobix 서비스를 중지합니다.

예:
  mobix stop`,
    helpStatus: `mobix status

Mobix 서비스 상태를 표시합니다.

예:
  mobix status`,
    helpRestart: `mobix restart

Mobix 서비스를 최신 설정으로 재시작합니다.

예:
  mobix restart`,
    helpPwd: `mobix pwd [비밀번호]

접근 비밀번호를 설정하거나 조회합니다.

인수:
  (없음)          비밀번호 상태 조회 (설정됨/설정되지 않음)
  <비밀번호>      비밀번호 설정, 재시작 후 적용
  ""              빈 문자열로 비밀번호 제거

예:
  mobix pwd
  mobix pwd mypassword
  mobix pwd ""`,
    helpPort: `mobix port [포트]

수신 포트를 설정하거나 조회합니다.

인수:
  (없음)      현재 포트 조회
  <포트>      포트 설정 (1-65535), 재시작 후 적용

예:
  mobix port
  mobix port 9000`,
    helpHelp: `mobix help [명령]

도움말 정보를 표시합니다.

인수:
  (없음)      최상위 도움말 표시
  <명령>      특정 명령의 상세 도움말 표시

예:
  mobix help
  mobix help start`,
    helpUnknownCommand: '알 수 없는 명령: {command}',
  },

  fr: {
    nodeVersionRequired: 'Mobix nécessite Node.js >= {min}, version actuelle {current}',
    unknownCommand: 'Commande inconnue : {command}',
    serviceRunning: 'Le service est déjà en cours d\'exécution sur le port {port}',
    serviceStarted: 'Service Mobix démarré\n  Port : {port}\n  PID : {pid}\n  URL : http://0.0.0.0:{port}',
    serviceNotRunning: 'Le service n\'est pas en cours d\'exécution',
    serviceStopped: 'Service Mobix arrêté',
    serviceStopFailed: 'Échec de l\'arrêt du service, vous devrez peut-être tuer manuellement le processus PID {pid}',
    statusStopped: 'État du service Mobix : arrêté',
    statusRunning: 'État du service Mobix : en cours d\'exécution\n  PID : {pid}\n  Port : {port}',
    serviceRestarted: 'Service Mobix redémarré\n  Port : {port}\n  PID : {pid}\n  URL : http://0.0.0.0:{port}',
    pwdStatusSet: 'État du mot de passe : défini',
    pwdStatusUnset: 'État du mot de passe : non défini',
    pwdSet: 'Mot de passe défini, redémarrez le service pour appliquer',
    pwdCleared: 'Mot de passe effacé, le service sera accessible sans mot de passe',
    currentPort: 'Port actuel : {port}',
    portInvalid: 'Le port doit être un entier entre 1 et 65535',
    portSet: 'Port défini sur {port}, redémarrez le service pour appliquer',
    helpText: `Mobix - Outil de gestion de téléphone Android Termux

Utilisation : mobix <commande> [args]

Commandes disponibles :
  start [--port <port>]   Démarrer le service (arrière-plan, survit à la fermeture du terminal)
  stop                    Arrêter le service
  status                  Afficher l'état du service
  restart                 Redémarrer le service
  pwd [motdepasse]        Définir/afficher le mot de passe d'accès
  port [port]             Définir/afficher le port d'écoute
  help [commande]         Afficher l'aide

Exemples :
  mobix start                Démarrer le service (port par défaut 7788)
  mobix start --port 8080    Démarrer avec un port spécifique
  mobix pwd mypassword       Définir le mot de passe d'accès
  mobix pwd                  Afficher l'état du mot de passe
  mobix port 9000            Changer le port par défaut
  mobix stop                 Arrêter le service

Fichier de configuration : ~/.mobix/config.json`,
    helpStart: `mobix start [--port <port>]

Démarrer le service Mobix en arrière-plan.

Arguments :
  --port <port>   Remplacer le port pour ce démarrage (non sauvegardé)

Exemples :
  mobix start
  mobix start --port 8080`,
    helpStop: `mobix stop

Arrêter le service Mobix en cours d'exécution.

Exemple :
  mobix stop`,
    helpStatus: `mobix status

Afficher l'état du service Mobix.

Exemple :
  mobix status`,
    helpRestart: `mobix restart

Redémarrer le service Mobix avec la dernière configuration.

Exemple :
  mobix restart`,
    helpPwd: `mobix pwd [motdepasse]

Définir ou afficher le mot de passe d'accès.

Arguments :
  (aucun)          Afficher l'état du mot de passe
  <motdepasse>     Définir le mot de passe, redémarrer pour appliquer
  ""               Effacer le mot de passe

Exemples :
  mobix pwd
  mobix pwd mypassword
  mobix pwd ""`,
    helpPort: `mobix port [port]

Définir ou afficher le port d'écoute.

Arguments :
  (aucun)    Afficher le port actuel
  <port>     Définir le port (1-65535), redémarrer pour appliquer

Exemples :
  mobix port
  mobix port 9000`,
    helpHelp: `mobix help [commande]

Afficher l'aide.

Arguments :
  (aucun)      Afficher l'aide générale
  <commande>   Afficher l'aide détaillée d'une commande

Exemples :
  mobix help
  mobix help start`,
    helpUnknownCommand: 'Commande inconnue : {command}',
  },

  de: {
    nodeVersionRequired: 'Mobix benötigt Node.js >= {min}, aktuelle Version {current}',
    unknownCommand: 'Unbekannter Befehl: {command}',
    serviceRunning: 'Service läuft bereits auf Port {port}',
    serviceStarted: 'Mobix-Service gestartet\n  Port: {port}\n  PID: {pid}\n  URL: http://0.0.0.0:{port}',
    serviceNotRunning: 'Service läuft nicht',
    serviceStopped: 'Mobix-Service gestoppt',
    serviceStopFailed: 'Stoppen des Services fehlgeschlagen, Sie müssen möglicherweise Prozess PID {pid} manuell beenden',
    statusStopped: 'Mobix-Service-Status: nicht aktiv',
    statusRunning: 'Mobix-Service-Status: aktiv\n  PID: {pid}\n  Port: {port}',
    serviceRestarted: 'Mobix-Service neu gestartet\n  Port: {port}\n  PID: {pid}\n  URL: http://0.0.0.0:{port}',
    pwdStatusSet: 'Passwort-Status: gesetzt',
    pwdStatusUnset: 'Passwort-Status: nicht gesetzt',
    pwdSet: 'Passwort gesetzt, Service neu starten zum Anwenden',
    pwdCleared: 'Passwort gelöscht, Service ohne Passwort zugänglich',
    currentPort: 'Aktueller Port: {port}',
    portInvalid: 'Port muss eine Ganzzahl zwischen 1 und 65535 sein',
    portSet: 'Port auf {port} gesetzt, Service neu starten zum Anwenden',
    helpText: `Mobix - Android Termux Telefon-Verwaltungstool

Verwendung: mobix <Befehl> [Args]

Verfügbare Befehle:
  start [--port <Port>]   Service starten (Hintergrund, überlebt Terminal-Schließung)
  stop                    Service stoppen
  status                  Service-Status anzeigen
  restart                 Service neu starten
  pwd [Passwort]          Zugriffspasswort setzen/anzeigen
  port [Port]             Listening-Port setzen/anzeigen
  help [Befehl]           Hilfe anzeigen

Beispiele:
  mobix start                Service starten (Standard-Port 7788)
  mobix start --port 8080    Mit spezifischem Port starten
  mobix pwd mypassword       Zugriffspasswort setzen
  mobix pwd                  Passwort-Status anzeigen
  mobix port 9000            Standard-Port ändern
  mobix stop                 Service stoppen

Konfigurationsdatei: ~/.mobix/config.json`,
    helpStart: `mobix start [--port <Port>]

Mobix-Service im Hintergrund starten.

Argumente:
  --port <Port>   Port für diesen Start überschreiben (nicht gespeichert)

Beispiele:
  mobix start
  mobix start --port 8080`,
    helpStop: `mobix stop

Laufenden Mobix-Service stoppen.

Beispiel:
  mobix stop`,
    helpStatus: `mobix status

Mobix-Service-Status anzeigen.

Beispiel:
  mobix status`,
    helpRestart: `mobix restart

Mobix-Service mit aktueller Konfiguration neu starten.

Beispiel:
  mobix restart`,
    helpPwd: `mobix pwd [Passwort]

Zugriffspasswort setzen oder anzeigen.

Argumente:
  (keins)        Passwort-Status anzeigen
  <Passwort>     Passwort setzen, Neustart zum Anwenden
  ""             Leerstring löscht Passwort

Beispiele:
  mobix pwd
  mobix pwd mypassword
  mobix pwd ""`,
    helpPort: `mobix port [Port]

Listening-Port setzen oder anzeigen.

Argumente:
  (keins)    Aktuellen Port anzeigen
  <Port>     Port setzen (1-65535), Neustart zum Anwenden

Beispiele:
  mobix port
  mobix port 9000`,
    helpHelp: `mobix help [Befehl]

Hilfe anzeigen.

Argumente:
  (keins)     Allgemeine Hilfe anzeigen
  <Befehl>    Detaillierte Hilfe für Befehl anzeigen

Beispiele:
  mobix help
  mobix help start`,
    helpUnknownCommand: 'Unbekannter Befehl: {command}',
  },

  es: {
    nodeVersionRequired: 'Mobix requiere Node.js >= {min}, versión actual {current}',
    unknownCommand: 'Comando desconocido: {command}',
    serviceRunning: 'El servicio ya está en ejecución en el puerto {port}',
    serviceStarted: 'Servicio Mobix iniciado\n  Puerto: {port}\n  PID: {pid}\n  URL: http://0.0.0.0:{port}',
    serviceNotRunning: 'El servicio no está en ejecución',
    serviceStopped: 'Servicio Mobix detenido',
    serviceStopFailed: 'Error al detener el servicio, puede que necesite terminar manualmente el proceso PID {pid}',
    statusStopped: 'Estado del servicio Mobix: detenido',
    statusRunning: 'Estado del servicio Mobix: en ejecución\n  PID: {pid}\n  Puerto: {port}',
    serviceRestarted: 'Servicio Mobix reiniciado\n  Puerto: {port}\n  PID: {pid}\n  URL: http://0.0.0.0:{port}',
    pwdStatusSet: 'Estado de contraseña: establecida',
    pwdStatusUnset: 'Estado de contraseña: no establecida',
    pwdSet: 'Contraseña establecida, reinicie el servicio para aplicar',
    pwdCleared: 'Contraseña eliminada, el servicio será accesible sin contraseña',
    currentPort: 'Puerto actual: {port}',
    portInvalid: 'El puerto debe ser un entero entre 1 y 65535',
    portSet: 'Puerto establecido en {port}, reinicie el servicio para aplicar',
    helpText: `Mobix - Herramienta de gestión de teléfono Android Termux

Uso: mobix <comando> [args]

Comandos disponibles:
  start [--port <puerto>]   Iniciar servicio (segundo plano, sobrevive al cierre del terminal)
  stop                     Detener servicio
  status                   Mostrar estado del servicio
  restart                  Reiniciar servicio
  pwd [contraseña]         Establecer/ver contraseña de acceso
  port [puerto]            Establecer/ver puerto de escucha
  help [comando]           Mostrar ayuda

Ejemplos:
  mobix start                Iniciar servicio (puerto por defecto 7788)
  mobix start --port 8080    Iniciar con puerto específico
  mobix pwd mypassword       Establecer contraseña de acceso
  mobix pwd                  Mostrar estado de contraseña
  mobix port 9000            Cambiar puerto por defecto
  mobix stop                 Detener servicio

Archivo de configuración: ~/.mobix/config.json`,
    helpStart: `mobix start [--port <puerto>]

Iniciar servicio Mobix en segundo plano.

Argumentos:
  --port <puerto>   Sobrescribir puerto para este inicio (no guardado)

Ejemplos:
  mobix start
  mobix start --port 8080`,
    helpStop: `mobix stop

Detener el servicio Mobix en ejecución.

Ejemplo:
  mobix stop`,
    helpStatus: `mobix status

Mostrar el estado del servicio Mobix.

Ejemplo:
  mobix status`,
    helpRestart: `mobix restart

Reiniciar servicio Mobix con la última configuración.

Ejemplo:
  mobix restart`,
    helpPwd: `mobix pwd [contraseña]

Establecer o ver la contraseña de acceso.

Argumentos:
  (ninguno)          Mostrar estado de contraseña
  <contraseña>       Establecer contraseña, reiniciar para aplicar
  ""                 Cadena vacía elimina contraseña

Ejemplos:
  mobix pwd
  mobix pwd mypassword
  mobix pwd ""`,
    helpPort: `mobix port [puerto]

Establecer o ver el puerto de escucha.

Argumentos:
  (ninguno)    Mostrar puerto actual
  <puerto>     Establecer puerto (1-65535), reiniciar para aplicar

Ejemplos:
  mobix port
  mobix port 9000`,
    helpHelp: `mobix help [comando]

Mostrar ayuda.

Argumentos:
  (ninguno)     Mostrar ayuda general
  <comando>     Mostrar ayuda detallada de un comando

Ejemplos:
  mobix help
  mobix help start`,
    helpUnknownCommand: 'Comando desconocido: {command}',
  },

  ru: {
    nodeVersionRequired: 'Mobix требует Node.js >= {min}, текущая версия {current}',
    unknownCommand: 'Неизвестная команда: {command}',
    serviceRunning: 'Сервис уже запущен на порту {port}',
    serviceStarted: 'Сервис Mobix запущен\n  Порт: {port}\n  PID: {pid}\n  URL: http://0.0.0.0:{port}',
    serviceNotRunning: 'Сервис не запущен',
    serviceStopped: 'Сервис Mobix остановлен',
    serviceStopFailed: 'Не удалось остановить сервис, возможно потребуется вручную завершить процесс PID {pid}',
    statusStopped: 'Статус сервиса Mobix: не запущен',
    statusRunning: 'Статус сервиса Mobix: запущен\n  PID: {pid}\n  Порт: {port}',
    serviceRestarted: 'Сервис Mobix перезапущен\n  Порт: {port}\n  PID: {pid}\n  URL: http://0.0.0.0:{port}',
    pwdStatusSet: 'Статус пароля: установлен',
    pwdStatusUnset: 'Статус пароля: не установлен',
    pwdSet: 'Пароль установлен, перезапустите сервис для применения',
    pwdCleared: 'Пароль очищен, сервис доступен без пароля',
    currentPort: 'Текущий порт: {port}',
    portInvalid: 'Порт должен быть целым числом от 1 до 65535',
    portSet: 'Порт установлен на {port}, перезапустите сервис для применения',
    helpText: `Mobix - Инструмент управления телефоном Android Termux

Использование: mobix <команда> [аргументы]

Доступные команды:
  start [--port <порт>]   Запустить сервис (фоновый режим, переживает закрытие терминала)
  stop                    Остановить сервис
  status                  Показать статус сервиса
  restart                 Перезапустить сервис
  pwd [пароль]            Установить/показать пароль доступа
  port [порт]             Установить/показать порт прослушивания
  help [команда]          Показать справку

Примеры:
  mobix start                Запустить сервис (порт по умолчанию 7788)
  mobix start --port 8080    Запустить с указанным портом
  mobix pwd mypassword       Установить пароль доступа
  mobix pwd                  Показать статус пароля
  mobix port 9000            Изменить порт по умолчанию
  mobix stop                 Остановить сервис

Файл конфигурации: ~/.mobix/config.json`,
    helpStart: `mobix start [--port <порт>]

Запустить сервис Mobix в фоновом режиме.

Аргументы:
  --port <порт>   Переопределить порт для этого запуска (не сохраняется)

Примеры:
  mobix start
  mobix start --port 8080`,
    helpStop: `mobix stop

Остановить запущенный сервис Mobix.

Пример:
  mobix stop`,
    helpStatus: `mobix status

Показать статус сервиса Mobix.

Пример:
  mobix status`,
    helpRestart: `mobix restart

Перезапустить сервис Mobix с последней конфигурацией.

Пример:
  mobix restart`,
    helpPwd: `mobix pwd [пароль]

Установить или показать пароль доступа.

Аргументы:
  (нет)         Показать статус пароля
  <пароль>      Установить пароль, перезапуск для применения
  ""            Пустая строка очищает пароль

Примеры:
  mobix pwd
  mobix pwd mypassword
  mobix pwd ""`,
    helpPort: `mobix port [порт]

Установить или показать порт прослушивания.

Аргументы:
  (нет)      Показать текущий порт
  <порт>     Установить порт (1-65535), перезапуск для применения

Примеры:
  mobix port
  mobix port 9000`,
    helpHelp: `mobix help [команда]

Показать справку.

Аргументы:
  (нет)       Показать общую справку
  <команда>   Показать детальную справку по команде

Примеры:
  mobix help
  mobix help start`,
    helpUnknownCommand: 'Неизвестная команда: {command}',
  },
}
