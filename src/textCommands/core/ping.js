const { EmbedBuilder } = require("discord.js");

module.exports = {
     name: 'ping',
     description: 'pong! vào cái đầu của anhzai',
     /**
      * 
      * @param {import('discord.js').Client} client 
      * @param {import('discord.js').Message} message 
      */
     callback: async (client, message) => {
          const ping = client.ws.ping;
          const pingEmbed = new EmbedBuilder()
               .setColor('Blurple')
               .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
               .setDescription(` \`\`\`elm\nAPI Latency (Websocket) :${Math.round(ping)}ms \nMessage Latency         :${Date.now() - message.createdTimestamp}ms\`\`\` `)
               .setFooter({text: `${message.guild.name}`, iconURL: message.guild.iconURL()});

          await message.reply({ embeds: [pingEmbed] });
     }     
}