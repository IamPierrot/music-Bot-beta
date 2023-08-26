const { EmbedBuilder } = require('discord.js');


module.exports =  function(track, userId) {
     if (track.requestedBy.id !== userId) {
          return new EmbedBuilder()
               .setAuthor({ name: `❌ Có lỗi khi yêu cầu dừng/bỏ qua bài hát` })
               .setDescription(`Bài hát này là yêu cầu của : ${track.requestedBy.toString()}`)
     } else {
          return false;
     }    
}