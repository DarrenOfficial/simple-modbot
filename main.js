const Discord = require("discord.js");
// const secret = require("./config/dev-secret.json");
const secret = require("./config/secret.json"); // this imports the config
const client = new Discord.Client({
  disableEveryone: true,
}); // this creates the discord client

client.commands = new Discord.Collection();

const lib = require("./structures/functions"); // this load the functions
lib.setup(client);

module.exports.client = client;

client.login(secret.token);
