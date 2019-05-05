const Discord = require('discord.js');


const client = new Discord.Client();

const config = require("./config.json");


const { Client, RichEmbed } = require('discord.js');

const fs = require("fs");
var CoffreInfo = "./coffre.json";
var CoffreRead = fs.readFileSync(CoffreInfo);
var CoffreFile = JSON.parse(CoffreRead)
const CoffreChannel = "574521527513382922";



client.on("ready", () => {

        console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 

        client.user.setActivity(`S'occupe de ${client.guilds.size} servers avec ${client.users.size} personnes pour ${client.channels.size} channels`);
    });



    function coffre() {

        if(!CoffreFile == {SpawnCoffre: "false"} ) {
            CoffreFile = {SpawnCoffre: "false", CoffreMultiplicateur: 0};
            fs.writeFileSync(CoffreInfo, JSON.stringify(CoffreFile, null, 2));
        }

        if (CoffreFile.SpawnCoffre == "false" ) {

            console.log("\x1b[36m", "\x1b[42m",  "le coffre n'avait pas spawn.");
            CoffreFile = {SpawnCoffre: "true", CoffreMultiplicateur: 0};
            fs.writeFileSync(CoffreInfo, JSON.stringify(CoffreFile, null, 2));

            client.channels.get(CoffreChannel).send("Un coffre à spawn");

        } else if (CoffreFile.SpawnCoffre == "true" ) {

            var Multi = Number(CoffreFile.CoffreMultiplicateur) + 1
            CoffreFile = {SpawnCoffre: CoffreFile.SpawnCoffre, CoffreMultiplicateur: Multi};
            fs.writeFileSync(CoffreInfo, JSON.stringify(CoffreFile, null, 2));
            console.log("\x1b[37m", "\x1b[41m", "le coffre avait spawn. Multiplicateur de ", CoffreFile.CoffreMultiplicateur);

        }
    }
    setInterval(coffre, 5000);






    client.on("message", async message => {
        if(message.author.bot) return;
        if(message.content.indexOf(config.prefix) !== 0) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

    if(command === "coffre") {

        if (CoffreFile.SpawnCoffre = true) {

            const embed = new RichEmbed()
                .setTitle('Coffre ouvert!')
                .setColor(0xFF0000)
                .addField("Multiplicateur:", CoffreFile.CoffreMultiplicateur)
                //.addField("XP", userInfo.xp+"/100");
            console.log("\x1b[31m", "Coffre ouvert avec");
            client.channels.get(CoffreChannel).send(embed);

            CoffreFile = {SpawnCoffre: "false", CoffreMultiplicateur: 0};
            fs.writeFileSync(CoffreInfo, JSON.stringify(CoffreFile, null, 2));
            
    } else {

        client.channels.get(CoffreChannel).send("Aucun coffre de spawn");
    }

}

});





client.login(config.token);