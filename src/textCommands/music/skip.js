const { EmbedBuilder } = require("discord.js");
const { QueueRepeatMode, useQueue } = require('discord-player');

module.exports = {
     name: 'skip',
     description: 'bỏ qua bài em đang hát',
     voiceChannel: true,

     callback: async (client, message, args) => {
          const noMusic = new EmbedBuilder()
               .setAuthor({ name: 'Không có gì đang phát ấy ? thử lại ikkk.... ❌' })
          const queue = useQueue(message.guild);

          if (!queue || !queue.isPlaying()) return await message.reply({ embeds: [noMusic] });

          queue.setRepeatMode(QueueRepeatMode.OFF);
          queue.node.skip();

          const skipEmbed = new EmbedBuilder()
               .setAuthor({ name: `⏭ Đã bỏ qua bài nhạc đang phát ${queue.currentTrack.title} ` });

          await message.reply({ embeds: [skipEmbed] });
     }

}    