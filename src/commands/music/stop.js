const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const checkId = require('../../utils/functions/checkIdRequest.js');

module.exports = {
     name: 'stop',
     description: 'cho em cook khỏi voice',
     deleted: false,
     voiceChannel: true,

     callback: async (client, interaction) => {
          try {
               const queue = useQueue(interaction.guild);

               if (!queue || !queue.isPlaying()) {
                    const noMusic = new EmbedBuilder()
                         .setAuthor({ name: 'Không có gì đang phát ấy ? thử lại ikkk.... ❌' })
                    return await interaction.reply({ embeds: [noMusic], ephemeral: true });
               }
               
               const check = checkId(queue.currentTrack, interaction.user.id);

               if (check) {
                    return await interaction.reply({ embeds: [check] })
               } else {

                    queue.delete();

                    const stopEmbed = new EmbedBuilder()
                         .setColor('#b72563')
                         .setAuthor({ name: 'Nhà ngươi đã cho ta ngừng hát 🤬', iconURL: interaction.user.avatarURL() })

                    await interaction.reply({ embeds: [stopEmbed] });

               }

          } catch (error) {
               console.log('There was an error in stop command: ', error);
          }

     },
}