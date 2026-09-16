# Mobix - Deutsche Dokumentation

Über eine Web-Oberfläche den Telefonstatus, SMS-Verwaltung und Anrufverwaltung einsehen.

## Inhaltsverzeichnis

- [Funktionen](#funktionen)
- [Voraussetzungen](#voraussetzungen)
- [Termux:API installieren](#termuxapi-installieren)
- [Installation](#installation)
- [Schnellstart](#schnellstart)
- [Befehle](#befehle)
- [Konfiguration](#konfiguration)
- [Hintergrunddienst](#hintergrunddienst)
- [Internationalisierung](#internationalisierung)
- [TODO List](#todo-list)
- [Entwicklung und Beitrag](#entwicklung-und-beitrag)
- [Lizenz](#lizenz)

## Funktionen

### Telefonstatus

- **Netzwerkstatus**: SSID, IP-Adresse, Signalstärke, Verbindungsgeschwindigkeit
- **SIM-Kartenstatus**: Anbietername, SIM-Kartenstatus
- **Akkuzustand**: Akkuprozent, Temperatur, Ladezustand, Stromquellentyp

### SMS-Verwaltung

- **Posteingang/Gesendet**: Umschaltung nach type-Feld, unabhängige Paginierung, Kategoriezähler
- **SMS senden**: Manuelle Nummerneingabe oder aus Kontakten wählen
- **Schnellantwort**: „Antworten"-Eintrag in Listenelementen, Ein-Klick-Sprung zum Senden-Formular mit vorausgefüllter Nummer
- **Paginierung**: SMS-Verlauf blättern

### Anrufliste

- **Klassifizierungs-Tags**: Eingehend, Ausgehend, Verpasst
- **Unbekannte Nummern**: Telefonnummer direkt anzeigen (kein Platzhaltertext)
- **Sortierung**: Antichronologische Reihenfolge

### Passwortschutz

- Zugriffspasswort über `mobix pwd`-Befehl festlegen
- Passwort mit AES-256-GCM in Konfigurationsdatei verschlüsselt
- Kein Passwort nötig wenn nicht gesetzt
- Neustart nach Setzen/Löschen des Passworts erforderlich

## Voraussetzungen

Dieses Projekt muss auf einem Android-Gerät ausgeführt werden und hängt von Termux, Termux:API und Node.js ab.

### Zu installierende Apps

Es wird empfohlen, die folgenden Apps über F-Droid zu installieren:

- [Termux](https://f-droid.org/en/packages/com.termux/)
- [Termux:API](https://f-droid.org/en/packages/com.termux.api/)

Termux und Termux:API sollten aus demselben Kanal installiert werden, um Plugin-Probleme durch Signatur- oder Versionsinkonsistenz zu vermeiden.

### Android-Berechtigungen

Das Projekt ruft Android-Systemfunktionen über Termux:API auf. Bei der ersten Nutzung der entsprechenden Funktionen müssen Sie Termux:API in den Systemeinstellungen die entsprechenden Berechtigungen erteilen.

Normalerweise zu finden unter:

```
Einstellungen → Apps → Termux:API → Berechtigungen
```

Menünamen können je nach Android-Version und Telefonhersteller leicht abweichen.

Zuordnung zwischen Befehlen und Berechtigungen:

| Befehl | Funktion | Erforderliche Berechtigung |
| --- | ---| --- |
| termux-battery-status | Akkustatus abrufen | Normalerweise keine zusätzliche Berechtigung |
| termux-wifi-connectioninfo | WLAN-Verbindungsinformationen abrufen | Netzwerkberechtigung; einige Systeme benötigen auch Standort |
| termux-telephony-deviceinfo | Geräte- und SIM-Karten-Info abrufen | Telefon- oder Geräteinfo-Berechtigung |
| termux-sms-list | SMS lesen | SMS-Leseberechtigung |
| termux-sms-send | SMS senden | SMS-Sendeberechtigung |
| termux-contact-list | Kontakte lesen | Kontaktberechtigung |
| termux-call-log | Anrufliste lesen | Anruflisten-Berechtigung |

Wenn Sie eine Funktion nicht nutzen, ist die entsprechende Berechtigung nicht erforderlich.

### Android-SMS-Sendebestätigung

Einige Android-Versionen oder Telefonsysteme können bei erstmaligem SMS-Versand eine manuelle Bestätigung erfordern oder SMS-, Premium-SMS- oder andere Autorisierungs-Prompts anzeigen.

Wenn der SMS-Versand fehlschlägt, prüfen Sie Folgendes:

Bestätigen Sie, dass Termux:API die SMS-Berechtigung erteilt wurde;
Führen Sie manuell einen SMS-Testbefehl aus:

```bash
termux-sms-send -n "10086" ""
```

- Wenn das System ein Bestätigungsfenster anzeigt, manuell erlauben;
- Wenn das System verlangt, „Premium-SMS" zu erlauben, nach Bedarf bestätigen;
- Prüfen, ob das System Termux oder Termux:API an der Hintergrundausführung hindert;

Einige Geräte können erfordern, dass eine App als Standard-SMS-App festgelegt wird.

<b>Der SMS-Versand kann Gebühren des Netzbetreibers verursachen. Es wird empfohlen, zuerst mit der eigenen Telefonnummer zu testen.</b>

### Tipps

Um zu vermeiden, dass das Android-System die Hintergrundausführung einschränkt oder den Termux-Prozess zurückfordert und den Dienst unterbricht, wird in den Systemeinstellungen empfohlen:

- Termux zur Hintergrund-Ausnahmeliste hinzufügen;
- Akkuoptimierung oder Energiesparlimits für Termux deaktivieren;
- Termux die Hintergrundausführung erlauben.

Die Einstellungsnamen können je nach Marke variieren. Normalerweise zu finden unter:

```text
Einstellungen → Apps → Termux → Akku
```

Wählen Sie je nach Gerätesystem „Hintergrundausführung erlauben", „Uneingeschränkt" oder eine ähnliche Option.

## Termux:API installieren

Termux öffnen und folgende Befehle ausführen:

```bash
pkg update
pkg upgrade -y
pkg install termux-api -y
```

## Installation

### Node.js installieren

- (Empfohlen) Node.js LTS installieren
   ```
   pkg install nodejs-lts -y
   ```
- Aktuelle Version installieren
  ```
  pkg install nodejs -y
  ```

Nach der Installation können folgende Befehle ausgeführt werden, um den Erfolg und die Versionsnummer zu überprüfen:

```bash
# Node.js-Version prüfen
node -v

# npm-Version prüfen
npm -v
```

### Option 1: npm globale Installation (empfohlen)

```bash
npm install -g @hreign/mobix
```

Der `mobix`-Befehl ist dann global verfügbar.

### Option 2: zip-Distribution

Wenn Sie Node.js-Kenntnisse und -Erfahrung haben,
`mobix-app.zip` aus [Release](https://github.com/hreign/mobix-android/releases) herunterladen, entpacken und ausführen:

```bash
node app/dist/server.js
```

## Schnellstart

```bash
# Dienst starten (Standard-Port 7788, Hintergrund)
mobix start

# Dienst-Status abfragen
mobix status

# Im Browser öffnen
# http://<gerät-ip>:7788

# Dienst stoppen
mobix stop
```

## Befehle

### mobix start

Mobix-Dienst im Hintergrund starten, überlebt Terminal-Schließung.

```bash
mobix start                # Standard-Port 7788
mobix start --port 8080    # Port überschreiben
```

### mobix stop

Laufenden Dienst stoppen.

```bash
mobix stop
```

### mobix status

Dienst-Status anzeigen, PID und Port.

```bash
mobix status
```

### mobix restart

Dienst mit aktueller Konfiguration neu starten.

```bash
mobix restart
```

### mobix pwd

Zugriffspasswort setzen oder anzeigen. AES-256-GCM verschlüsselt.

```bash
mobix pwd                  # Passwort-Status anzeigen
mobix pwd mypassword       # Passwort setzen
mobix pwd ""               # Passwort löschen
```

Neustart nach Setzen erforderlich:

```bash
mobix pwd mypassword
mobix restart
```

### mobix port

Listening-Port setzen oder anzeigen.

```bash
mobix port                 # Aktuellen Port anzeigen
mobix port 9000            # Port ändern
```

Neustart nach Änderung erforderlich:

```bash
mobix port 9000
mobix restart
```

### mobix help

Hilfe anzeigen.

```bash
mobix help                 # Allgemeine Hilfe
mobix help start           # Detaillierte Hilfe für start
```

## Konfiguration

Konfigurationsdatei: `~/.mobix/config.json`, Berechtigung 0600.

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

| Option | Beschreibung | Standard |
|--------|------|--------|
| port | Listening-Port | 7788 |
| password | Zugriffspasswort (verschlüsselt) | Keins (kein Passwort) |

Port-Priorität: Konfig-Datei > env `PORT` > Standard 7788

Passwort-Priorität: Konfig-Datei > env `MOBIX_PASSWORD` > keins

## Hintergrunddienst

- `mobix start` startet als Hintergrund-Daemon, überlebt Terminal-Schließung
- Unabhängig von systemd / init / launchd
- In Android Termux: `termux-wake-lock` gegen Gerätesleep
- PID-Datei: `~/.mobix/mobix.pid`, von stop / status / restart verwendet

## Internationalisierung

Die App unterstützt 8 Sprachen: Chinesisch, Englisch, Japanisch, Koreanisch, Französisch, Deutsch, Spanisch, Russisch.

Automatische Umschaltung nach Systemsprache, keine zusätzliche Konfiguration erforderlich.

Bei Erkennungsfehler oder wenn eine nicht unterstützte Sprache erkannt wird, wird auf Englisch zurückgegriffen.

## TODO List

- [ ] SMS-Sendeerfahrung verbessern
- [ ] Weitere Telefonstatus-Überwachungsfunktionen hinzufügen
- [ ] UI-Design verbessern
- [ ] Weitere Internationalisierungs-Unterstützung hinzufügen
- [ ] Fernanruffunktion
- [ ] Nachrichten-Push-Funktion (Akku-Warnung, SMS-Benachrichtigung, Anruf-Benachrichtigung)
  - Auswirkungen verschiedener Überwachungsansätze auf Akkulaufzeit bewerten
  - Implementierung mit niedrigem Stromverbrauch priorisieren, unnötige Abfragen reduzieren
  - Benutzerdefinierte Warnbedingungen, Benachrichtigungshäufigkeit und Duplikatfilterung unterstützen


## Entwicklung und Beitrag

Beiträge in jeder Form sind willkommen, einschließlich aber nicht beschränkt auf:

- Issues einreichen, um Probleme zu melden oder Vorschläge zu machen
- Pull Requests einreichen, um Code zu teilen
- Nutzungserfahrungen teilen oder Dokumentation schreiben


## Lizenz

MIT
