const { InteractionType } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = async (client, interaction) => {
     try {
          if (interaction.type !== InteractionType.MessageComponent) return;

          const customId = JSON.parse(interaction.customId);
          const buttonName = customId.ffb;
          const queue = useQueue(interaction.guild);

          if (buttonName) {
               delete require.cache[require.resolve(`../../buttons/${buttonName}.js`)];
               const button = require(`../../buttons/${buttonName}.js`);
               if (button) await button({ client, interaction, customId, queue });
          }

     } catch (error) {
          console.log(`There was an Error when running Button: ${error}`)
     }
}