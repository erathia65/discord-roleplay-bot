# 🎮 Discord Roleplay Bot

An interactive Discord roleplay game bot with button-based choices.

## Features

- 🎲 **Interactive Storytelling**: Presents story hooks with two choice options per scene
- 🎮 **Button Choices**: Click on Discord buttons to make your choices
- 📜 **History Tracking**: Review your choices throughout the game
- 🎯 **Multiple Beginnings**: Random story hooks to choose from
- 🗣️ **Custom Input**: Write your own story continuation

## Setup

1. Install Node.js 18+
2. Install dependencies:
   ```bash
   npm install discord.js
   ```

3. Create a new Bot on [Discord Developer Portal](https://discord.com/developers/applications)
   - Create Bot Account
   - Copy the **Token**
   - Enable the **Message Content Intent** and **Server Members Intent** in Bot Settings

4. Set your environment variable:
   ```bash
   export DISCORD_TOKEN="your-bot-token-here"
   ```

5. Run the bot:
   ```bash
   node bot.js
   ```

## Usage

### Commands

- `!newgame` - Start a new game
- `!history` - View your game history
- `!menu` - Show main menu

### Starting the Game

1. Type `!newgame` in Discord
2. I propose a story hook
3. You make your choice using the interactive buttons
4. The story continues based on your choice

### Custom Story

You can also start your own story by writing:
```
Hello, I start by saying: "The dragon blocked my path..."
```

I'll respond with choices based on your input.

## Examples

**Example Bot Message:**
```
🎮 **Nouveau jeu démarré!**

You are in a dark forest when you hear a growl behind you. Something big and hungry is approaching.

**Choose your path:**
[🌲 Go into the forest] [⚔️ Fight the beast]
```

**Button Response:**
When you click the "🌲 Go into the forest" button, I'll continue the story based on that choice.

## Configuration

Edit `bot.js` to change:
- Bot token
- Command prefix (`!`)
- Story hooks and scenarios
- Button styles and labels

## License

MIT

---

Enjoy roleplaying on Discord! 🎉
