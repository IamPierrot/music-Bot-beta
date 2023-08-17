const { useQueue } = require("discord-player");
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
     name: 'menu',
     description: 'hiện lại Menu điều khiển nhạc',
     voiceChannel: true,

     callback: async (client, message, args) => {
          try {
               const queue = useQueue(message.guild);

               const noMusic = new EmbedBuilder()
                    .setAuthor({ name: 'Không có gì đang phát ấy ? thử lại ikkk.... ❌' })

               if (!queue || !queue.isPlaying()) return await message.reply({ embeds: [noMusic] });

               const track = queue.currentTrack;
               const controlEmbed = new EmbedBuilder()
                    .setAuthor({ name: `MENU ĐIỀU KHIỂN`, iconURL: track.requestedBy.avatarURL() })
                    .setColor('#4d1aff')
                    .setDescription(`
                         :notes:  **${track.toHyperlink()}** \n \
                         \n \
                         :musical_keyboard: **Tác giả :** \`${track.author}\` \n \
                         :hourglass: **Thời lượng :** \`${track.duration}\` \n \
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

               const history = new ButtonBuilder()
                    .setLabel('History')
                    .setCustomId(JSON.stringify({ ffb: 'history' }))
                    .setStyle('Primary');
               const resumePause = new ButtonBuilder()
                    .setLabel('Resume & Pause')
                    .setCustomId(JSON.stringify({ ffb: 'resume&pause' }))
                    .setStyle('Danger')
               const lyrics = new ButtonBuilder()
                    .setLabel('Lyrics')
                    .setCustomId(JSON.stringify({ ffb: 'lyrics' }))
                    .setStyle('Primary')
               const volumeUp = new ButtonBuilder()
                    .setLabel('Volume Up')
                    .setCustomId(JSON.stringify({ ffb: 'volumeup' }))
                    .setStyle('Secondary')
               const volumeDown = new ButtonBuilder()
                    .setLabel('Volume Down')
                    .setCustomId(JSON.stringify({ ffb: 'volumedown' }))
                    .setStyle('Secondary')

               const row2 = new ActionRowBuilder().addComponents(back, volumeDown, stop, volumeUp, skip);
               const row1 = new ActionRowBuilder().addComponents(history, loop, resumePause, queueTracks, lyrics);


               await message.reply({ embeds: [controlEmbed], components: [row1, row2] })
                    .then((msg) => setTimeout(() => msg.delete(), 30000))

          } catch (error) {
               console.log(error);
          }
     }
}