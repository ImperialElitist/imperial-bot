/*
-===================================================-
                    ImperialBot
-===================================================-
Directions:
1. Clone git repository
2. Run "npm i"
3. Run "npm -g i nodemon"
4. Obtain token.key file and store in working directory
5. Run "nodemon impbot.js"
*/
//Set command prefix
let prefix = 'ib!';
const KickResponses = [
    "% has unfortunetly suffered a gruesome and painful demise, how sad.",
    "Chik Chik...Bam! % has been annihilated by Cleatus' shotgun.",
    "% has been successfully purged. If you disagree with this decision, please report to your nearest peace and harmony camp for immediate re-education.", 
    "The heretic, % was brutally burnt at the stake to the sounds of a cheering crowd."];
const FailResponses = [
    "Unfortunetly we were unable to reach % as they escaped through the backdoor, please try again later",
    "Mission failed, we'll get % next time",
    "Oops, the sniper\'s bullet missed % and hit JFK instead :/"];

// Declare dependencies
const os = require("os");
const path = require('path');
const fs = require('fs');
const Discord = require('discord.js');
const Joi = require('@hapi/joi');

// Initialise Discord Bot
const bot = new Discord.Client();

// Read token from "token.key" file in wokring directory (same folder as impbot.js)
// token.key is not avaible on the GitHub repository. Only certain people have this file
const token = fs.readFileSync('token.key', 'utf8', (err, contents) => {
    if (err) {
        console.log('Authentication failed. Could not find file "token.key" in working directory.');
        quit();
    } else {
        return contents;
    }
});

// Login using token, catch error
try {
    bot.login(token);
    console.log('Login successful.');
}
catch(err) {
    console.log(err.message);
    console.log('Failed to login. Possibly the wrong token.');
}

// Miscellaneous message event handling
// Takes message contents and searches for keywords and replies (in)appropriately
// Example:
// Lynx: riley likes men
// ImperialBot: @Lynx, Warning: Extreme **toxicity** has been detected within the contents of your message
bot.on('message', (message) => {
    if (message.content == 'there is a nigger on the lawn') {
        message.reply("yee yee yee yee yee. get the shotgun, there's a nigger on the lawn, nigger nigger nigger", {tts: true});
    } else if (message.content == 'fag') {
        message.reply("No u");
    } else if (message.content == 'gay') {
        message.reply("No u");
    } else if (message.content.toLowerCase() == 'alex') {
        message.reply("It is wise to not invoke such powerful beings");
    } else if (message.content.toLowerCase() == 'imperial') {
        message.reply("Do not use the Lord's name in vain");
    } else if (message.content.toLowerCase().includes('jarrod') || message.content.toLowerCase().includes('martin')) {
        message.reply("Warning: Extreme **homo**sexuality has been detected within the contents of your message");
    } else if (message.content.toLowerCase().includes('archer') || message.content.toLowerCase().includes('alex')) {
        message.reply("Warning: Extreme **hetero**sexuality has been detected within the contents of your message");
    } else if (message.content.toLowerCase().includes('riley') || message.content.toLowerCase().includes('wombat')) {
        message.reply("Warning: Extreme **toxicity** has been detected within the contents of your message");
    } else if (message.content.toLowerCase().includes('shermel')) {
        message.reply("Warning: Extreme **kindness** has been detected within the contents of your message", {tts: true});
    }
});

// Log when bot is ready
bot.on('ready', function() {
    console.log("Cocked and loaded.");
});


// Command handling (anything that starts with pre-set prefix)
bot.on('message', function(message) {
    // If message starts with prefix, its a command
    if (message.content.startsWith(prefix)) {
        // Chop prefix off the start
        var cmdstr = message.content.slice(3);

        // Kick command
        if (cmdstr.slice(0, 4) == "kick" && (message.member.roles.has('595915968094404608'))) {
            var member = message.mentions.members.first();
            member.kick().then((member) => {
                // Pick random kick response and send
                var response2 = KickResponses[Math.floor(Math.random() * KickResponses.length)];
                message.channel.send(response2.replace("%", member.displayName))
            }).catch(() => {
                // Pick random fail response and send
                var response1 = FailResponses[Math.floor(Math.random() * FailResponses.length)];
                message.channel.send(response1.replace("%", member.displayName))
            });
        }

        // Kick all command
        if (cmdstr.slice(0, 8) == "order_66" && message.member.roles.has('595915968094404608')) {
            // Get list of members
            var members = guild.members();
            for (member in members) {
                member.kick().then((member) => {
                    var response2 = KickResponses[Math.floor(Math.random() * KickResponses.length)];
                    message.channel.send(response2.replace("%", member.displayName))
                }).catch(() => {
                    var response1 = FailResponses[Math.floor(Math.random() * FailResponses.length)];
                    message.channel.send(response1.replace("%", member.displayName))
                });
            }
        }

        // Voteban command
        if(cmdstr.slice(0,7) == "voteban") {
            message.channel.send("soz bro idk how to voteban yet :/")
        }
    }
});


