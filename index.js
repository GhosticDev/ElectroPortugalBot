const Discord = require('discord.js');
const config = require("./config.json");
const utils = require("./utils.js");

const client = new Discord.Client();
client.prefix = config.prefix;

client.on("ready", () => {
	console.log("Bot on with " + client.users.size + " users and " + client.guilds.size + " servers!");
	client.user.setActivity(`${client.users.size} users!`, {type: 'Watching'});
});

client.on("message", async message => {
  let msg = message.content.toLowerCase();
	if (message.author.bot) return undefined;
  let user = message.author;

	if (message.content.indexOf(config.prefix) !== 0) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

  try {
    let commands = require(`./commands/${command}.js`);
    commands.run(client, message, args);
  } catch (e) {
    utils.error(client, e, message.author.username);
  } finally {
  }

});

client.on('guildMemberAdd', async member => {
  if (member.guild.id === '461973057247117343') {
    client.channels.get('471654780922757121').edit({
      name: `Members: ${member.guild.members.size}`
    }).then(console.log).catch(console.error);
    let members = 0;
    for (var member of member.guild.members.array()) {
      if (member.user.bot === false) {
        members++;
      }
    }
    if (member.user.bot) {
      client.channels.get('471720683085365248').edit({
        name: `Bots: ${member.guild.members.size-members}`
      }).then(console.log).catch(console.error);
    } else {
      client.channels.get('471722339969662999').edit({
        name: `Members: ${members}`
      }).then(console.log).catch(console.error);
    }
  }
});

client.on('guildMemberRemove', async member => {
  if (member.guild.id === '461973057247117343') {
    client.channels.get('471654780922757121').edit({
      name: `Members: ${member.guild.members.size}`
    }).then(console.log).catch(console.error);
    let members = 0;
    for (var member of member.guild.members.array()) {
      if (member.user.bot === false) {
        members++;
      }
    }
    if (member.user.bot) {
      client.channels.get('471720683085365248').edit({
        name: `Bots: ${member.guild.members.size-members}`
      }).then(console.log).catch(console.error);
    } else {
      client.channels.get('471722339969662999').edit({
        name: `Members: ${members}`
      }).then(console.log).catch(console.error);
    }
  }
});

client.login(process.env.TOKEN);
