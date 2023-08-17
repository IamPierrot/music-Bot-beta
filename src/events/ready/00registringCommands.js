const areCommandsDifferent = require('../../utils/areCommandsDifferent.js');
const getApplicationCommands = require('../../utils/getApplicationCommands.js');
const getLocalCommands = require('../../utils/getLocalCommands.js');

module.exports = async (client) => {
     try {
          const localCommands = getLocalCommands();
          const guildId = configure.app.guild;
          const applicationCommands = await getApplicationCommands(
               client,
               guildId
          );
          const listApllicationcommands = applicationCommands.cache.map(command => command.name);
          const listExistingCommands = localCommands.map(command => command.name);

          for (const nameCommand of listApllicationcommands) {
               const command = await applicationCommands.cache.find(
                    (cmd) => cmd.name === nameCommand
               );
               if (!listExistingCommands.includes(nameCommand)) {
                    await applicationCommands.delete(command.id);
                    console.log(`🗑 Deleted command "${nameCommand}" cause it does not exist".`);
               }
          }

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
          console.table(localCommands, ["name", "deleted", "showHelp", "voiceChannel"]);

     } catch (error) {
          console.log(`There was an error: ${error}`);
     }
};