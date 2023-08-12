const getLocalCommands = require('../../utils/getLocalCommands.js');
const { InteractionType, EmbedBuilder } = require('discord.js')
const { useQueue } = require('discord-player');

module.exports = async (client, interaction) => {
     try {
          await interaction.deferReply();

          if (interaction.type === InteractionType.MessageComponent) {
               const customId = JSON.parse(interaction.customId);
               const buttonName = customId.ffb;
               const queue = useQueue(interaction.guild);

               if (buttonName) {
                    delete require.cache[require.resolve(`../../buttons/${buttonName}.js`)];
                    const button = require(`../../buttons/${buttonName}.js`);
                    if (button) await button({ client, interaction, customId, queue });
               }
          } else if (!interaction.isChatInputCommand()) return;
          
          
          const localCommands = getLocalCommands();

          const commandObject = await localCommands.find(
               (cmd) => cmd.name === interaction.commandName
          );

          if (!commandObject) return;

          if (commandObject.voiceChannel) {
               if (!interaction.member.voice.channel) return interaction.editReply({ embeds: [new EmbedBuilder().setColor('#ff0000').setDescription(`❌ | Bạn đang không ở trong phòng Voice`)], ephemeral: true, })
               if (interaction.guild.members.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.members.me.voice.channel.id) return interaction.editReply({ embeds: [new EmbedBuilder().setColor('#ff0000').setDescription(`❌ | Bạn đang không ở cùng phòng voice với tui! `)], ephemeral: true, })
          }

          if (commandObject.permissionsRequired?.length) {
               for (const permission of commandObject.permissionsRequired) {
                    if (!interaction.member.permissions.has(permission)) {
                         interaction.editReply({
                              content: 'Not enough permissions.',
                              ephemeral: true,
                         });
                         return;
                    }
                    else {
                         interaction.editReply({ content: 'okey u have permissions', ephemeral: true });
                         return;
                    }
               }
          }

          if (commandObject.botPermissions?.length) {
               for (const permission of commandObject.botPermissions) {
                    const bot = interaction.guild.members.me;

                    if (!bot.permissions.has(permission)) {
                         interaction.editReply({
                              content: "I don't have enough permissions.",
                              ephemeral: true,
                         });
                         return;
                    }
               }
          }

          await commandObject.callback(client, interaction);
     } catch (error) {
          console.log(`There was an error running command: ${error} `);
     }
};