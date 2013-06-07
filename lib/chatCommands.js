var reset = "\033[0m";
var red = "\033[31m";
var green = "\033[32m";
var yellow = "\033[33m";
var blue = "\033[34m";
var magenta = "\033[35m";
var cyan = "\033[36m";
var white = "\033[37m";

exports.getActiveCommand = function passData(message,chatterID,BotInstance,connection){

	var bot = BotInstance;

	console.log(yellow+"[REQUEST] "+reset+" "+chatterID+": "+message);
	connection.query("INSERT INTO `logs` (`steamID`,`timestamp`,`chatMessage`,`type`) VALUES ("+chatterID+",NOW(),"+connection.escape(message)+",'frndmsg')", function(err, rows, fields) {
		if(!err) {
			console.log(green+"  [LOGGED]"+reset+" request from: "+chatterID);
		} else {
			throw err
		}
	});

	timeNow = new Date();
	botUptime = (timeNow.getTime()/1000)-bot.botStats.botBirth;
	botLife = Math.round(botUptime/60);

	if(message=="!commands") {
		bot.botStats.validCommandRequests++;
		bot.sendMessage(chatterID,"Hi, you can use the following commands in and around my mouth: !uptime, !chatstats.");
	} else if(message=="!uptime") {
		bot.botStats.validCommandRequests++;
		bot.sendMessage(chatterID,"I've been alive for "+botLife+" minutes so far.");
	} else if(message=="!chatstats") {
		bot.botStats.validCommandRequests++;
		bot.sendMessage(chatterID,"I've got stats for chats, I've:\n...logged "+bot.botStats.messagesLogged+" lines of chat\n...saved "+bot.botStats.linksLogged+" links\n...had "+(bot.botStats.validCommandRequests+bot.botStats.invalidCommandRequests)+" total requests, "+bot.botStats.validCommandRequests+" that were actually valid\n..."+bot.botStats.emptyQuotes+" empty quotes\n...and Brae has been kicked "+bot.botStats.braesKicked+" times in the "+botLife+" minutes I've been alive for.");
	} else {
		bot.botStats.invalidCommandRequests++;
		bot.sendMessage(chatterID,message+" wasn't a valid command.\nYou can use the following commands in and around my mouth: !uptime, !chatstats.");
	}
};
// Only used in passive mode for testing, doesn't log to database
exports.getPassiveCommand = function passData(message,chatterID,BotInstance,connection){

	var bot = BotInstance;
	var source = chatterID;

	timeNow = new Date();
	botUptime = (timeNow.getTime()/1000)-bot.botStats.botBirth;
	botLife = Math.round(botUptime/60);
	if(message=="!commands") {
		bot.botStats.validCommandRequests++;
		bot.sendMessage(source,"Hi, you can use the following commands in and around my mouth: !uptime, !chatstats.");
	} else if(message=="!uptime") {
		bot.botStats.validCommandRequests++;
		bot.sendMessage(source,"I've been alive for "+botLife+" minutes so far.");
	} else if(message=="!chatstats") {
		bot.botStats.validCommandRequests++;
		bot.sendMessage(source,"I've got stats for chats, I've:\n...logged "+bot.botStats.messagesLogged+" lines of chat\n...saved "+bot.botStats.linksLogged+" links\n...had "+(bot.botStats.validCommandRequests+bot.botStats.invalidCommandRequests)+" total requests, "+bot.botStats.validCommandRequests+" that were actually valid\n...and Brae has been kicked "+bot.botStats.braesKicked+" times in the "+botLife+" minutes I've been alive for.");
	} else {
		bot.botStats.invalidCommandRequests++;
		bot.sendMessage(source,message+" wasn't a valid command.\nYou can use the following commands in and around my mouth: !uptime, !chatstats.");
	}
	isEmptyQuote = (/\^+/gi).test(message);
	if(isEmptyQuote) {
		emptyQuoteCount = message.match(/\^/gi).length;
		if(emptyQuoteCount>0) {
			console.log(cyan+"[MATCHES] "+reset+" "+emptyQuoteCount+" empty quotes that message.");
			bot.botStats.emptyQuotes = emptyQuoteCount+bot.botStats.emptyQuotes;
		}
	}
};
