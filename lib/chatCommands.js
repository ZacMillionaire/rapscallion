function unbanBrae(chatRoomID,chatterID,bot) {
	spinTheWheel = Math.floor(Math.random()*101);
	if(spinTheWheel>=80) {
		bot.sendMessage(chatterID,"Oh, that one was close. Try again!");
	} else {
		bot.unban(chatRoomID, chatterID);
		bot.sendMessage(chatterID,"( ￣ ▽ ￣ )ノ You got lucky! See you soon!");
	}
}
exports.getActiveCommand = function(message,chatterID,june){

	var bot = june.bot;
	var connection = june.connection;

	var message = message.toString('utf8');
	if(message) {
		console.log(june.colour.yellow+"[REQUEST] "+june.colour.reset+" "+chatterID+": "+message);
		connection.query("INSERT INTO `logs` (`steamID`,`timestamp`,`chatMessage`,`type`) VALUES ("+chatterID+",NOW(),"+connection.escape(message)+",'frndmsg')", function(err, rows, fields) {
			if(!err) {
				console.log(june.colour.green+"[LOGGED]"+june.colour.reset+" request from: "+chatterID);
			} else {
				throw err
			}
		});

		timeNow = new Date();
		botUptime = (timeNow.getTime()/1000)-bot.botStats.botBirth;
		botLife = Math.round(botUptime/60);
		if(message=="!bitcoins") {
			// https://github.com/ttezel/twit
			// Twitter search API documentation
			// https://dev.twitter.com/docs/api/1.1/get/search/tweets

			june.Twitter.get('search/tweets', { q: '#bitcoins', count: 100, result_type: 'mixed', lang: 'en', include_entities: false, src: 'typd' }, function(err, reply) {
				reply = reply.statuses[(Math.floor(Math.random()*100))]
				bot.sendMessage(bot.steamChatRoomID,"Bitbot: @"+reply.user.screen_name+": "+(reply.text));
				return
				june.fs.writeFile("data/twitter.txt", JSON.stringify(reply,null,4), function(err) {
					if(err) {
						console.log(err);
					} else {
						console.log("dumped twitter");
					}
				}); 
			})
			/*
			june.Twitter.search('#bitcoins', {'mode':'recent','show_user':true}, function(data) {
				//console.log(june.util.inspect(data));
				bot.sendMessage(chatterID,(data.statuses[0].text));
				return
				june.fs.writeFile("data/twitter.txt", JSON.stringify(data,null,4), function(err) {
					if(err) {
						console.log(err);
					} else {
						console.log("dumped twitter");
					}
				}); 
			});
*/
		}
		if(message=="!goldstandard") {
			june.Twitter.get('search/tweets', { q: '#ronpaul', count: 100, result_type: 'mixed', lang: 'en', include_entities: false, src: 'typd' }, function(err, reply) {
				reply = reply.statuses[(Math.floor(Math.random()*100))]
				bot.sendMessage(bot.steamChatRoomID,"Gold Standard: @"+reply.user.screen_name+": "+(reply.text));
				return
				june.fs.writeFile("data/twitter.txt", JSON.stringify(reply,null,4), function(err) {
					if(err) {
						console.log(err);
					} else {
						console.log("dumped twitter");
					}
				}); 
			})
		}
		if(message=="!reddit") {
			june.Twitter.get('statuses/user_timeline', { screen_name: 'Reddit_txt', count: 100, lang: 'en', include_entities: false }, function(err, reply) {
				reply = reply[(Math.floor(Math.random()*100))]
				bot.sendMessage(bot.steamChatRoomID,"@"+reply.user.screen_name+": "+(reply.text));
				return
				june.fs.writeFile("data/twitter.txt", JSON.stringify(reply,null,4), function(err) {
					if(err) {
						console.log(err);
					} else {
						console.log("dumped twitter");
					}
				}); 
			})
		}
		if(message=="!fimfacts") {
			june.Twitter.get('statuses/user_timeline', { screen_name: 'FIMFiction_TXT', count: 100, lang: 'en', include_entities: false }, function(err, reply) {
				reply = reply[(Math.floor(Math.random()*100))]
				bot.sendMessage(bot.steamChatRoomID,"@"+reply.user.screen_name+": "+(reply.text));
				return
				june.fs.writeFile("data/twitter.txt", JSON.stringify(reply,null,4), function(err) {
					if(err) {
						console.log(err);
					} else {
						console.log("dumped twitter");
					}
				}); 
			})
		}
		if(message=="!mute") {
			if(bot.botStats.muteTwitter) {
				bot.botStats.muteTwitter = false;
				bot.sendMessage(chatterID,"Twitter chat is now unmuted");
			} else {
				bot.botStats.muteTwitter = true;
				bot.sendMessage(chatterID,"Twitter chat is now muted");
			}
		}
		if((/!say\s(.*)/).test(message)) {
			if(chatterID=='76561197993698595') {
				chatmessage = (/!say\s(.*)/).exec(message);
				bot.sendMessage(bot.steamChatRoomID,chatmessage[1]);
			} else {
				bot.kick(bot.steamChatRoomID, chatterID);
				bot.sendMessage(chatterID,"Nope.");
			}
		}
		if((/!setname\s(.*)/).test(message)) {
			if(chatterID=='76561197993698595') {
				getName = (/!setname\s(.*)/).exec(message);
				bot.setPersonaName(getName[1]);
				bot.sendMessage(chatterID,"Name changed to "+getName[1]);
			} else {
				bot.kick(bot.steamChatRoomID, chatterID);
				bot.sendMessage(chatterID,"Nope.");
			}
		} else if(message=="!commands") {
			bot.botStats.validCommandRequests++;
			bot.sendMessage(chatterID,"Hi, you can use the following commands in and around my mouth: !uptime, !chatstats, !mystats.");
		} else if(message=="!uptime") {
			bot.botStats.validCommandRequests++;
			bot.sendMessage(chatterID,"I've been alive for "+botLife+" minutes so far.");
		} else if(message=="!chatstats") {
			bot.botStats.validCommandRequests++;
		bot.sendMessage(chatterID,"I've got stats for chats, I've:\n...logged "+bot.botStats.messagesLogged+" lines of chat\n...saved "+bot.botStats.linksLogged+" links\n..."+bot.botStats.emptyQuotes+" empty quotes\n...Brae has been kicked "+bot.botStats.braesKicked+" times in the "+botLife+" minutes I've been alive for.\n...and there have been a total of "+(bot.botStats.winners+bot.botStats.losers)+" spins of fate. "+bot.botStats.losers+" have lost.\nYou can also get your own stats here: http://www.jotunga.com/ausgoons/userStats.php?sid="+chatterID+" ...once I update it with real data.");
		} else if(message=="!mystats") {
			bot.botStats.validCommandRequests++;
			bot.sendMessage(chatterID,"http://www.jotunga.com/ausgoons/userStats.php?sid="+chatterID);
		} else if(message=="!unban") {
			bot.unban(bot.steamChatRoomID, chatterID);
			bot.sendMessage(chatterID,"( ￣ ▽ ￣ )ノ You are unbanned. Better luck next time!");
		} else if(message=="<3") {
			bot.unban(bot.steamChatRoomID, chatterID);
			bot.sendMessage(chatterID,"<3");
		} else {
			// bot.botStats.invalidCommandRequests++;
			// bot.sendMessage(chatterID,message+" wasn't a valid command.\nYou can use the following commands in and around my mouth: !uptime, !chatstats, !mystats.");
		}
	}
	connection.end();
};