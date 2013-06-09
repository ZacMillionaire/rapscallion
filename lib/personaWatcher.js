exports.observeChat = function(personaObject,june) {

	var bot = june.bot;
	var connection = june.connection;
	/*
	if(personaObject.personaState==1&&personaObject.steamidSource!=0) {
		console.log(june.colour.cyan+"[USER ACTIVITY]"+june.colour.reset+" "+personaObject.friendid+" is now online ("+personaObject.personaState+")");
		//online
	} else if(personaObject.personaState==2&&personaObject.steamidSource!=0) {
		console.log(june.colour.cyan+"[USER ACTIVITY]"+june.colour.reset+" "+personaObject.friendid+" is now busy ("+personaObject.personaState+")");
		//busy
	} else if(personaObject.personaState==3&&personaObject.steamidSource!=0) {
		console.log(june.colour.cyan+"[USER ACTIVITY]"+june.colour.reset+" "+personaObject.friendid+" is now away ("+personaObject.personaState+")");
		//away
	}
	*/
	if(personaObject.gameid&&personaObject.gameid>0&&personaObject.gameServerIp!=0) {

		connection.query("INSERT INTO `gamesplayed` (`timestamp`,`gameID`,`gameName`,`playerSteamID`) VALUES (NOW(),"+personaObject.gameid+","+connection.escape(personaObject.gameName)+","+personaObject.friendid+")", function(err, rows, fields) {
			if(!err) {
				bot.botStats.gamesPlayed++;
				console.log(june.colour.green+"[LOGGED]"+june.colour.reset+" is now playing "+personaObject.gameName+"("+personaObject.gameid+")");
			} else {
				throw err
			}
		});
		console.log(june.colour.cyan+"[USER ACTIVITY]"+june.colour.reset+" "+personaObject.friendid+" is now playing a game: "+personaObject.gameName+" ("+personaObject.gameid+")");
	}

};
