# 🎮 Configurer et lancer le bot Discord

## Etape 1: Créer le bot Discord

1. Va sur https://discord.com/developers/applications
2. Click "New Application"
3. Name: `discord-roleplay-bot`
4. Click "Bot" tab on left sidebar
5. Click "Add Bot"
6. Click "Copy" on TOKEN
7. Click "Enable Message Content Intent" if not already
8. Click "Enable Server Members Intent" if not already

## Etape 2: Permissions

In `Bot Permissions` section:
- ✅ **Message Content Intent** (crucial!)
- ✅ **Server Members Intent**
- ✅ **Read Messages**

## Etape 3: Configuration

Create `.env` file:
```bash
DISCORD_TOKEN="VOTRE_TOKEN_ICI"
BOT_OWNER="VOTRE_USER_ID_ICI"
```

Get your user ID: Settings → Account → Copy from Profile

## Etape 4: Lancer le bot

```bash
node bot.js
```

Or with dotenv:
```bash
npm install dotenv
node -r dotenv/config bot.js
```

## Etape 5: Utiliser dans Discord

Dans le serveur où le bot est invité:
- Tape `!newgame` pour démarrer
- Usage des boutons pour faire tes choix

## Problèmes?

Si tu as des erreurs:
1. Vérifie que Message Content Intent est activé
2. Vérifie que le bot est dans le serveur
3. Vérifie le token

