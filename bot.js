/**
 * @file bot.js - Discord Roleplay Game Bot
 */

const { Client, GatewayIntentBits } = require('discord.js');
const GameEngine = require('./src/GameEngine');
const StoryManager = require('./src/StoryManager');
const ChoiceHandler = require('./src/ChoiceHandler');

const config = {
    token: process.env.DISCORD_TOKEN || 'VOTRE_TOKEN_ICI',
    prefix: '!',
    ownerId: process.env.BOT_OWNER || ''
};

class DiscordRoleplayBot {
    constructor(config) {
        this.config = config;
        this.client = new Client({
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
        });

        this.gameEngine = new GameEngine();
        this.storyManager = new StoryManager();
        this.choiceHandler = new ChoiceHandler();

        this.games = new Map();  // Map<userId, game>
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.client.on('ready', () => {
            console.log(`✅ Bot connecté: ${this.client.user.tag}`);
            console.log('🎮 Mode de rôleplay prêt');
        });

        this.client.on('messageCreate', async (message) => {
            if (message.author.bot || message.mentions.has(this.client.user)) {
                return;
            }
            await this.handleMessage(message);
        });

        this.client.on('interactionCreate', async (interaction) => {
            if (interaction.isButton()) {
                await this.handleButton(interaction);
            }
        });
    }

    async startBot() {
        try {
            await this.client.login(this.config.token);
        } catch (error) {
            console.error('❌ Échec de connexion:', error.message);
            throw error;
        }
    }

    async handleMessage(message) {
        const content = message.content.toLowerCase().trim();

        if (content.startsWith(config.prefix + 'newgame') || content === 'start') {
            await this.startNewGame(message);
        }
    }

    async startNewGame(message) {
        const userId = message.author.id;
        const story = this.storyManager.getRandomStory();

        const game = {
            userId,
            story,
            choices: [],
            createdAt: new Date(),
            lastAction: new Date()
        };

        this.games.set(userId, game);

        const embed = {
            title: '🎮 Nouveau jeu démaré!',
            description: story.story,
            color: 0x00ff00,
            fields: [
                { name: 'Choice A', value: '🌲 Entrer dans la forêt', inline: true },
                { name: 'Choice B', value: '⚔️ Affronter la bête', inline: true },
                { name: 'Choice C', value: '🔥 Brûler un passage', inline: true },
                { name: 'Choice D', value: '🚪 Fuir par l\'est', inline: true }
            ],
            footer: { text: 'Cliques le bouton pour faire ton choix' }
        };

        await message.reply({ embeds: [embed] });

        game.lastAction = new Date();
    }

    async handleButton(interaction) {
        const userId = interaction.user.id;
        const game = this.games.get(userId);

        if (!game) {
            await interaction.reply({ content: '❌ Aucun jeu en cours', ephemeral: true });
            return;
        }

        await interaction.deferUpdate();

        // Parse choice ID
        const choiceIdParts = interaction.customId.split('_');
        if (choiceIdParts[0] !== 'choice') {
            return;
        }

        const choiceId = choiceIdParts[1]?.replace('-', '')?.replace(/[0-9]/g, '') || choiceIdParts[1];

        // Process choice
        const nextStory = this.choiceHandler.handleChoice({
            id: choiceId,
            storyId: game.story.id
        });

        // Update game
        game.choices.push(choiceId);
        game.lastAction = new Date();

        // Build next message
        const embed = {
            title: '📜 Voici ton histoire:',
            description: `**Ta décision:** ${choiceId}\n\n${nextStory.story}`,
            color: 0x0000ff,
            fields: [
                { name: '✨ Continuer', value: '🌲 Suite de l\'histoire', inline: true },
                { name: '🔄 Nouvelle direction', value: '⚔️ Alternative', inline: true },
                { name: '🤔 Rfléchir', value: '💭 Analyser', inline: true },
                { name: '⚔️ Agir', value: '🔥 Action', inline: true }
            ]
        };

        await interaction.followUp({ embeds: [embed], ephemeral: true });

        // Save game state with next story
        game.story = this.storyManager.getStory(nextStory.id) || game.story;
    }
}

module.exports = DiscordRoleplayBot;

// Start bot if run directly
if (require.main === module) {
    const bot = new DiscordRoleplayBot(config);
    bot.startBot();
}
