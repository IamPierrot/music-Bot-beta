const { EmbedBuilder } = require('discord.js');
module.exports = (queue) => {
     const emptyQueue = new EmbedBuilder()
          .setAuthor({ name: `Không còn gì trong hàng chờ phát! ❌` })
          .setColor('#2f3136')

     queue.metadata.send({ embeds: [emptyQueue] });
}