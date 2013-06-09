var june = require('./cfg/botGlobals');
var bot = june.bot;

console.log("");
console.log("+-----------------------------------------------------------------------------+");
console.log("|                                                                             |");
console.log("|                            ~ Strong June v0.4 ~                             |");
console.log("|                            ~     7/6/2013     ~                             |");
console.log("|                                                                             |");
console.log("|                     A mid-year project by Scott Schultz                     |");
console.log("|                                                                             |");
console.log("+-----------------------------------------------------------------------------+");

// If the bot is given -passive as its startup argument, it will not log data, but it will still output it to the cmd window
if(process.argv[2]!="-passive"){
	june.connection = june.mysql.createConnection(june.cfg.dbInfo);

	june.connection.connect(function(err) {
		if(err) {
			console.log(june.colour.red+"[June]"+june.colour.reset+" Connection failed! "+err);
			process.exit();
		} else {
			console.log(june.colour.green+"[June]"+june.colour.reset+" Connected and ready to go.");
		}
	});
	passiveMode = false;
} else {
	passiveMode = true;
}

bot.logOn(june.cfg.steamAccount.username,june.cfg.steamAccount.password);
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
		selfEmptyQuotes : 0,
		gamesPlayed: 0
	}
	console.log(june.colour.green+'[June]'+june.colour.reset+' Bot Logged in');
	if(passiveMode){
		console.log(june.colour.green+'[June]'+june.colour.reset+' Not logging chat');
	} else {
		console.log(june.colour.green+'[June]'+june.colour.reset+' Logging chat');
	}
	bot.joinChat(bot.steamChatRoomID);
	bot.setPersonaState(june.Steam.EPersonaState.Online); // to display your bot's status as "Online"

	june.stdin.addListener("data", function(d) {
		june.loadModule('../lib/botSTDIN').listenConsole(d,june);
	});
});
bot.on('friendMsg', function(source, message, type) { // friend messages
	commandFile = june.loadModule('../lib/chatCommands').getActiveCommand(message,source,june);
});
bot.on('chatMsg', function(chatRoom, message, type, chatter) { // chat room messages
	listener = june.loadModule('../lib/chatListener').listenToChat(message,chatter,type,chatRoom,june);
});
bot.on('chatStateChange',function(state,victim,sourceRoom,executor){
	listener = june.loadModule('../lib/roomWatcher').observeChat(state,victim,sourceRoom,executor,june);
});
bot.on('personaState',function(personaObject){
	listener = june.loadModule('../lib/personaWatcher').observeChat(personaObject,june);
})
bot.on('chatInvite', function(chatRoomID, chatRoomName, patronID) {
	console.log('Got an invite to '+chatRoomName+'('+chatRoomID+') from '+patronID);
	bot.joinChat(chatRoomID); // autojoin on invite
});
process.on('error',function(){
	console.log(june.colour.red+"[ERROR]"+june.colour.reset+" shit fucked up somewhere.");
})