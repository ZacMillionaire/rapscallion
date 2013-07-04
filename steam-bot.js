var june = require('./cfg/botGlobals');
var bot = june.bot;

console.log("");
console.log("+-----------------------------------------------------------------------------+");
console.log("|                                                                             |");
console.log("|                            ~ Strong June v0.8 ~                             |");
console.log("|                            ~     18/6/2013    ~                             |");
console.log("|                                                                             |");
console.log("|                     A mid-year project by Scott Schultz                     |");
console.log("|                                                                             |");
console.log("+-----------------------------------------------------------------------------+");

june.pool = june.mysql.createPool(june.cfg.dbInfo);


june.pool.getConnection(function(err,connection){
	if(err) {
		console.log(june.colour.red+"[June]"+june.colour.reset+" Pooled Connection failed! "+err);
		process.exit();
	} else {
		console.log(june.colour.green+"[June]"+june.colour.reset+" Pooled Connection succeeded!");
		console.log(june.colour.green+"[June]"+june.colour.reset+" Connected and ready to go.");

		june.connection = connection;

		if(june.fs.existsSync('data/sentry')) {
			var steamGuard = june.fs.readFileSync("data/sentry");
		} else {
			var steamGuard = '';
			// If you have attempted to login once and got an error 63/65, you should have received an email containing a steam guard code. Put it here.
			// If the code is correct, the bot will capture the sentry hash preventing further need for steam guard codes.
		}

		bot.logOn(june.cfg.steamAccount.username,june.cfg.steamAccount.password,steamGuard);

		botBirth = new Date();

		bot.on('loggedOn', function() {
			console.log(june.colour.green+'[June]'+june.colour.reset+' Bot Logged in');
			console.log(june.colour.green+'[June]'+june.colour.reset+' Waiting for web session...');
			bot.on('sentry',function(sentryBuffer){
				if(!june.fs.existsSync('data/sentry')) {
					var sentryBuf = new Buffer(sentryBuffer);
					june.fs.writeFile("data/sentry", sentryBuf, function(err) {
						if(err) {
							console.log(err);
						} else {
							console.log(sentryBuf);
							console.log("Captured the sentry hash");
						}
					}); 
				}
			})
			bot.on('webSessionID',function(sessionID){

				console.log(june.colour.green+'[June]'+june.colour.reset+' Received web session ID. Initialising bot.');

				bot.botStats = {
					botBirth : botBirth.getTime()/1000,
					messagesLogged : 0,
					linksLogged : 0,
					braesKicked : 0,
					validCommandRequests : 0,
					invalidCommandRequests : 0,
					emptyQuotes : 0,
					selfEmptyQuotes : 0,
					gamesPlayed: 0,
					winners 	: 0,
					losers 		: 0,
				}
				bot.punter = new Array();

				june.SteamTrade.sessionID = sessionID;

				june.stdin.addListener("data", function(d) {
					june.loadModule('../lib/botSTDIN').listenConsole(d,june);
				});

				bot.botStats.webSessionID = sessionID;

				bot.webLogOn(function(cookies){
					cookies.split(';').forEach(function(cookie){
						june.SteamTrade.setCookie(cookie);
					})
					//console.log(june.SteamTrade);
					console.log(june.colour.green+'[June]'+june.colour.reset+' Bot initialised and ready to go.');

					bot.joinChat(bot.steamChatRoomID);
					bot.setPersonaState(june.Steam.EPersonaState.Online); // to display your bot's status as "Online"
				})
			})
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
		process.on('uncaughtException',function(error){
			console.log(june.colour.red+"[ERROR]"+june.colour.reset+" shit fucked up somewhere.");
		})
		connection.on('error',function(err){
			databaseHandle = june.loadModule('../lib/database').errorHandle(err,june);
		})
	}
});