bot.on("message", (message) => {
    if (!message.author.bot) {
        if (message.content.includes('@everyone') && !message.member.roles.has('595915968094404608')) {
            console.log(`Banning ${message.author.username}`);
            message.author.send("You were banned for @ing everyone. Get fucked.");
            message.author.ban({
                days: 7,
                reason: "You deserved it for @ing everyone, you little attention-whore."});
            message.channel.send(`${message.author.tag} was a lil purged, heil imperial`);

        }
    }

})


/*
var codeArr = [];
var currentVoteBan = "none";
var voteProgress = false;
var currentAmount = 0;
var neededAmount = 3;
var votedPeople = new Array();


function acceptCmd(msg) {
    try {
        var Recieved = msg.content;
        var Args = Recieved.substr(Recieved.indexOf(" ") + 1);
        var Words = Recieved.split(" ");
        if (!msg.author.bot) {
            var n = Recieved.includes("@everyone");
            if (n) {
                console.log("banning");
                msg.author.send("you were banned for pinging everyone");
                msg.member.ban({
                        days: 7,
                        reason: 'They deserved it for pining everyone, fucking attention-whore little slut'
                    })
                    .then(console.log)
                    .catch(console.error);
                msg.channel.send("a user got lil purged, heil", {tts: true});
            }

            if (Words[0] == "i!voteban") {
				//msg.channel.send("vtdp: " + JSON.stringify(votedPeople) + ", curr: " + currentAmount);
				if (currentVoteBan != "none") { // Check for in-progress voteban, continue if is
					var alreadyVoted = false;
					for (var i = 0; i < votedPeople.length; i++) { // Check if person has voted
						if (votedPeople[i].id == msg.author.id) {
							alreadyVoted = true;
						}
					}
					
					if (alreadyVoted) { // Check if person who typed message has voted
						msg.channel.send("You have already voted.");
					} else {
						votedPeople.push({id: msg.author.id});
						currentAmount++; // Add to amount
						msg.channel.send("Voteban: " + currentAmount + " / " + neededAmount);
						if (currentAmount >= neededAmount) { // Check if person should get banned
							var userToBan = msg.guild.members.get(currentVoteBan);
							if (userToBan.id != "269930991626223619") {
								userToBan.ban({days: 7, reason: 'reason time'});
								msg.channel.send("Goodbye.");
								currentVoteBan = "none";
								votedPeople = new Array();
							} else {
								msg.channel.send("Nice try, peasant");
							}
						}
					}
				} else { // Not in progress, create new voteban
					if (msg.content.split(" ").length > 0) {
						var voteBanId = msg.mentions.users.first().id;
						if (voteBanId.length > 16) { // Easy way to see if it is an ID
							// Create new voteban.
							currentVoteBan = voteBanId; 
							currentAmount = 1; 
							votedPeople.push({id: msg.author.id});
							msg.channel.send("Voteban initiated. Use i!voteban to vote.");
						}
					} else {
						msg.channel.send("Invalid mention / ID");
					}
				}
            }

            if (codeArr["global"] !== "undefined") {
                eval(codeArr["global"]);
            }

            if (Words[0] == "l!exec") {
                eval(codeArr[Words[1]]);
            }
            if (Words[0] == "l!save") {
                var Arg = removeFrom(Recieved, 2);
                var Name = Words[1];
                if (Arg.includes("include(")) {
                    msg.channel.send("remove include() first");
                } else {
                    console.log(Arg);
                    codeArr[Name] = Arg;
                }
            }
            if (Words[0] == "l!relay") {
                msg.channel.send(codeArr[Words[1]]);
            }
            if (Words[0] == "l!exectext") {
                eval(args);
            }
            for (let e in codeArr) {
                if (Words[0] == "l!" + e) {
                    eval(codeArr[e]);
                }
            }
        }
        if (Recieved == "*s") {
            msg.channel.send(GetRandomSentence());
        } else if (Recieved == "*r") {
            msg.channel.send(args);
            msg.delete(1000);
        } else if (Recieved == "") {

        }
    } catch (err) {
        msg.channel.send("problem occurred!!!!: " + err.message);
    }
}

*/