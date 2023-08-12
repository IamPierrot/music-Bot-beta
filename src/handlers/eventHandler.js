const path = require('path');
const getAllFiles = require('../utils/getAllFiles.js');
const { useMainPlayer } = require('discord-player');

module.exports = (client) => {
     const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

     for (const eventFolder of eventFolders) {
          const eventFiles = getAllFiles(eventFolder);
          eventFiles.sort((a, b) => a > b);

          const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

          client.on(eventName, async (arg) => {
               for (const eventFile of eventFiles) {
                    const eventFunction = require(eventFile);
                    await eventFunction(client, arg);
                    delete require.cache[require.resolve(eventFile)];
               }
          });
          if (eventName === "Player") {
               const player = useMainPlayer();
               
               for (const file of eventFiles) {
                    const playerEvent = require(file);
                    const playerEventName = file.split('\\').pop().split('.').shift();
                    player.events.on(playerEventName, playerEvent.bind(null)); 
                    delete require.cache[require.resolve(file)];
               }
          }
     }
};