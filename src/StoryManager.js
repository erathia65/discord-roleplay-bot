/**
 * @file StoryManager.js
 * @brief Story hooks and narrative generation
 */

const FantasyScenario = {
    id: 'fantasy_1',
    story: 'Dans une forêt sombre, tu entends un rugissement derrière toi. Quelque chose de grand et affamé s\'approche.',
    choices: [
        { label: '🌲 Entrer dans la forêt', description: 'Courir plus loin dans les arbres', id: 'enter_forest' },
        { label: '⚔️ Affronter la bête', description: 'Se préparer pour un combat', id: 'fight_beast' },
        { label: '🔥 Brûler un passage', description: 'Créer une zone de sécurité', id: 'burn_forest' },
        { label: '🚪 Fuir par l\'est', description: 'Chercher une sortie', id: 'run_east' }
    ]
};

const ScifiScenario = {
    id: 'scifi_1',
    story: 'Tu es dans un vaisseau spatial endommagé. L\'oxygène arrive à court et des drones s\'approchent.',
    choices: [
        { label: '🚀 Propulser hors d\'ici', description: 'Tenter d\'éjecter avec le vaisseau', id: 'eject_ship' },
        { label: '🔧 Désamorcer les drones', description: 'Rentre dans le vaisseau pour les neutraliser', id: 'disable_drones' },
        { label: '🧹 Réparer un module escape', description: 'Essayer de gagner du temps', id: 'repair_escape' },
        { label: '📡 Appeler une équipe de secours', description: 'Envoi un signal de détresse', id: 'call_rescue' }
    ]
};

const HorrorScenario = {
    id: 'horror_1',
    story: 'Tu te réveilles dans un manoir abandonné, les fenêtres brisées par la tempête. Quelque chose te suit dans l\'obscurité.',
    choices: [
        { label: '🔦 Éteindre la lumière', description: 'Ne pas attirer l\'attention', id: 'blinds_off' },
        { label: '🏃 Courir vers l\'escalier', description: 'Essayer de trouver un étage supérieur', id: 'run_esc' },
        { label: '🔒 Verrouiller la porte', description: 'Trouver un refuge temporaire', id: 'lock_door' },
        { label: '🧱 Créer un barrage', description: 'S\'entourer de meubles', id: 'build_barrier' }
    ]
};

class StoryManager {
    constructor() {
        this.stories = [FantasyScenario, ScifiScenario, HorrorScenario];
    }

    /**
     * @brief Get random story hook
     * @returns {Object}
     */
    getRandomStory() {
        return this.stories[Math.floor(Math.random() * this.stories.length)];
    }

    /**
     * @brief Get story by ID
     * @param {string} id - Story identifier
     * @returns {Object|null}
     */
    getStory(id) {
        return this.stories.find(s => s.id === id) || null;
    }

    /**
     * @brief Get all story IDs
     * @returns {Array<string>}
     */
    getStoryIds() {
        return this.stories.map(s => s.id);
    }
}

module.exports = StoryManager;
