const { InteractionType, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = async (client, interaction) => {
     try {
          if (interaction.type !== InteractionType.MessageComponent) return;

          const customId = JSON.parse(interaction.customId);
          const buttonName = customId.ffb;
          const queue = useQueue(interaction.guild);

          const noMusic = new EmbedBuilder()
               .setAuthor({ name: 'Không có gì đang phát ấy ? thử lại ikkk.... ❌' })

          if (!queue || !queue.isPlaying()) return await interaction.reply({ embeds: [noMusic] });

          if (buttonName && interaction.user.id === queue.currentTrack.requestedBy.id) {
               delete require.cache[require.resolve(`../../buttons/${buttonName}.js`)];
               const button = require(`../../buttons/${buttonName}.js`);
               if (button) await button({ client, interaction, customId, queue });
          } else {
               await interaction.reply({
                    embeds: [
                         new EmbedBuilder()
                              .setAuthor({ name: `❌ Mấy cái nút không phải dành cho bạn` })
                              .setDescription(`Bài hát này là yêu cầu của : ${queue.currentTrack.requestedBy.toString()}`)
                    ],
                    ephemeral: true
               }).then(() => setTimeout(() => interaction.deleteReply(), 10000))
          }

     } catch (error) {
          console.log(`There was an Error when running Button: ${error}`);
     }
}