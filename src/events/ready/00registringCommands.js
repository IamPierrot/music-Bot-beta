const areCommandsDifferent = require('../../utils/areCommandsDifferent.js');
const getApplicationCommands = require('../../utils/getApplicationCommands.js');
const getLocalCommands = require('../../utils/getLocalCommands.js');
const { REST, Routes } = require('discord.js');


module.exports = async (client) => {
     try {
          const localCommands = getLocalCommands();
          const guildArray = configure.app.guild;
          for (const guildId of guildArray) {
               const applicationCommands = await getApplicationCommands(
                    client,
                    guildId
               );
               console.log(`Begin registring Command at ${guildId}`)

               for (const localCommand of localCommands) {
                    const { name, description, options } = localCommand;

                    const existingCommand = await applicationCommands.cache.find(
                         (cmd) => cmd.name === name
                    );

                    if (existingCommand) {
                         if (localCommand.deleted) {
                              await applicationCommands.delete(existingCommand.id);
                              console.log(`🗑 Deleted command "${name}".`);
                              continue;
                         }

                         if (areCommandsDifferent(existingCommand, localCommand)) {
                              await applicationCommands.edit(existingCommand.id, {
                                   description,
                                   options,
                              });

                              console.log(`🔁 Edited command "${name}".`);
                         }
                    } else {
                         if (localCommand.deleted) {
                              console.log(
                                   `⏩ Skipping registering command "${name}" as it's set to delete.`
                              );

                              continue;
                         }

                         await applicationCommands.create({
                              name,
                              description,
                              options,
                         });
                         console.log(`👍 Registered command "${name}."`);

                    }

               }
          }
          const rest = new REST().setToken(configure.app.token);
          rest.put(Routes.applicationCommands(configure.app.client), { body: localCommands })
               .then(() => console.log('Registering global commands for this bot'))
               .catch(console.error);

     
     } catch (error) {
          console.log(`There was an error: ${error}`);
     }
};