const path = require('path');
const getAllFiles = require('../utils/getAllFiles.js');

module.exports = (client) => {
     const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

     for (const eventFolder of eventFolders) {
          const eventFiles = getAllFiles(eventFolder);
          eventFiles.sort((a, b) => a > b);

          const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();
          
          if (eventName === "Player") continue;

          client.on(eventName, async (arg) => {
               for (const eventFile of eventFiles) {
                    const eventFunction = require(eventFile);
                    await eventFunction(client, arg);
                    delete require.cache[require.resolve(eventFile)];
               }
          });
     }
};