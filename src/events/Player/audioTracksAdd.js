const { EmbedBuilder } = require('discord.js');

module.exports = (queue, track) => {
     if (!configure.app.ExtraMessages) return

     const audioTracksAdd = new EmbedBuilder()
          .setAuthor({ name: `All the songs in playlist added into the queue ✅` })
          .setColor('#2f3136')

     queue.metadata.send({ embeds: [audioTracksAdd] })

}