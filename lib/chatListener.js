exports.listenToChat = function(message,chatterID,type,chatRoomID,june){

	var bot = june.bot;
	var connection = june.connection;

	var chatter = chatterID;
	var message = message.toString('utf8');

	geturl = new RegExp("(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))","g");
	linkCount = 0;
	urlList = message.match(geturl);
	if(urlList){
		linkCount = urlList.length;
		console.log(june.colour.green+"[RESPONSE]"+june.colour.reset+" That message had one or more links.");
		console.log(june.colour.cyan+"[LINKS] "+june.colour.reset+"I counted "+linkCount);
		for (var i = 0; i < linkCount; i++) {
			insertURL = urlList[i];
			connection.query("INSERT INTO `links` (`timestamp`,`steamID`,`linkURL`) VALUES (NOW(),"+chatter+","+connection.escape(insertURL)+")", function(err, rows, fields) {
				if(!err) {
					bot.botStats.linksLogged++;
					console.log(june.colour.green+"[LOGGED]"+june.colour.reset+" Found and logged a link from: "+chatter);
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
			console.log(june.colour.cyan+"[MATCHES] "+june.colour.reset+" "+emptyQuoteCount+" empty quotes that message.");
			bot.botStats.emptyQuotes = emptyQuoteCount+bot.botStats.emptyQuotes;
		}
		emptyQuoteRoll = Math.floor(Math.random()*101)
		if(emptyQuoteRoll>=80){
			console.log(june.colour.magenta+"[EMPTY QUOTE]"+june.colour.reset+" rolled "+emptyQuoteRoll);
			bot.sendMessage(chatRoomID,"^");
			bot.botStats.selfEmptyQuotes++;
			connection.query("INSERT INTO `logs` (`timestamp`,`steamID`,`chatMessage`,`wordCount`,`linkCount`,`emptyQuoteCount`,`type`) VALUES (NOW(),"+bot.steamID+",'^',0,0,1,'grpmsg')", function(err, rows, fields) {
				if(!err) {
					console.log(june.colour.green+"[LOGGED]"+june.colour.reset+" Logged an empty quote from myself");
				} else {
					console.log(june.colour.red+"[ERROR]"+june.colour.reset+" shit fucked up somewhere. chatListener.js Line 56 "+err);
					//throw err
				}
			});
		} else {
			console.log(june.colour.magenta+"[EMPTY QUOTE]"+june.colour.reset+" rolled "+emptyQuoteRoll);
		}
		connection.query("INSERT INTO `logs` (`timestamp`,`steamID`,`chatMessage`,`wordCount`,`linkCount`,`emptyQuoteCount`,`type`) VALUES (NOW(),"+chatter+","+connection.escape(message)+","+wordCount+","+linkCount+","+emptyQuoteCount+",'grpmsg')", function(err, rows, fields) {
			if(!err) {
				bot.botStats.messagesLogged++;
				console.log(june.colour.green+"[LOGGED]"+june.colour.reset+" "+chatter+": "+message);
			} else {
				console.log(red+"[ERROR]"+june.colour.reset+" shit fucked up somewhere. chatListener.js Line 68 "+err);
				//throw err
			}
		});
	} else {
		connection.query("INSERT INTO `logs` (`timestamp`,`steamID`,`chatMessage`,`wordCount`,`linkCount`,`emptyQuoteCount`,`type`) VALUES (NOW(),"+chatter+","+connection.escape(message)+","+wordCount+","+linkCount+","+emptyQuoteCount+",'grpmsg')", function(err, rows, fields) {
			if(!err) {
				bot.botStats.messagesLogged++;
				console.log(june.colour.green+"[LOGGED]"+june.colour.reset+" "+chatter+": "+message);
			} else {
				console.log(red+"[ERROR]"+june.colour.reset+" shit fucked up somewhere. chatListener.js Line 68 "+err);
				//throw err
			}
		});
	}
	if(message=="!chatstats"||message=="!stats") {
		timeNow = new Date();
		botUptime = (timeNow.getTime()/1000)-bot.botStats.botBirth;
		botLife = Math.round(botUptime/60);

		console.log(june.colour.yellow+"[REQUEST] "+june.colour.reset+" "+chatterID+": "+message);
		bot.botStats.validCommandRequests++;
		bot.sendMessage(chatterID,"I've got stats for chats, I've:\n...logged "+bot.botStats.messagesLogged+" lines of chat\n...saved "+bot.botStats.linksLogged+" links\n...had "+(bot.botStats.validCommandRequests+bot.botStats.invalidCommandRequests)+" total requests, "+bot.botStats.validCommandRequests+" that were actually valid\n..."+bot.botStats.emptyQuotes+" empty quotes\n...and Brae has been kicked "+bot.botStats.braesKicked+" times in the "+botLife+" minutes I've been alive for.");
	}
	if(message=="!mystats") {
		console.log(june.colour.yellow+"[REQUEST] "+june.colour.reset+" "+chatterID+": "+message);
		bot.botStats.validCommandRequests++;
		bot.sendMessage(chatterID,"http://www.jotunga.com/ausgoons/userStats.php?sid="+chatterID);
	}
	if((/haha|aha|lol|lmao/gi).test(message)) {
		laughRoll = Math.floor(Math.random()*101)
		console.log(june.colour.magenta+"[Laugh]"+june.colour.reset+" rolled "+laughRoll);
		var responses = ["( ￣ ▽ ￣ )ノ Ｄｏｈｏｈｏｈｏｈｏ～",""];
		if(laughRoll>=70){
			bot.sendMessage(chatRoomID,"( ￣ ▽ ￣ )ノ Ｄｏｈｏｈｏｈｏｈｏ～");
			connection.query("INSERT INTO `logs` (`timestamp`,`steamID`,`chatMessage`,`wordCount`,`linkCount`,`emptyQuoteCount`,`type`) VALUES (NOW(),"+bot.steamID+",'( ￣ ▽ ￣ )ノ Ｄｏｈｏｈｏｈｏｈｏ～',0,0,0,'grpmsg')", function(err, rows, fields) {
				if(!err) {
					console.log(june.colour.green+"[LOGGED]"+june.colour.reset+" Logged myself laughing");
				} else {
					console.log(june.colour.red+"[ERROR]"+june.colour.reset+" shit fucked up somewhere. chatListener.js Line 56 "+err);
					//throw err
				}
			});
		}
	}
	if((/\byou\b|\bme\b/gi).test(message)){
		if(chatter!=bot.steamID){
			ouroll = Math.floor(Math.random()*101);
			console.log(june.colour.magenta+"[O U]"+june.colour.reset+" rolled "+ouroll);
			if(ouroll>=90) {
				bot.sendMessage(chatRoomID,"(☞ﾟ∀ﾟ)☞ Ｏ Ｕ");
				connection.query("INSERT INTO `logs` (`timestamp`,`steamID`,`chatMessage`,`wordCount`,`linkCount`,`emptyQuoteCount`,`type`) VALUES (NOW(),"+bot.steamID+",'(☞ﾟ∀ﾟ)☞ Ｏ Ｕ',0,0,0,'grpmsg')", function(err, rows, fields) {
					if(!err) {
						console.log(june.colour.green+"[LOGGED]"+june.colour.reset+" Logged myself youing");
					} else {
						console.log(june.colour.red+"[ERROR]"+june.colour.reset+" shit fucked up somewhere. chatListener.js Line 56 "+err);
						//throw err
					}
				});
			}
		}
	}
	if(message=="!roulette") {
		console.log(june.colour.cyan+"[SPIN THE WHEEL] "+june.colour.reset+chatterID);
		spinTheWheel = Math.floor(Math.random()*101);
		if(spinTheWheel>=80) {
			console.log(june.colour.green+"[SPUN THE WHEEL] "+june.colour.reset+chatterID+" rolled "+spinTheWheel);
			bot.botStats.losers++;
			bot.sendMessage(chatRoomID,"(☞ﾟ∀ﾟ)☞ You lost!");
			bot.sendMessage(chatterID,"(☞ﾟ∀ﾟ)☞ You lost!");
			bot.kick(chatRoomID, chatterID);
		} else {
			console.log(june.colour.red+"[SPUN THE WHEEL] "+june.colour.reset+chatterID+" rolled "+spinTheWheel);
			bot.sendMessage(chatRoomID,"*click*");
			bot.botStats.winners++;
		}
	}
};
