exports.pullmessage = function(june){

	var bot = june.bot;
	var connection = june.connection;

	dottxtArray = ["FIMFiction_TXT","Reddit_txt","okcupid_TXT","TumblrTXT","Goons_TXT","mlp_txt","fanfiction_txt","FreeRepublicTXT","charliesheen"];

	june.Twitter.get('statuses/user_timeline', { screen_name: dottxtArray[(Math.floor(Math.random()*dottxtArray.length))], count: 100, lang: 'en', include_entities: false }, function(err, reply) {
		reply = reply[(Math.floor(Math.random()*100))]
		bot.sendMessage(bot.steamChatRoomID,reply.text);
		bot.sendMessage("76561197993698595","@"+reply.user.screen_name+": "+(reply.text));

		wordCount = reply.text.match(/\S+/gi).length;
		june.connection.query("INSERT INTO `logs` (`timestamp`,`steamID`,`chatMessage`,`wordCount`,`linkCount`,`emptyQuoteCount`,`type`) VALUES (NOW(),"+bot.steamID+",'"+june.connection.escape(reply.text)+"',"+wordCount+",0,0,'grpmsg')", function(err, rows, fields) {
				if(!err) {
					bot.botStats.messagesLogged++;
					console.log(june.colour.green+"[LOGGED]"+june.colour.reset+" Twitter pulled from: @"+reply.user.screen_name);
					console.log(june.colour.green+"[LOGGED]"+june.colour.reset+" Self: "+reply.text);
				} else {
					throw err
				}
			}
		)
		return
		june.fs.writeFile("data/twitter.txt", JSON.stringify(reply,null,4), function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log("dumped twitter");
			}
		}); 
	})
};