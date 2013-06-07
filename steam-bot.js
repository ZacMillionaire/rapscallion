var Steam		=	require('steam');
var mysql		=	require('mysql');
var fs			=	require('fs');
var cfg			=	require('./cfg/config');
var commandFile;
var bot		=	new Steam.SteamClient();
var stdin	=	process.openStdin();

console.log("");
console.log("+-----------------------------------------------------------------------------+");
console.log("|                                                                             |");
console.log("|                            ~ Strong June v0.4 ~                             |");
console.log("|                            ~     7/6/2013     ~                             |");
console.log("|                                                                             |");
console.log("|                     A mid-year project by Scott Schultz                     |");
console.log("|                                                                             |");
console.log("+-----------------------------------------------------------------------------+");

function requireUncached(module){
    delete require.cache[require.resolve(module)]
    return require(module)
}

var steamChatRoomID = '103582791429601458';
// If the bot is given -passive as its startup argument, it will not log data, but it will still output it to the cmd window

var reset = "\033[0m";
var red = "\033[31m";
var green = "\033[32m";
var yellow = "\033[33m";
var blue = "\033[34m";
var magenta = "\033[35m";
var cyan = "\033[36m";
var white = "\033[37m";

if(process.argv[2]!="-passive"){
	var connection = mysql.createConnection(cfg.database);

	connection.connect(function(err) {
		if(err) {
			console.log(red+"[June]"+reset+" Connection failed! "+err);
			process.exit();
		} else {
			console.log(green+"[June]"+reset+" Connected and ready to go.");
		}
	});
	passiveMode = false;
} else {
	passiveMode = true;
}
bot.logOn(cfg.steam.username,cfg.steam.password);
botBirth = new Date();
bot.on('loggedOn', function() {

	bot.botStats = {
		botBirth : botBirth.getTime()/1000,
		messagesLogged : 0,
		linksLogged : 0,
		braesKicked : 0,
		validCommandRequests : 0,
		invalidCommandRequests : 0,
		emptyQuotes : 0,
		selfEmptyQuotes : 0
	}
	console.log(green+'[June]'+reset+' Bot Logged in');
	if(passiveMode){
		console.log(green+'[June]'+reset+' Not logging chat');
	} else {
		console.log(green+'[June]'+reset+' Logging chat');
		bot.joinChat(steamChatRoomID);
	}
	bot.setPersonaState(Steam.EPersonaState.Online); // to display your bot's status as "Online"

	stdin.addListener("data", function(d) {
		botMessage = d.toString();
		bot.sendMessage(steamChatRoomID,botMessage);
		listener = requireUncached('./lib/chatListener');
		listener.listenToChat(botMessage,bot.steamID,'grpmsg',bot,connection,steamChatRoomID);

		// geturl = new RegExp("(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))","g");
		// linkCount = 0;
		// urlList = botMessage.match(geturl);
		// if(urlList){
		// 	linkCount = urlList.length;
		// 	console.log(green+"[RESPONSE]"+reset+" That message had one or more links.");
		// 	console.log(cyan+"[Matches] "+reset+" "+linkCount);
		// 	for (var i = 0; i < linkCount; i++) {
		// 		insertURL = urlList[i];
		// 		connection.query("INSERT INTO `links` (`timestamp`,`steamID`,`linkURL`) VALUES (NOW(),"+chatter+","+connection.escape(insertURL)+")", function(err, rows, fields) {
		// 			if(!err) {
		// 				console.log(green+"[LOGGED]"+reset+" Found and logged a link from: "+chatter);
		// 			} else {
		// 				throw err
		// 			}
		// 		});
		// 	}
		// }
		// wordCount = botMessage.match(/\S+/gi).length;
		// wordCount = wordCount-linkCount;
		// connection.query("INSERT INTO `logs` (`timestamp`,`steamID`,`chatMessage`,`wordCount`,`linkCount`,`emptyQuoteCount`,`type`) VALUES (NOW(),"+bot.steamID+","+connection.escape(bot.users[bot.steamID].playerName)+","+connection.escape(botMessage)+","+wordCount+","+linkCount+",'grpmsg')", function(err, rows, fields) {
		// 	if(!err) {
		// 		console.log(green+"[LOGGED]"+reset+" "+bot.users[bot.steamID].playerName+' ('+bot.steamID+'): '+botMessage);
		// 	} else {
		// 		throw err
		// 	}
		// });
	});

});
bot.on('friendMsg', function(source, message, type) { // friend messages
	commandFile = requireUncached('./lib/chatCommands');
	if(!passiveMode) {
		if(message){
			commandFile.getActiveCommand(message,source,bot,connection);
		}
	} else {
		if(message){
			commandFile.getPassiveCommand(message,source,bot,connection);
		}
	}
});
bot.on('chatMsg', function(chatRoom, message, type, chatter) { // chat room messages
	listener = requireUncached('./lib/chatListener');
	if(!passiveMode) {
		if(message){
			listener.listenToChat(message,chatter,type,bot,connection,chatRoom);
		}
	} else {
		console.log(yellow+"[OBSERVED] "+reset+" "+bot.users[chatter].playerName+' ('+chatter+'): '+message);
	}
});
bot.on('chatStateChange',function(state,victim,sourceRoom,executor){
	if(!passiveMode) {
		connection.query("INSERT INTO `kickbans` (`timestamp`,`victimID`,`executorID`,`kickbanType`) VALUES (NOW(),"+victim+",'"+executor+"','"+state+"')", function(err, rows, fields) {
			if(!err) {
				console.log(green+"[LOGGED]"+reset+" "+victim+" ("+bot.users[victim].playerName+") chat state altered by "+executor+" ("+bot.users[executor].playerName+") method > "+state);
			} else {
				throw err
			}
		});
	} else {
		console.log(yellow+"[OBSERVED] "+reset+" "+victim+" ("+bot.users[victim].playerName+") chat state altered by "+executor+" ("+bot.users[executor].playerName+") method > "+state);
	}
	if(victim==bot.steamID) {
		console.log("[What a bitch] "+executor+" just kicked me!");
		if(state=='8'){
			randomJoin = Math.floor(Math.random()*500);
			setTimeout(bot.joinChat(steamChatRoomID),randomJoin);
			setTimeout(bot.sendMessage(steamChatRoomID,"That was mean :("),randomJoin);
		}
	} else if(victim=='76561197994626023') {
		if(state=='8'){
			console.log(magenta+"[lol] bye brae."+reset);
			braesKicked++;
		}
	}
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
})
bot.on('chatInvite', function(chatRoomID, chatRoomName, patronID) {
	console.log('Got an invite to ' + chatRoomName +'('+chatRoomID+') from ' + bot.users[patronID].playerName);
	bot.joinChat(chatRoomID); // autojoin on invite
});
	