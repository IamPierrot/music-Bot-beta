const { useQueue , QueueRepeatMode} = require('discord-player');
const { EmbedBuilder } = require('discord.js');
module.exports = {
     name: 'forceskip',
     description: 'hehe',
     DJPermissions: false,
     voiceChannel: true,
     adminOnly: true,

     /**
      * 
      * @param {import('discord.js').Client} client 
      * @param {import('discord.js').Message} message 
      * @param {*} args 
      */
     callback: async (client, message, args) => {
          try {
               const queue = useQueue(message.guild);
               const noMusic = new EmbedBuilder()
                    .setAuthor({ name: 'Không có gì đang phát ấy ? thử lại ikkk.... ❌' })
               if (!queue || !queue.isPlaying()) return await message.reply({ embeds: [noMusic] });
               
               
               queue.setRepeatMode(QueueRepeatMode.OFF);
               queue.node.skip();
     
               const skipEmbed = new EmbedBuilder()
                    .setAuthor({ name: `⏭ Đã bỏ qua bài nhạc đang phát ${queue.currentTrack.title} `});
     
               await message.reply({ embeds: [skipEmbed] });
               
          } catch (error) {
               console.log("There was an error in forceskip: ", error);
          }
     }
}