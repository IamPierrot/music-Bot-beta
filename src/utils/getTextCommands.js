const path = require('path');
const getAllFiles = require('./getAllFiles');

module.exports = (exceptions = []) => {
     let textCommands = [];

     const commandCategories = getAllFiles(
          path.join(__dirname, '..', 'textCommands'),
          true
     );

     for (const commandCategory of commandCategories) {
          const commandFiles = getAllFiles(commandCategory);

          for (const commandFile of commandFiles) {
               const commandObject = require(commandFile);

               if (exceptions.includes(commandObject.name)) {
                    continue;
               }

               textCommands.push(commandObject);
          }
     }

     return textCommands;
};