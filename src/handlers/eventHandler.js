const path = require('path');
const getAllFiles = require('../utils/getAllFiles.js');
let event = [];

module.exports = (client) => {
     const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

     for (const eventFolder of eventFolders) {
          const eventFiles = getAllFiles(eventFolder);
          eventFiles.sort((a, b) => a > b);

          const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();
          if (eventName === "Player") continue;
          event.push(eventName);
          client.on(eventName, async (arg, arg2) => {
               for (const eventFile of eventFiles) {
                    delete require.cache[require.resolve(eventFile)];
                    const eventFunction = require(eventFile);
                    await eventFunction(client, arg, arg2);
               }
          });
     }
     console.table(event);
};