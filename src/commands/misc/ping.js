const { EmbedBuilder } = require("discord.js");

module.exports = {
     name: 'ping',
     description: 'pong!',
     /**
      * 
      * @param {import('discord.js').Client} client 
      * @param {import('discord.js').ChatInputCommandInteraction} interaction 
      */
     callback: async (client, interaction) => {
          const ping = client.ws.ping;
          const pingEmbed = new EmbedBuilder()
               .setColor('Blurple')
               .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
               .setDescription(` \`\`\`elm\nAPI Latency (Websocket) :${Math.round(ping)}ms \nMessage Latency         :${Date.now() - interaction.createdTimestamp}ms\`\`\` `)
               .setFooter({text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL()});

          await interaction.editReply({ embeds: [pingEmbed] });
     }     
}