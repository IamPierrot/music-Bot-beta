const { QueryType, useMainPlayer } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
     name: 'playlist',
     description: "Thêm vào 1 playlist bài hát trên youtube",
     voiceChannel: true,

     options: [
          {
               name: 'playlist',
               description: 'playlist mà anh muốn em hát',
               type: ApplicationCommandOptionType.String,
               required: true,
          }
     ],
     /**
      * @param {import('discord.js').Client} client 
      * @param {import('discord.js').ChatInputCommandInteraction} interaction
      * @param {import('discord-player').GuildQueue} queue
      * @param {import('discord-player').Track} track
      */

     callback: async (client, interaction) => {
          const player = useMainPlayer();
          const playlist = interaction.options.getString('playlist');
          const res = await player.search(playlist, {
               requestedBy: interaction.member,
               searchEngine: QueryType.YOUTUBE_PLAYLIST
          });

          const NoResultsEmbed = new EmbedBuilder()
               .setAuthor({ name: `Không tìm thấy playlist mà bạn muốn phát.... thử lại? ❌` })
               .setColor('#2f3136')

          if (!res || !res.tracks.length) return await interaction.reply({ embeds: [NoResultsEmbed] });

          const queue = player.nodes.create(interaction.guild, { //guildQueue
               metadata: interaction.channel,
               spotifyBridge: configure.opt.spotifyBridge,
               volume: configure.opt.volume,
               leaveOnEmpty: configure.opt.leaveOnEmpty,
               leaveOnEmptyCooldown: configure.opt.leaveOnEmptyCooldown,
               leaveOnEnd: configure.opt.leaveOnEnd,
               leaveOnEndCooldown: configure.opt.leaveOnEndCooldown,
          });

          try {
               if (!queue.connection) await queue.connect(interaction.member.voice.channel);
          } catch {
               await player.deleteQueue(interaction.guildId);

               const NoVoiceEmbed = new EmbedBuilder()
                    .setAuthor({ name: `Mình không thể kết nối được với voice channel.... thử lại ? ❌` })
                    .setColor('0xFF0000')

               await interaction.reply({ embeds: [NoVoiceEmbed] });
          }
          const track = res.tracks[0]; //Track
          const playEmbed = new EmbedBuilder()
               .setAuthor({ name: `🎧 ĐÃ THÊM VÀO HÀNG PHÁT`, iconURL: interaction.user.avatarURL() })
               .setColor('#4d1aff')
               .setDescription(`
               :notes:  **[Đã thêm thành công playlist](${playlist})** \n \
               \n \
               :small_blue_diamond: Được thêm vào bởi : ${track.requestedBy.toString()} 
               :small_blue_diamond: Nguồn tìm kiếm : ${track.queryType}
               `)
               .setTimestamp()
               .setFooter({ text: 'Âm nhạc đi trước - Tình yêu theo sau ❤️' })
          
          
          await interaction.reply({ embeds: [playEmbed] });
          
          res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(track);
          
          if (!queue.isPlaying()) {
               await queue.node.play();
          }

     },
};