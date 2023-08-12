const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');

/**
 * 
 * @param {import('discord-player').GuildQueue} queue
 * @param {import('discord-player').Track} track 
 * @returns 
 */

module.exports = (queue, track) => {
     try {
          if (!configure.app.loopMessage && queue.repeatMode !== 0) return;

          const controlEmbed = new EmbedBuilder()
               .setAuthor({ name: `MENU ĐIỀU KHIỂN`, iconURL: track.requestedBy.avatarURL() })
               .setColor('#4d1aff')
               .setDescription(`
                         :notes:  **${track.toHyperlink()}** \n \
                         \n \
                         :musical_keyboard: **Tác giả**: \`${track.author}\` \n \
                         :hourglass: **Thời lượng**: \`${track.duration}\` \n \
                         \n \
                         :small_blue_diamond: Được thêm vào bởi ${track.requestedBy.toString()}
                         `)
               .setTimestamp()
               .setFooter({ text: 'Âm nhạc đi trước - Tình yêu theo sau ❤' })

          const back = new ButtonBuilder()
               .setLabel('Back')
               .setCustomId(JSON.stringify({ ffb: 'back' }))
               .setStyle('Primary')

          const skip = new ButtonBuilder()
               .setLabel('Skip')
               .setCustomId(JSON.stringify({ ffb: 'skip' }))
               .setStyle('Primary')

          const stop = new ButtonBuilder()
               .setLabel('Stop')
               .setCustomId(JSON.stringify({ ffb: 'stop' }))
               .setStyle('Danger')

          const loop = new ButtonBuilder()
               .setLabel('Loop')
               .setCustomId(JSON.stringify({ ffb: 'loop' }))
               .setStyle('Secondary')

          const queueTracks = new ButtonBuilder()
               .setLabel('Queue')
               .setCustomId(JSON.stringify({ ffb: 'queueTracks' }))
               .setStyle('Secondary')

          const row = new ActionRowBuilder().addComponents(back, loop, stop, queueTracks, skip);

          queue.metadata.send({ embeds: [controlEmbed], components: [row] })
               .then((message) => setTimeout(() => message.delete(), track.durationMS));


     } catch (error) {
          console.log(error);
     }

}