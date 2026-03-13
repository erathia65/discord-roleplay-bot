# Models Directory

Data models and story content.

## Files

- `StoryHook.js` - Story hook structure with scenario and choices
- `Game.js` - Game state model
- `Choice.js` - Choice structure

## StoryHooks

Add new story hooks in this directory or the `templates/` folder for easy template management.

## Usage

```javascript
const StoryHook = require('./models/StoryHook');
const hook = new StoryHook('Your story text', [
    { label: 'Choice A', description: 'Description' },
    { label: 'Choice B', description: 'Description' }
]);
```

