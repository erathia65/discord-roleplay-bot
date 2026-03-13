/**
 * @file GameEngine.js
 * @brief Core game logic and state management
 */

const Game = class {
    /**
     * @brief Create a new game instance
     * @param {string} userId - Discord user ID
     * @param {Object} story - Story hook data
     */
    constructor(userId, story = null) {
        this.userId = userId;
        this.story = story;
        this.choices = [];
        this.createdAt = new Date();
        this.lastAction = new Date();
        this.isCompleted = false;
    }

    /**
     * @brief Make a choice
     * @param {string} choice - Choice identifier
     */
    makeChoice(choice) {
        this.choices.push(choice);
        this.lastAction = new Date();
    }

    /**
     * @brief Get game duration in seconds
     * @returns {number}
     */
    getDuration() {
        return (Date.now() - this.createdAt) / 1000;
    }
};

module.exports = Game;
