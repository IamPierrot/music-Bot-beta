const { useMainPlayer, useQueue, QueueRepeatMode } = require('discord-player');
const { EmbedBuilder } = require('discord.js');


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
          const player = useMainPlayer();
          const queue = useQueue(interaction.guild);
          const track = queue.currentTrack;
          const playedCommand = new Set();
          playedCommand.add(track.requestedBy.id);

          const noMusic = new EmbedBuilder()
               .setAuthor({ name: 'Không có gì đang phát ấy ? thử lại ikkk.... ❌' })

          if (!queue || !queue.isPlaying()) return await interaction.editReply({ embeds: [noMusic], ephemeral: true }); 
          
          
          if (playedCommand.has(interaction.user.id)) {
               queue.setRepeatMode(QueueRepeatMode.OFF);
               const success = queue.node.skip();

               const skipEmbed = new EmbedBuilder()
                    .setAuthor({ name: `⏭ Đã bỏ qua bài nhạc đang phát ${queue.currentTrack.title} ` });

               await interaction.editReply({ embeds: [skipEmbed] });
          } else {
               await interaction.editReply({
                    embeds: [new EmbedBuilder()
                         .setColor('Red')
                         .setDescription(
                              `❌ Người yêu cầu bài này là :${track.requestedBy.toString()}\n❌ Không thể bỏ qua bài hát ⏭`)]
               })
          }
     }
};