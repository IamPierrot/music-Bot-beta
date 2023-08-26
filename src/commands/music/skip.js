const { useMainPlayer, useQueue, QueueRepeatMode } = require('discord-player');
const { EmbedBuilder } = require('discord.js');
const checkId = require('../../utils/functions/checkIdRequest.js');


module.exports = {
     name: 'skip',
     description: 'bỏ qua bài em đang hát',
     deleted: false,
     voiceChannel: true,

     /**
      * 
      * @param {*} client 
      * @param {import('discord.js').ChatInputCommandInteraction} interaction 
      * @returns 
      */

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
                    return await interaction.reply({ embeds: [check], ephemeral: true })
               } else {
                    queue.setRepeatMode(QueueRepeatMode.OFF);
                    queue.node.skip();

                    const skipEmbed = new EmbedBuilder()
                         .setAuthor({ name: `⏭ Đã bỏ qua bài nhạc đang phát ${queue.currentTrack.title} ` });

                    await interaction.reply({ embeds: [skipEmbed] });
               }

          } catch (error) {
               console.log('There was an error in skip command : ', error);
          }
     }
};