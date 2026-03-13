/**
 * @brief Simplified Discord roleplay bot entry point
 * Shows how to use Discord bot API for game interactions
 */

const { Client, GatewayIntentBits } = require('discord.js');

// Mock implementation
async function startDiscordBot() {
    const client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
    });

    client.on('ready', () => {
        console.log('✅ Bot connecté');
    });

    await client.login(process.env.DISCORD_TOKEN);
}

