const Discord = require('discord.js');
const config = require("./config.json");
const utils = require("./utils.js");

const client = new Discord.Client();
client.prefix = config.prefix;

client.on("ready", () => {
	console.log("--------------------------------------------\nBot on with " + client.users.size + " users and " + client.guilds.size + " servers!\n--------------------------------------------");
	client.user.setActivity(`${client.guilds.get('473892459001282567').memberCount} users!`, {type: 'Watching'});
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
  if (member.guild.id === '473892459001282567') {
    client.channels.get('473893737978920971').edit({
      name: `Members: ${member.guild.members.size}`
    }).then(console.log).catch(console.error);
  }
});

client.on('guildMemberRemove', async member => {
  if (member.guild.id === '473892459001282567') {
    client.channels.get('473893737978920971').edit({
      name: `Members: ${member.guild.members.size}`
    }).then(console.log).catch(console.error);
  }
});

client.login(process.env.TOKEN);
