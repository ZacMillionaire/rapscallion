var reset = "\033[0m";
var red = "\033[31m";
var green = "\033[32m";
var yellow = "\033[33m";
var blue = "\033[34m";
var magenta = "\033[35m";
var cyan = "\033[36m";
var white = "\033[37m";

exports.listenToChat = function listenToChat(message,chatterID,type,BotInstance,connection,chatRoomID){

	var bot = BotInstance;
	var chatter = chatterID;

	geturl = new RegExp("(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))","g");
	linkCount = 0;
	urlList = message.match(geturl);
	if(urlList){
		linkCount = urlList.length;
		console.log(green+"[RESPONSE]"+reset+" That message had one or more links.");
		console.log(cyan+"  [LINKS] "+reset+"I counted "+linkCount);
		for (var i = 0; i < linkCount; i++) {
			insertURL = urlList[i];
			connection.query("INSERT INTO `links` (`timestamp`,`steamID`,`linkURL`) VALUES (NOW(),"+chatter+","+connection.escape(insertURL)+")", function(err, rows, fields) {
				if(!err) {
					bot.botStats.linksLogged++;
					console.log(green+"  [LOGGED]"+reset+" Found and logged a link from: "+chatter);
				} else {
					throw err
				}
			});
		}
	}
	wordCount = message.match(/\S+/gi).length;
	wordCount = wordCount-linkCount;
	emptyQuoteCount = 0;
	isEmptyQuote = (/\^+/gi).test(message);
	if(isEmptyQuote) {
		emptyQuoteCount = message.match(/\^/gi).length;
		if(emptyQuoteCount>0) {
			console.log(cyan+"[MATCHES] "+reset+" "+emptyQuoteCount+" empty quotes that message.");
			bot.botStats.emptyQuotes = emptyQuoteCount+bot.botStats.emptyQuotes;
		}
		emptyQuoteRoll = Math.floor(Math.random()*101)
		if(emptyQuoteRoll>80){
			console.log(magenta+"[EMPTY QUOTE]"+reset+" rolled "+emptyQuoteRoll);
			bot.sendMessage(chatRoomID,"^");
			bot.botStats.selfEmptyQuotes++;
			connection.query("INSERT INTO `logs` (`timestamp`,`steamID`,`chatMessage`,`wordCount`,`linkCount`,`emptyQuoteCount`,`type`) VALUES (NOW(),"+bot.steamID+","+connection.escape(botMessage)+",0,0,1'grpmsg')", function(err, rows, fields) {
				if(!err) {
					console.log(green+"[LOGGED]"+reset+" Logged an empty quote from myself");
				} else {
					throw err
				}
			});
		} else {
			console.log(magenta+"[EMPTY QUOTE]"+reset+" rolled "+emptyQuoteRoll);
		}
	}
	connection.query("INSERT INTO `logs` (`timestamp`,`steamID`,`chatMessage`,`wordCount`,`linkCount`,`emptyQuoteCount`,`type`) VALUES (NOW(),"+chatter+","+connection.escape(message)+","+wordCount+","+linkCount+","+emptyQuoteCount+",'grpmsg')", function(err, rows, fields) {
		if(!err) {
			bot.botStats.messagesLogged++;
			console.log(green+"[LOGGED]"+reset+" "+chatter+": "+message);
		} else {
			throw err
		}
	});

};
