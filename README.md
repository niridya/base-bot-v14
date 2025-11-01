# 🤖 Base Bot Discord.js v14

**Template simple et prêt à l'emploi pour créer un bot Discord avec Discord.js v14**

---

## ✨ Introduction

Bienvenue sur ma **base bot Discord.js v14**, un code de base prêt à l'emploi pour créer votre bot Discord. Il prend en charge les **commandes Slash** et les **commandes avec préfixe**, et est conçu pour être facile à utiliser et à étendre.

---

## 🛠 Prérequis

* **Node.js v22.12.0** ou supérieur (requis par Discord.js v14)
* **Visual Studio Code** (recommandé pour le développement)

---

## 🚀 Installation

### 1. Télécharger le dépôt

Vous pouvez récupérer le dépôt de deux façons :

* **Bouton vert "Code" > Download ZIP** sur GitHub et décompressez-le.
* Avec Git :

```sh
git clone https://github.com/niridya/base-bot-v14.git
```

### 2. Installer les dépendances

Rendez-vous dans le dossier du projet et installez les dépendances :

```sh
npm install
```

> Cela installera automatiquement tout ce dont le bot a besoin pour fonctionner.

---

## ⚙️ Configuration

### shadow.json

Stockez votre **token** de bot (ne jamais partager publiquement) :

```json
{
    "token": "VOTRE_BOT_TOKEN"
}
```

### config.json

Configurez le **préfixe** et les **propriétaires** :

```json
{
    "prefix": "VOTRE_PREFIX",
    "owners": ["USER_ID_1", "USER_ID_2"]
}
```

---

## 📝 Mise en place des commandes Slash

1. Ouvrez `deploy-commands.js` et configurez :

   * `clientId` : l'ID de votre bot.
   * `guildId` (optionnel) : l'ID de votre serveur pour des commandes spécifiques.
2. Déployez les commandes :

```sh
node deploy-commands.js
```

---

## ▶️ Lancer le bot

```sh
node index.js
```

---

✅ Le bot devrait maintenant démarrer correctement.

---

## 💬 Support

Rejoignez le serveur Discord pour obtenir de l'aide : [discord.gg/antiraid](https://discord.gg/antiraid)

---

## 🌟 Bonus : Paquets optionnels

Pour améliorer les performances, vous pouvez installer ces paquets, sans modification de code (tout fonctionne automatiquement) :

```sh
npm install zlib-sync bufferutil
```

* `zlib-sync` : compression et décompression des données WebSocket.
* `bufferutil` : optimisation des buffers pour le WebSocket.
