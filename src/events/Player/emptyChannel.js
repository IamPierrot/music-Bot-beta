const { EmbedBuilder } = require('discord.js');
module.exports = (queue) => {

     const emptyChannel = new EmbedBuilder()
          .setAuthor({ name: `Mọi Người bỏ tôi lại 1 mình 🥺` })
          .setColor('#2f3136')
          .setDescription(`Các anh thật ngu ngốc :sob:`)
     
     queue.metadata.send({ embeds: [emptyChannel] }).then(() => queue.delete());
}