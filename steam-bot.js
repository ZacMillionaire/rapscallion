var Steam	=	require('steam');
var mysql	=	require('mysql');
var fs		=	require('fs');
var cfg		=	require('./cfg/config');

var bot		=	new Steam.SteamClient();
var stdin	=	process.openStdin();

console.log("");
console.log("+-----------------------------------------------------------------------------+");
console.log("|                                                                             |");
console.log("|                            ~ Strong June v0.3 ~                             |");
console.log("|                            ~     6/6/2013     ~                             |");
console.log("|                                                                             |");
console.log("|                     A mid-year project by Scott Schultz                     |");
console.log("|                                                                             |");
console.log("+-----------------------------------------------------------------------------+");

// If the bot is given -passive as its startup argument, it will not log data, but it will still output it to the cmd window

if(process.argv[2]!="-passive"){
	var connection = mysql.createConnection(cfg.database);

	connection.connect(function(err) {
		if(err) {
			console.log("[June] Connection failed! "+err);
			process.exit();
		} else {
			console.log("[June] Connected and ready to go.");
		}
	});
	passiveMode = false;
} else {
	passiveMode = true;
}
var steamChatRoomID = '103582791429601458';
bot.logOn(cfg.steam.username,cfg.steam.password);
bot.on('loggedOn', function() {
	console.log('[June] Bot Logged in');
	if(passiveMode){
		console.log('[June] Not logging chat');
	} else {
		console.log('[June] Logging chat');
	}
	bot.setPersonaState(Steam.EPersonaState.Online); // to display your bot's status as "Online"
	bot.joinChat(steamChatRoomID);

	stdin.addListener("data", function(d) {
		botMessage = d.toString();
		bot.sendMessage(steamChatRoomID,botMessage);
		geturl = new RegExp("(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))","g");
		linkCount = 0;
		urlList = botMessage.match(geturl);
		if(urlList){
			linkCount = urlList.length;
			console.log("[RESPONSE] That message had one or more links.");
			console.log("[Matches] "+linkCount);
			for (var i = 0; i < linkCount; i++) {
				insertURL = urlList[i];
				connection.query("INSERT INTO `links` (`timestamp`,`steamID`,`linkURL`) VALUES (NOW(),"+chatter+","+connection.escape(insertURL)+")", function(err, rows, fields) {
					if(!err) {
						console.log("[LOGGED] Found and logged a link from: "+chatter);
					} else {
						throw err
					}
				});
			}
		}
		wordCount = botMessage.match(/\S+/gi).length;
		wordCount = wordCount-linkCount;
		connection.query("INSERT INTO `logs` (`timestamp`,`steamID`,`instanceSteamName`,`chatMessage`,`wordCount`,`linkCount`,`type`) VALUES (NOW(),"+bot.steamID+","+connection.escape(bot.users[bot.steamID].playerName)+","+connection.escape(botMessage)+","+wordCount+","+linkCount+",'grpmsg')", function(err, rows, fields) {
			if(!err) {
				console.log("[LOGGED] "+bot.users[bot.steamID].playerName+' ('+bot.steamID+'): '+botMessage);
			} else {
				throw err
			}
		});
	});

});
// bot.on('friendMsg', function(source, message, type) { // friend messages
// 	if(!passiveMode) {
// 		if(message){
// 			connection.query("INSERT INTO `logs` (`steamID`,`timestamp`,`instanceSteamName`,`chatMessage`,`type`) VALUES ("+source+",NOW(),"+connection.escape(bot.users[source].playerName)+","+connection.escape(message)+",'frndmsg')", function(err, rows, fields) {
// 				if(!err) {
// 					console.log("[LOGGED] "+bot.users[source].playerName+' ('+source+'): '+message);
// 				} else {
// 					throw err
// 				}
// 			});
// 		}
// 	} else {
// 		console.log("[OBSERVED] "+bot.users[source].playerName+' ('+source+'): '+message);
// 	}

// });
bot.on('chatMsg', function(chatRoom, message, type, chatter) { // chat room messages
	if(!passiveMode) {
		if(message){
			geturl = new RegExp("(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))","g");
			linkCount = 0;
			urlList = message.match(geturl);
			if(urlList){
				linkCount = urlList.length;
				console.log("[RESPONSE] That message had one or more links.");
				console.log("[Matches] "+linkCount);
				for (var i = 0; i < linkCount; i++) {
					insertURL = urlList[i];
					connection.query("INSERT INTO `links` (`timestamp`,`steamID`,`linkURL`) VALUES (NOW(),"+chatter+","+connection.escape(insertURL)+")", function(err, rows, fields) {
						if(!err) {
							console.log("[LOGGED] Found and logged a link from: "+chatter);
						} else {
							throw err
						}
					});
				}
			}
			wordCount = message.match(/\S+/gi).length;
			wordCount = wordCount-linkCount;
			connection.query("INSERT INTO `logs` (`timestamp`,`steamID`,`instanceSteamName`,`chatMessage`,`wordCount`,`linkCount`,`type`) VALUES (NOW(),"+chatter+","+connection.escape(bot.users[chatter].playerName)+","+connection.escape(message)+","+wordCount+","+linkCount+",'grpmsg')", function(err, rows, fields) {
				if(!err) {
					console.log("[LOGGED] "+bot.users[chatter].playerName+' ('+chatter+'): '+message);
				} else {
					throw err
				}
			});
		}
	} else {
		console.log("[OBSERVED] "+bot.users[chatter].playerName+' ('+chatter+'): '+message);
	}
});
bot.on('chatStateChange',function(state,victim,sourceRoom,executor){
	if(!passiveMode) {
		connection.query("INSERT INTO `kickbans` (`timestamp`,`victimID`,`executorID`,`kickbanType`) VALUES (NOW(),"+victim+",'"+executor+"','"+state+"')", function(err, rows, fields) {
			if(!err) {
				console.log("[LOGGED] "+victim+" ("+bot.users[victim].playerName+") chat state altered by "+executor+" ("+bot.users[executor].playerName+") method > "+state);
			} else {
				throw err
			}
		});
	} else {
		console.log("[OBSERVED] "+victim+" ("+bot.users[victim].playerName+") chat state altered by "+executor+" ("+bot.users[executor].playerName+") method > "+state);
	}
	if(victim==bot.steamID) {
		console.log("[What a bitch] "+executor+" just kicked me!");
		if(state=='8'){
			bot.joinChat(steamChatRoomID);
			bot.sendMessage(steamChatRoomID,"That was mean :(");
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
	