const Genius = require('genius-lyrics');
const { EmbedBuilder } = require('discord.js');

module.exports = async ({ interaction, queue }) => {
     const genius = new Genius.Client();

     const noMusic = new EmbedBuilder()
          .setAuthor({ name: 'Không có gì đang phát ấy ? thử lại ikkk.... ❌' })
     if (!queue || !queue.isPlaying()) await interaction.editReply({ embeds: [noMusic], ephemeral: true });

     try {
          const search = await genius.songs.search(queue.currentTrack.title);

          const song = search.find(song => song.artist.name.toLowerCase() === queue.currentTrack.author.toLowerCase());
          
          if (!song) return interaction.editReply({ content: `Không tìm thấy lyrics của ${queue.currentTrack.title}... `, ephemeral: true });
          const lyrics = await song.lyrics();
          const embeds = [];
          for (let i = 0; i < lyrics.length; i += 4096) {
               const toSend = lyrics.substring(i, Math.min(lyrics.length, i + 4096));
               embeds.push(new EmbedBuilder()
                    .setTitle(`Lyrics for ${queue.currentTrack.title}`)
                    .setDescription(toSend)
                    .setColor('#2f3136')
                    .setTimestamp()
                    .setFooter({ text: 'Am nhac di truoc - Tinh yeu theo sau ❤️', iconURL: interaction.member.avatarURL({ dynamic: true }) })
               );
          }
          await interaction.editReply({ embeds: embeds, ephemeral: true });
     } catch (error) {
          console.log(`There was an error in lyrics`, error);
     }

}