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


          const noMusic = new EmbedBuilder()
               .setAuthor({ name: 'Không có gì đang phát ấy ? thử lại ikkk.... ❌' })

          if (!queue || !queue.isPlaying()) return await interaction.reply({ embeds: [noMusic], ephemeral: true });


          queue.setRepeatMode(QueueRepeatMode.OFF);
          const success = queue.node.skip();

          const skipEmbed = new EmbedBuilder()
               .setAuthor({ name: `⏭ Đã bỏ qua bài nhạc đang phát ${queue.currentTrack.title} ` });

          await interaction.reply({ embeds: [skipEmbed] });

     }
};