const path = require('path');
const { readdirSync } = require('fs');

/**
 * 
 * @param {import('discord-player').Player} player 
 * @returns 
 */

module.exports = (player) => {
     const PlayerEvents = readdirSync(path.join(__dirname, '..', 'events', 'Player')).filter(file => file.endsWith('.js'));

     for (const file of PlayerEvents) {
          const PlayerEvent = require(`../events/Player/${file}`);
          console.log(`-> [Loaded Player Event] ${file.split('.')[0]}`);
          player.events.on(file.split('.')[0], PlayerEvent.bind(null));
          delete require.cache[require.resolve(`../events/Player/${file}`)];
     }
}