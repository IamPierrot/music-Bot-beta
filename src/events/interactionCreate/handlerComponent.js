const { EmbedBuilder, InteractionType } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = async (client, interaction) => {
     try {
          if (interaction.type !== InteractionType.MessageComponent) return;

          await interaction.deferReply();
          
          const customId = JSON.parse(interaction.customId);
          const buttonName = customId.ffb;
          const queue = useQueue(interaction.guild);
          const track = queue.currentTrack;
          const playedCommand = new Set();
          playedCommand.add(track.requestedBy.id);

          if (buttonName && playedCommand.has(interaction.user.id)) {
               delete require.cache[require.resolve(`../../buttons/${buttonName}.js`)];
               const button = require(`../../buttons/${buttonName}.js`);
               if (button) await button({ client, interaction, customId, queue });
          } else {
               await interaction.editReply({
                    embeds: [
                         new EmbedBuilder()
                              .setAuthor({ name: `❌ Mấy cái nút không phải dành cho bạn` })
                              .setDescription(`Bài hát này là yêu cầu của : ${track.requestedBy.toString()}`)
                    ],
                    ephemeral: true
               }).then(() => setTimeout(() => interaction.deleteReply(), 10000))
          }

     } catch (error) {
          console.log(`There was an Error when running Button: ${error}`)
     }
}