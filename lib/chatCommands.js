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
			bot.sendMessage(chatterID,"I've got stats for chats, I've:\n...logged "+bot.botStats.messagesLogged+" lines of chat\n...saved "+bot.botStats.linksLogged+" links\n...had "+(bot.botStats.validCommandRequests+bot.botStats.invalidCommandRequests)+" total requests, "+bot.botStats.validCommandRequests+" that were actually valid\n..."+bot.botStats.emptyQuotes+" empty quotes\n...and Brae has been kicked "+bot.botStats.braesKicked+" times in the "+botLife+" minutes I've been alive for.\nYou can also get your own stats here: http://www.jotunga.com/ausgoons/userStats.php?sid="+chatterID+" ...once I update it with real data.");
		} else if(message=="!mystats") {
			bot.botStats.validCommandRequests++;
			bot.sendMessage(chatterID,"http://www.jotunga.com/ausgoons/userStats.php?sid="+chatterID);
		} else {
			bot.botStats.invalidCommandRequests++;
			bot.sendMessage(chatterID,message+" wasn't a valid command.\nYou can use the following commands in and around my mouth: !uptime, !chatstats, !mystats.");
		}
	}
};