/**
 * 
 * @param {import('discord-player').GuildQueue} queue 
 */

module.exports = async ({ interaction, queue }) => {
     if (!queue || !queue.node.isPlaying()) await interaction.editReply({content: "Không có bài nhạc nào đang phát...."});
     if (!queue.history.previousTrack) return interaction.editReply({ content: ` Không có bài nhạc nào đã phát trước đó? ❌` });

     await queue.history.back();

     interaction.editReply({content: `<@${interaction.user.id}> thành công hát lại bài trước đó ✅`})
     .then(() => setTimeout(() => interaction.deleteReply(), 50000)); 
}