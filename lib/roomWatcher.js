exports.observeChat = function(state,victim,sourceRoom,executor,june){

	var bot = june.bot;
	var connection = june.connection;

	connection.query("INSERT INTO `kickbans` (`timestamp`,`victimID`,`executorID`,`kickbanType`) VALUES (NOW(),"+victim+",'"+executor+"','"+state+"')", function(err, rows, fields) {
		if(!err) {
			console.log(june.colour.green+"[LOGGED]"+june.colour.reset+" "+victim+" chat state altered by "+executor+" method > "+state);
		} else {
			console.log(june.colour.red+"[ERROR]"+june.colour.reset+" shit fucked up somewhere. roomWatcher.js Line 23 "+err);
			//throw err
		}
	});
	if(victim=='76561198095191626'&&state=='1') {
		bot.sendMessage(sourceRoom,"Sup bro");
	}
	if(victim=='76561198095191626'&&state=='4') {
		bot.sendMessage(sourceRoom,"Bye bro");
	}
	if(victim==bot.steamID) {
		console.log("[What a bitch] "+executor+" just kicked me!");
		if(state=='8'){
			randomJoin = Math.floor(Math.random()*500);
			setTimeout(bot.joinChat(bot.steamChatRoomID),randomJoin);
			setTimeout(bot.sendMessage(bot.steamChatRoomID,"That was mean :("),randomJoin);
		}
	} else if(victim=='76561197994626023') {
		if(state=='8'){
			bot.sendMessage(sourceRoom,"(ﾉ・∀・)ﾉ ＝＝＝＝＝┻━┻))⊙Дﾟ)･∵");
			//bot.sendMessage(sourceRoom,"ｷﾀ━━━━━━(ﾟ∀ﾟ)━━━━━━!!!!!");
			console.log(june.colour.magenta+"[lol] bye brae."+june.colour.reset);
			bot.botStats.braesKicked++;
		}
	}
	if(victim=='76561197960694547'&&state==4) {
		bot.sendMessage(sourceRoom,"Franko left. THIS PLEASES ME GREATLY.");
	}
	connection.end();
	//  1 : joined
	//  2 : left chat
	//  3 :
	//  4 : disconnected
	//  5 :
	//  6 :
	//  7 :
	//  8 : kicked
	//  9 : 
	// 10 :
	// 11 :
	// 12 :
	// 13 :
	// 14 :
	// 15 :
	// 16 : banned
};
