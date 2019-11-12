const os = require("os");
const http = require("http");
const path = require('path');
const fs = require('fs');
const Discord = require('discord.js');
const Joi = require('@hapi/joi');
const bot = new Discord.Client();

const token = fs.readFileSync('token.key', 'utf8', (err, contents) => {
    if (err) {
        console.log('Authentication failed. Could not find file "token.key" in working directory.');
        quit();
    } else {
        return contents;
    }
});

try {
    bot.login(token);
    console.log('Login successful.');
}
catch(err) {
    console.log(err.message);
    console.log('Failed to login. Possibly the wrong token.');
}

bot.on('message', function(message) {
    if (message.content == 'homosexual') {
        message.reply("No you");
    } else if (message.content == 'fag') {
        message.reply("No u");
    } else if (message.content == 'Alex') {
        message.reply("It is wise to not invoke such powerful beings");
    } else if (message.content == 'gay') {
        message.reply("No u");
    } else if (message.content == 'Imperial') {
        message.reply("Do not use the Lord's name in vain");
    } else if (message.content.toLowerCase().includes('jarrod') || message.content.toLowerCase().includes('martin')) {
        message.reply("Warning: Extreme **homo**sexuality has been detected within the contents of your message");
    } else if (message.content.toLowerCase().includes('archer') || message.content.toLowerCase().includes('alex')) {
        message.reply("Warning: Extreme **hetero**sexuality has been detected within the contents of your message");
    } else if (message.content.toLowerCase().includes('riley') || message.content.toLowerCase().includes('wombat')) {
        message.reply("Warning: Extreme **toxicity** has been detected within the contents of your message");
    } else if (message.content.toLowerCase().includes('shermel')) {
        message.reply("Warning: Extreme **kindness** has been detected within the contents of your message");
    }
});


bot.on('message', function(message) {
	if (message.content.startsWith('im!sound')) {
		var args = content.slice(9)
	}
});


bot.on('ready', function() {
    console.log("Ready");
})

function onMessage(message) {
	if (message.content.startsWith("im!kick")) {

        var member = message.mentions.members.first();
        const KickResponses = [`${member.displayName} has unfortunetly suffered a gruesome and painful demise, how sad`, 'Chik Chik...Bam!', `:truth: ${member.displayName} has been successfully purged. If you disagree with this decision, please report to your nearest peace and harmony camp for immediate re-education`, `The heretic, ${member.displayName} was brutally burnt at the stake to the sounds of a cheering crowd`];
        const FailResponses = [`Unfortunetly we were unable to reach ${member.displayName} as they escaped through the backdoor, please try again later`, "Mission failed, we'll get 'em next time", 'Oops, the sniper missed'];
        var response1 = FailResponses[Math.floor(Math.random() * FailResponses.length)];
        var response2 = KickResponses[Math.floor(Math.random() * KickResponses.length)];

        member.kick().then((member) => {

            message.channel.send(response2)
        }).catch(() => {

            message.channel.send(response1)
        });
    }
	if (message.content.startsWith("im!order_66")) {

        var member = guild.members();
        const KickResponses = [`${member.displayName} has unfortunetly suffered a gruesome and painful demise, how sad`, 'Chik Chik...Bam!', `:truth: ${member.displayName} has been successfully purged. If you disagree with this decision, please report to your nearest peace and harmony camp for immediate re-education`, `The heretic, ${member.displayName} was brutally burnt at the stake to the sounds of a cheering crowd`];
        const FailResponses = [`Unfortunetly we were unable to reach ${member.displayName} as they escaped through the backdoor, please try again later`, "Mission failed, we'll get 'em next time", 'Oops, the sniper missed'];
        var response1 = FailResponses[Math.floor(Math.random() * FailResponses.length)];
        var response2 = KickResponses[Math.floor(Math.random() * KickResponses.length)];

        member.kick().then((member) => {

            message.channel.send(response2)
        }).catch(() => {

            message.channel.send(response1)
        });
    }
}

bot.on("message", (message) => {
	onMessage(message);
	acceptCmd(message);
});


var codeArr = [];

function rand(randNumMin, randNumMax) {
    var randInt = (Math.floor(Math.random() * (randNumMax - randNumMin + 1)) + randNumMin);
    return randInt;
}

function m(msg, s) {
    msg.channel.send(s);
}

function removeFrom(str, pos) {
    var Words = str.split(" ");
    var End = "";
    for (var i = pos; i < Words.length; i++) {
        if (i == Words.length) {
            End += Words[i];
        } else {
            End += Words[i] + " ";
        }
    }
    return End;
}

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
                        reason: 'They deserved it'
                    })
                    .then(console.log)
                    .catch(console.error);
                msg.channel.send("a user got lil purged, heil");
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