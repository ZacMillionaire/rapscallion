exports.observeChat = function(personaObject,june) {

	var bot = june.bot;
	var connection = june.connection;
	//console.log(personaObject);
	if(personaObject.gameid&&personaObject.gameid>0&&personaObject.steamidSource>0) {

		connection.query("INSERT INTO `gamesplayed` (`timestamp`,`gameID`,`gameName`,`playerSteamID`) VALUES (NOW(),"+personaObject.gameid+","+connection.escape(personaObject.gameName)+","+personaObject.friendid+")", function(err, rows, fields) {
			if(!err) {
				bot.botStats.gamesPlayed++;
				console.log(june.colour.green+"[LOGGED] "+june.colour.reset+personaObject.friendid+" is now playing "+personaObject.gameName+"("+personaObject.gameid+")");
			} else {
				throw err
			}
		});
		//console.log(june.colour.cyan+"[USER ACTIVITY]"+june.colour.reset+" "+personaObject.friendid+" is now playing a game: "+personaObject.gameName+" ("+personaObject.gameid+")");
	}
	connection.end();
};
