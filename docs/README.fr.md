# Mobix - Documentation Française

Consulter la surveillance de l'état du téléphone, la gestion des SMS et la gestion des appels via une interface web.

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installer Termux:API](#installer-termuxapi)
- [Installation](#installation)
- [Démarrage Rapide](#démarrage-rapide)
- [Commandes](#commandes)
- [Configuration](#configuration)
- [Service en Arrière-plan](#service-en-arrière-plan)
- [Internationalisation](#internationalisation)
- [TODO List](#todo-list)
- [Développement et Contribution](#développement-et-contribution)
- [Licence](#licence)

## Fonctionnalités

### État du Téléphone

- **État du réseau** : SSID, adresse IP, force du signal, vitesse de connexion
- **État de la carte SIM** : Nom de l'opérateur, état de la carte SIM
- **État de la batterie** : Pourcentage de charge, température, état de charge, type de source d'alimentation

### Gestion des SMS

- **Boîte de réception/Envoyés** : Commutation par champ type, pagination indépendante, compteurs par catégorie
- **Envoi de SMS** : Saisie manuelle du numéro ou sélection depuis les contacts
- **Réponse rapide** : Entrée « Répondre » dans les éléments de liste, saut en un clic vers le formulaire d'envoi avec numéro pré-rempli
- **Pagination** : Navigation dans l'historique des SMS

### Journal d'Appels

- **Étiquettes de classification** : Entrants, Sortants, Manqués
- **Numéros inconnus** : Afficher le numéro de téléphone directement (et non un texte d'espace réservé)
- **Tri** : Ordre antéchronologique

### Protection par Mot de Passe

- Définir le mot de passe d'accès via la commande `mobix pwd`
- Mot de passe chiffré avec AES-256-GCM dans le fichier de configuration
- Aucun mot de passe requis si non défini
- Redémarrage requis après définition/effacement du mot de passe

## Prérequis

Ce projet doit s'exécuter sur un appareil Android et dépend de Termux, Termux:API et Node.js.

### Applications à installer

Il est recommandé d'installer les applications suivantes via F-Droid :

- [Termux](https://f-droid.org/en/packages/com.termux/)
- [Termux:API](https://f-droid.org/en/packages/com.termux.api/)

Termux et Termux:API doivent être installés depuis le même canal pour éviter les problèmes de plugin causés par une incompatibilité de signature ou de version.

### Autorisations Android

Le projet appelle les fonctions système d'Android via Termux:API. Lors de la première utilisation des fonctions concernées, vous devez accorder les autorisations correspondantes à Termux:API dans les paramètres du système.

Généralement trouvable à :

```
Paramètres → Applications → Termux:API → Autorisations
```

Les noms de menu peuvent varier selon la version d'Android et le fabricant du téléphone.

Correspondance entre commandes et autorisations :

| Commande | Fonction | Autorisation requise |
| --- | ---| --- |
| termux-battery-status | Obtenir l'état de la batterie | Généralement aucune autorisation supplémentaire |
| termux-wifi-connectioninfo | Obtenir les infos de connexion Wi-Fi | Autorisation réseau ; certains systèmes nécessitent aussi la localisation |
| termux-telephony-deviceinfo | Obtenir les infos appareil et carte SIM | Autorisation téléphone ou infos appareil |
| termux-sms-list | Lire les SMS | Autorisation de lecture des SMS |
| termux-sms-send | Envoyer des SMS | Autorisation d'envoi de SMS |
| termux-contact-list | Lire les contacts | Autorisation des contacts |
| termux-call-log | Lire le journal d'appels | Autorisation du journal d'appels |

Si vous n'utilisez pas une fonctionnalité, aucune autorisation correspondante n'est nécessaire.

### Confirmation d'envoi de SMS Android

Certaines versions d'Android ou systèmes de téléphone peuvent exiger une confirmation manuelle lors du premier envoi de SMS, ou afficher des invites d'autorisation pour les SMS, SMS payants, etc.

Si l'envoi de SMS échoue, vérifiez ce qui suit :

Confirmer que l'autorisation SMS a été accordée à Termux:API ;
Exécuter manuellement une commande de test SMS :

```bash
termux-sms-send -n "10086" ""
```

- Si le système affiche une fenêtre de confirmation, autoriser manuellement ;
- Si le système demande d'autoriser les « SMS payants », confirmer selon les besoins ;
- Vérifier si le système restreint l'exécution en arrière-plan de Termux ou Termux:API ;

Certains appareils peuvent nécessiter qu'une application soit définie comme application SMS par défaut.

<b>L'envoi de SMS peut entraîner des frais de l'opérateur. Il est recommandé de tester d'abord avec votre propre numéro de téléphone.</b>

### Conseils

Pour éviter que le système Android ne restreigne l'exécution en arrière-plan ou ne récupère le processus Termux, causant une interruption de service, il est recommandé dans les paramètres du système :

- Ajouter Termux à la liste blanche d'exécution en arrière-plan ;
- Désactiver l'optimisation de batterie ou les restrictions d'économie d'énergie pour Termux ;
- Autoriser Termux à s'exécuter en arrière-plan.

Les noms des paramètres peuvent varier selon la marque. Généralement trouvable à :

```text
Paramètres → Applications → Termux → Batterie
```

Choisir « Autoriser l'exécution en arrière-plan », « Sans restriction » ou une option similaire.

## Installer Termux:API

Ouvrir Termux et exécuter les commandes suivantes :

```bash
pkg update
pkg upgrade -y
pkg install termux-api -y
```

## Installation

### Installer Node.js

- (Recommandé) Installer la version LTS de Node.js
   ```
   pkg install nodejs-lts -y
   ```
- Installer la version actuelle
  ```
  pkg install nodejs -y
  ```

Après l'installation, exécuter les commandes suivantes pour vérifier :

```bash
# Vérifier la version de Node.js
node -v

# Vérifier la version de npm
npm -v
```

### Option 1 : installation globale npm (recommandé)

```bash
npm install -g @hreign/mobix
```

La commande `mobix` sera disponible globalement.

### Option 2 : distribution zip

Si vous avez des connaissances et de l'expérience avec Node.js,
télécharger `mobix-app.zip` depuis [Release](https://github.com/hreign/mobix-android/releases), extraire et exécuter :

```bash
node app/dist/server.js
```

## Démarrage Rapide

```bash
# Démarrer le service (port par défaut 7788, arrière-plan)
mobix start

# Vérifier l'état du service
mobix status

# Accès navigateur
# http://<ip-appareil>:7788

# Arrêter le service
mobix stop
```

## Commandes

### mobix start

Démarrer le service Mobix en arrière-plan, survit à la fermeture du terminal.

```bash
mobix start                # Port par défaut 7788
mobix start --port 8080    # Port spécifique
```

### mobix stop

Arrêter le service en cours.

```bash
mobix stop
```

### mobix status

Afficher l'état du service, PID et port.

```bash
mobix status
```

### mobix restart

Redémarrer le service avec la dernière configuration.

```bash
mobix restart
```

### mobix pwd

Définir ou afficher le mot de passe d'accès. Chiffré avec AES-256-GCM.

```bash
mobix pwd                  # Afficher l'état du mot de passe
mobix pwd mypassword       # Définir le mot de passe
mobix pwd ""               # Effacer le mot de passe
```

Redémarrage requis après définition :

```bash
mobix pwd mypassword
mobix restart
```

### mobix port

Définir ou afficher le port d'écoute.

```bash
mobix port                 # Afficher le port actuel
mobix port 9000            # Changer le port
```

Redémarrage requis après modification :

```bash
mobix port 9000
mobix restart
```

### mobix help

Afficher l'aide.

```bash
mobix help                 # Aide générale
mobix help start           # Aide détaillée pour start
```

## Configuration

Fichier de config : `~/.mobix/config.json`, permission 0600.

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

| Option | Description | Défaut |
|--------|------|--------|
| port | Port d'écoute | 7788 |
| password | Mot de passe d'accès (chiffré) | Aucun (pas de mot de passe) |

Priorité du port : fichier de config > var env `PORT` > défaut 7788

Priorité du mot de passe : fichier de config > var env `MOBIX_PASSWORD` > aucun

## Service en Arrière-plan

- `mobix start` lance un daemon en arrière-plan, survit à la fermeture du terminal
- Ne dépend pas de systemd / init / launchd
- Dans Android Termux, `termux-wake-lock` pour empêcher la mise en veille de l'appareil
- Fichier PID : `~/.mobix/mobix.pid`, utilisé par stop / status / restart

## Internationalisation

L'application prend en charge 8 langues : Chinois, Anglais, Japonais, Coréen, Français, Allemand, Espagnol, Russe.

Commutation automatique selon la langue du système, aucune configuration supplémentaire nécessaire.

Si la détection échoue ou une langue non prise en charge est rencontrée, repli vers l'anglais.

## TODO List

- [ ] Améliorer l'expérience d'envoi de SMS
- [ ] Ajouter plus de fonctions de surveillance de l'état du téléphone
- [ ] Améliorer la conception de l'interface
- [ ] Ajouter plus de support d'internationalisation
- [ ] Fonction d'appel distant
- [ ] Fonction de push de messages (alerte batterie, notification SMS, notification d'appel)
  - Évaluer l'impact des différentes approches de surveillance sur l'autonomie de l'appareil
  - Prioriser une implémentation à faible consommation, réduire les interrogations inutiles
  - Prendre en charge les conditions d'alerte personnalisées, la fréquence des notifications et le filtrage des doublons


## Développement et Contribution

Les contributions sous toute forme sont les bienvenues, y compris mais sans s'y limiter :

- Soumettre des issues pour signaler des problèmes ou faire des suggestions
- Soumettre des pull requests pour partager du code
- Partager des expériences d'utilisation ou rédiger de la documentation


## Licence

MIT
