/**
 * @file ChoiceHandler.js
 * @brief Button interaction processing and story branching
 */

const GameEngine = require('./GameEngine');
const StoryManager = require('./StoryManager');

class ChoiceHandler {
    constructor() {
        this.gameEngine = new GameEngine('system');
        this.storyManager = new StoryManager();
    }

    /**
     * @brief Handle button click and get next story segment
     * @param {Object} choice - User choice data
     * @param {string} choice.id - Choice identifier
     * @param {string} choice.storyId - Current story ID
     * @returns {Object} Next story segment with choices
     */
    handleChoice(choice) {
        const { id, storyId } = choice;

        // Store user choice
        this.gameEngine.makeChoice(id);

        // Look for followup story based on choice
        const story = this.storyManager.getStory(storyId);
        
        // Generate next story segment
        let nextStory = this.generateStorySegment(id, story);

        return nextStory;
    }

    /**
     * @brief Generate next story segment based on choice ID
     * @param {string} choiceId - User's choice
     * @param {Object} story - Current story
     * @returns {Object} Next story segment
     */
    generateStorySegment(choiceId, story = null) {
        // Get a random story if story not provided
        const currentStory = story || this.storyManager.getRandomStory();

        // Generate choices based on choice
        const choices = this.generateChoices(choiceId);

        return {
            id: this.generateNextStoryId(),
            story: this.createNextStoryText(choiceId, currentStory),
            choices: choices
        };
    }

    /**
     * @brief Generate response text
     * @param {string} choiceId - User choice
     * @param {Object} story - Current story
     * @returns {string}
     */
    createNextStoryText(choiceId, story) {
        const responses = {
            'enter_forest': " Tu te fauilles dans la forêt dense. Les branches frappent ta figure, mais tu entends le rugissement se lointain derrière toi. Ton cœur bat à tout rompre. Tu entends un bruit aquatique à ta gauche... un ruisseau qui mène vers un vieux pont de pierre.',
            'fight_beast': " Tu te tient prêt pour un combat. Un immense loup à trois têtes bondit sur toi! Chacune de ses queues poursuit tes coups d'épée. En plein chaos, tu voies une crevasse dans la roche et décides de l'utiliser...",
            'burn_forest': " Un calepin de feu explose et crée une zone de fumée dense. Tu profites de l'obscurité pour courir. Au loin, tu entends des cris de combat se rapprocher de la fumée. Tu trouves une vieille usine abandonnée avec des silos...",
            'run_east': " Tu courras vers l\'est, dans la direction opposée à la forêt. Ton souffle court alors que la forêt s\'ouvre sur une plaine sablonneuse. Un champignon nuageux se forme à l'horizon. Le ciel s'assombrit et l'orage approche.",
            'eject_ship': " C\'est un saut mortel, mais tu t\'éjectes! Ton casque se fige et ton vaisseau explose derrière toi. Tu atterriss doucement sur une planète étrangère, couvert de poussière rouge. Quelque chose se lève devant toi...",
            'disable_drones': " Ça ne marche pas. Les drones repèrent ton mouvement. Tu dois trouver un artifice... une bombe thermique sur le pont. Le temps presse!",
            'repair_escape': " Ton ingénieurisme marche pour une fois. Tu répare un module escape. Mais tu as maintenant besoin de combattre les drones pour gagner du temps.",
            'call_rescue': " Le signal est envoyé! Tu reçois une réponse... 'Rejoindre la zone XZ-424'. Des frappes orbitales approchent. Tu dois te déplacer maintenant!",
            'blinds_off': " L'obscurité est ta meilleure alliée. Tu restes immobile, entendant des coups à la porte. Mais... c'est pas une porte. C'est un mur de pierre. Tu es coincé!",
            'run_esc': " Tu cours vers l'escalier et montes. Chaque pas résonne dans ce vieux manoir. En haut, tu entends des bruits de pas mais ils courent vers le sous-sol, pas vers toi.",
            'lock_door': " La porte se verrouille... mais le crissement de la serrure fait plus de bruit qu'on ne le pense. Une chose griffe le bois juste en face de toi... elle sait que tu es là.",
            'build_barrier': " Tu empiles des meubles, des chaises, tout ce qui est disponible. L'obscurité se lève, mais le bruit de tes efforts te dérange. Tu entends... un chant. Quelque chose chante dans l'ombre."
        };

        return responses[choiceId] || " Ton choix t'engage sur un nouveau chemin. Le monde s'élargit autour de toi, et tu te sens... quelque chose te regarde.";
    }

    /**
     * @brief Generate choice buttons
     * @param {string} choiceId - Previous choice ID
     * @returns {Array<Object>} Choice objects with label and ID
     */
    generateChoices(choiceId) {
        const allChoices = [
            { label: '✨ Continuer l\'aventure', description: 'Voir ce qui t\'attend', id: `continue_${choiceId}` },
            { label: '🔄 Nouvelle direction', description: 'Changer complet de trajectoire', id: `alternative_${choiceId}` },
            { label: '🤔 Penser calmement', description: 'Analyser la situation', id: `think_${choiceId}` },
            { label: '⚔️ Prendre action', description: 'Passer à l\'action immédiate', id: `action_${choiceId}` }
        ];

        return allChoices;
    }

    generateNextStoryId() {
        const timestamp = Date.now();
        return `story_${timestamp}`;
    }
}

module.exports = ChoiceHandler;
