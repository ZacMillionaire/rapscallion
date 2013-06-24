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

		if(message=="!commands") {
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
			if(chatterID=='76561197994626023') {
				var rightnow = new Date();
				if(typeof bot.botStats[chatterID] == "undefined") {
					bot.botStats[chatterID] = {
						lastRequest : rightnow.getTime()/1000
					}
					unbanBrae(bot.steamChatRoomID,chatterID,bot);
				} else {
					timeElapsed = (rightnow/1000)-bot.botStats[chatterID].lastRequest;
					if(timeElapsed>=30) {
						bot.botStats[chatterID] = {
							lastRequest : rightnow.getTime()/1000
						}
						unbanBrae(bot.steamChatRoomID,chatterID,bot);
					} else {
						console.log(timeElapsed+" seconds ago");
					}
				}
			} else {
				bot.unban(bot.steamChatRoomID, chatterID);
				bot.sendMessage(chatterID,"( ￣ ▽ ￣ )ノ You are unbanned. Better luck next time!");
			}
		} else {
			bot.botStats.invalidCommandRequests++;
			bot.sendMessage(chatterID,message+" wasn't a valid command.\nYou can use the following commands in and around my mouth: !uptime, !chatstats, !mystats.");
		}
	}
	connection.end();
};