const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

const prefix = "!";

/*
client.on("message", function (message) {
   if (message.author.bot) return;
   if (!message.content.startsWith(prefix)) return;

   const commandBody = message.content.slice(prefix.length);
   const args = commandBody.split(' ');
   const command = args.shift().toLowerCase();

   if (command === "wheel") {
       const timeTaken = Date.now() - message.createdTimestamp;
       message.reply(`HOLA ${message.author}`);
   }
}); 
*/
var nameList = [];

//On ready 
client.on('ready', () => {
    console.log("This bot is online!");
})

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

client.on('message', msg => {
    if (!msg.content.startsWith(prefix)) return;
    const commandBody = msg.content.slice(prefix.length);

    const args = commandBody.split(' ');

    const command = args.shift().toLowerCase();
    if (command === "add") {

        var movie = commandBody.substr(commandBody.indexOf(" ") + 1)

        console.log(movie)

        nameList.push(movie);
        msg.reply(' Se añadió a la lista!\n Lista actual: ' + nameList);

    }

    if (command === "wheel") {
        if (nameList.length === 0) {
            msg.reply(" lista vacía");
        } else {
            shuffleArray(nameList);
            var chosenOne = nameList.pop();
            nameList = [];
            msg.reply(chosenOne + ' fue elegida!');
        }
    }

    if (command === "ayudita") {
        msg.reply("**Agregar una pelicula**: 'add'\n**Sortear pelicula:** 'wheel'");
    }

    if (command === "list") {
        msg.reply("Peliculas: " + nameList);
    }
})

client.login(config.BOT_TOKEN);