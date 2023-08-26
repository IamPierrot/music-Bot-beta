const path = require('path');
const { readdirSync } = require('fs');

/**
 * 
 * @param {import('discord-player').Player} player 
 * @returns 
 */

let event = [];

module.exports = (player) => {
     const PlayerEvents = readdirSync(path.join(__dirname, '..', 'events', 'Player')).filter(file => file.endsWith('.js'));

     for (const file of PlayerEvents) {
          delete require.cache[require.resolve(`../events/Player/${file}`)];
          const PlayerEvent = require(`../events/Player/${file}`);
          event.push(file.split('.')[0]);
          player.events.on(file.split('.')[0], PlayerEvent.bind(null));
     }
     console.table(event);
}