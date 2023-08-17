module.exports = async (client, guildId = false) => {
     let applicationCommands;

     if (guildId) {
          const guild = await client.guilds.fetch(guildId);
          applicationCommands = guild.commands;
     } else if (configure.app.global) {
          applicationCommands = await client.application.commands;
     }

     await applicationCommands.fetch();
     return applicationCommands;
};