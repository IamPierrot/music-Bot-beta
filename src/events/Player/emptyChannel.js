const { EmbedBuilder } = require('discord.js');
module.exports = (queue) => {

     const emptyChannel = new EmbedBuilder()
          .setAuthor({ name: `Anh em bo toi 1 minh, tam biet  ❌` })
          .setColor('#2f3136')
          .setFooter({ text: 'Toi da het gia tri...~' })
     
     queue.metadata.send({ embeds: [emptyChannel] }).then(() => queue.delete());
}