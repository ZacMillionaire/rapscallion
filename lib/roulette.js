function playRoulette(bot,chatterID,chatRoomID,message,june) {
	if(message=="!huehue") {
		var chatRoomUserList = june.bot.chatRooms[chatRoomID];
		for(key in chatRoomUserList) {
			if(key!=bot.steamID) {
				bot.kick(chatRoomID, key);
			}
		}
	}
	if(message=="!roulette") {
		console.log(june.colour.cyan+"[SPIN THE WHEEL] "+june.colour.reset+chatterID);
		spinTheWheel = Math.floor(Math.random()*101);
		if(spinTheWheel>=84) {
			console.log(june.colour.green+"[SPUN THE WHEEL] "+june.colour.reset+chatterID+" rolled "+spinTheWheel);
			bot.botStats.losers++;
			bot.sendMessage(chatRoomID,"IT'S TIME FOR A KIIIIIIICK-SPLOSION!");
			bot.sendMessage(chatterID,"IF YOU DON'T COME BACK, IMMA BE PISSED!");
			// bot.sendMessage(chatRoomID,"(☞ﾟ∀ﾟ)☞ You lost!");
			// bot.sendMessage(chatterID,"(☞ﾟ∀ﾟ)☞ You lost!");
			bot.kick(chatRoomID, chatterID);
		} else {
			console.log(june.colour.red+"[SPUN THE WHEEL] "+june.colour.reset+chatterID+" rolled "+spinTheWheel);
			bot.sendMessage(chatRoomID,"--BOOOOOOOOORING!");
			bot.botStats.winners++;
		}
	}
	if(message=="!superroulette") {
		console.log(june.colour.cyan+"[SPIN THE WHEEL] "+june.colour.reset+chatterID);
		spinTheWheel = Math.floor(Math.random()*101);
		if(spinTheWheel>=84&&spinTheWheel<=97) {
			console.log(june.colour.green+"[SPUN THE WHEEL] "+june.colour.reset+chatterID+" rolled "+spinTheWheel);
			bot.botStats.losers++;
			bot.sendMessage(chatRoomID,"TESTOSTERONE!");
			// bot.sendMessage(chatRoomID,"(☞ﾟ∀ﾟ)☞ You super lost!");
			bot.sendMessage(chatterID,"IF YOU DON'T COME BACK, IMMA BE PISSED! (That means you're banned. (unban yourself by sending me !unban))");
			// bot.sendMessage(chatterID,"(☞ﾟ∀ﾟ)☞ You super lost! (That means you're banned. (lol (unban yourself by sending me !unban)))");
			bot.ban(chatRoomID, chatterID);
		} else if(spinTheWheel>=98) {
			// var chatRoomUserList = june.bot.chatRooms[chatRoomID];
			// for(key in chatRoomUserList) {
			// 	if(key!=bot.steamID) {
			// 		if(spinTheWheel==100){
			// 			bot.sendMessage(key,"Mutually assured super destruction. (ﾉゝ∀･)~Everyone loses♥ (Send !unban to me undo the damage done)");
			// 			bot.ban(chatRoomID, key);
			// 		} else {
			// 			bot.sendMessage(key,"IT'S TIME FOR A LOOOOOT-SPLOSION!");
			// 			bot.sendMessage(key,"Mutually assured destruction. (ﾉゝ∀･)~Everyone loses♥");
			// 			bot.kick(chatRoomID, key);
			// 		}
			// 		console.log(key+" was kicked");
			// 	}
			// }
		} else {
			console.log(june.colour.red+"[SPUN THE WHEEL] "+june.colour.reset+chatterID+" rolled "+spinTheWheel);
			if(spinTheWheel>90) {
				bot.sendMessage(chatRoomID,"\\(;ºдº)/ Careful man, you'll kill us all!");
			} else {
				bot.sendMessage(chatRoomID,"( ￣ ω ￣ ) Not even close!");
			}
			bot.botStats.winners++;
		}
	}
	if(message=="!braelette") {
		console.log(june.colour.cyan+"[SPIN THE WHEEL] "+june.colour.reset+chatterID);
		spinTheWheel = Math.floor(Math.random()*101);
		if(spinTheWheel>=84) {
			console.log(june.colour.green+"[SPUN THE WHEEL] "+june.colour.reset+chatterID+" rolled "+spinTheWheel);
			bot.botStats.losers++;
			if(spinTheWheel>=95) {
				bot.sendMessage(chatRoomID,"We here at the Torgue Corporation sincerely think that this is F*CKING AWESOME!!");
				// bot.sendMessage(chatRoomID,"ｷﾀ━━━━━━(ﾟ∀ﾟ)━━━━━━!!!!!");
				// bot.sendMessage(chatRoomID,"(☞ﾟ∀ﾟ)☞ Get the fuck out!");
				bot.ban(chatRoomID,'76561197994626023');
				bot.botStats.braesBanned++;
			} else if(spinTheWheel==100) {
				bot.sendMessage(chatRoomID,"MOTHERF*CKING' SEE YA!");
				// bot.sendMessage(chatRoomID,"ｷﾀ━━━━━━(ﾟ∀ﾟ)━━━━━━!!!!!");
				// bot.sendMessage(chatRoomID,"SUPER WINNER!");
				bot.ban(chatRoomID,'76561197994626023');
				bot.ban(chatRoomID,chatterID);
				bot.botStats.braesBanned++;
			} else {
				bot.sendMessage(chatRoomID,"IF YOU DON'T COME BACK, IMMA BE PISSED!");
				// bot.sendMessage(chatRoomID,"(☞ﾟ∀ﾟ)☞ WINNER!");
				bot.kick(chatRoomID,'76561197994626023');
				bot.botStats.braesKicked++;
			}
		} else {
			console.log(june.colour.red+"[SPUN THE WHEEL] "+june.colour.reset+chatterID+" rolled "+spinTheWheel);
			if(spinTheWheel<=10) {
				bot.sendMessage(chatRoomID,"IS IT JUST ME OR DOES IT SEEM LIKE HE'S GONNA BETRAY THE F*CK OUTTA YOU!?");
				// bot.sendMessage(chatRoomID,"THE FREE MARKET CLAIMS ANOTHER VICTIM");
				// bot.sendMessage(chatRoomID,"REVERSAL OF FORTUNE! ☜(ﾟ∀ﾟ☜)");
				bot.sendMessage(chatterID,"IF YOU DON'T COME BACK, IMMA BE PISSED! (You can unban yourself by sending me !unban)");
				bot.ban(chatRoomID,chatterID);
				if(chatterID=='76561197994626023') {
					bot.botStats.braesBanned++;
				}
			} else {
				bot.sendMessage(chatRoomID,"--BOOOOOOOOORING!");
				bot.botStats.braeFails++;
			}
		}
	}
	if(message=="!clotlette"||message=="!cuntlette") {
		spinTheWheel = Math.floor(Math.random()*101);
		console.log(june.colour.cyan+"[SPIN THE WHEEL] "+june.colour.reset+chatterID+" rolled "+spinTheWheel);
		if(spinTheWheel>=85) {
			bot.sendMessage(chatRoomID,"Got what he deserved.");
			bot.sendMessage('76561197996060383',"You probably deserved this.");
			bot.kick(chatRoomID,'76561197996060383');
		}
	}
	if(message=="!skeeplette") {
		spinTheWheel = Math.floor(Math.random()*101);
		console.log(june.colour.cyan+"[SPIN THE WHEEL] "+june.colour.reset+chatterID+" rolled "+spinTheWheel);
		if(spinTheWheel>=85) {
			bot.sendMessage(chatRoomID,"Case closed.");
			bot.sendMessage('76561197978502877',"Case closed.");
			bot.kick(chatRoomID,'76561197978502877');
		}
	}
	if(message=="!oryxlette") {
		spinTheWheel = Math.floor(Math.random()*101);
		console.log(june.colour.cyan+"[SPIN THE WHEEL] "+june.colour.reset+chatterID+" rolled "+spinTheWheel);
		if(spinTheWheel>=90) {
			bot.sendMessage(chatRoomID,"You monsters.");
			bot.sendMessage('76561197998309658',"They made me do it :( :( :(");
			bot.kick(chatRoomID,'76561197998309658');
		}
	}
	if(message=="!plotlette") {
		spinTheWheel = Math.floor(Math.random()*101);
		console.log(june.colour.cyan+"[SPIN THE WHEEL] "+june.colour.reset+chatterID+" rolled "+spinTheWheel);
		if(spinTheWheel>=85) {
			bot.sendMessage(chatRoomID,"hahahahahahahahaha if he had a star this wouldn't have happened! The irony is having a star still wouldn't have saved him.");
			bot.sendMessage('76561197981164621',"hahahahahahahahaha if you had a star this wouldn't have happened! The irony is having a star still wouldn't have saved you.");
			bot.kick(chatRoomID,'76561197981164621');
		}
	}
	if(message=="!rendlette") {
		spinTheWheel = Math.floor(Math.random()*101);
		console.log(june.colour.cyan+"[SPIN THE WHEEL] "+june.colour.reset+chatterID+" rolled "+spinTheWheel);
		if(spinTheWheel>=85) {
			bot.sendMessage(chatRoomID,"TILT! TILT! TILT!");
			bot.sendMessage('76561197961720399',"TILT!");
			bot.kick(chatRoomID,'76561197961720399');
		}
	}
	if(message=="!wafflette"||message=="!squawklette") {
		spinTheWheel = Math.floor(Math.random()*101);
		console.log(june.colour.cyan+"[SPIN THE WHEEL] "+june.colour.reset+chatterID+" rolled "+spinTheWheel);
		if(spinTheWheel>=85) {
			bot.sendMessage(chatRoomID,"SQUAWK! SQUAWK! SQUAWK! SQUAWK! SQUAWK! SQUAWK! 6 SQUARKS OF THE PARROT KING CALLS FOR YOUR END.");
			bot.sendMessage('76561197984815967',"SQUAWK! SQUAWK! SQUAWK! SQUAWK! SQUAWK! SQUAWK! 6 SQUARKS OF THE PARROT KING CALLS FOR YOUR END.");
			bot.kick(chatRoomID,'76561197984815967');
		}
	}
	if(message=="!bertlette"||message=="!sportlette"||message=="!HATS"||message=="!hatlette") {
		spinTheWheel = Math.floor(Math.random()*101);
		console.log(june.colour.cyan+"[SPIN THE WHEEL] "+june.colour.reset+chatterID+" rolled "+spinTheWheel);
		if(spinTheWheel>=85) {
			bot.sendMessage(chatRoomID,"SPORTS! YOU'LL BE GOOD AT THEM!");
			bot.sendMessage('76561197977352818',"You got sported son.");
			bot.kick(chatRoomID,'76561197977352818');
		}
	}
	if(message=="!beanlette") {
		spinTheWheel = Math.floor(Math.random()*101);
		console.log(june.colour.cyan+"[SPIN THE WHEEL] "+june.colour.reset+chatterID+" rolled "+spinTheWheel);
		if(spinTheWheel>=85) {
			bot.sendMessage(chatRoomID,"One less kiwi in chat.");
			bot.sendMessage('76561197984269313',"One less kiwi in chat.");
			bot.kick(chatRoomID,'76561197984269313');
		}
	}
	if(message=="!antilette") {
		spinTheWheel = Math.floor(Math.random()*101);
		console.log(june.colour.cyan+"[SPIN THE WHEEL] "+june.colour.reset+chatterID+" rolled "+spinTheWheel);
		if(spinTheWheel>=85) {
			bot.sendMessage(chatRoomID,"You blocked me so I ended you.");
			bot.sendMessage('76561197979093805',"You blocked me so I ended you.");
			bot.kick(chatRoomID,'76561197979093805');
		}
	}
	if(message=="!omelette") {
		bot.sendMessage(chatRoomID,"{{{OMELETTE DELIVERY SYSTEM COMING SOON}}}");
	}
}
exports.roulette = function(playerID,message,june){
	var bot = june.bot;
	var chatterID = playerID;
	var chatRoomID = bot.steamChatRoomID;
	var rightnow = new Date();
	if((/![a-zA-Z]/gi).test(message)) {
		if(typeof bot.botStats[chatterID] == "undefined") {
			bot.botStats[chatterID] = {
				lastRequest : rightnow.getTime()/1000
			}
			playRoulette(bot,chatterID,chatRoomID,message,june);
		} else {
			timeElapsed = (rightnow/1000)-bot.botStats[chatterID].lastRequest;
			if(timeElapsed>=30) {
				bot.botStats[chatterID] = {
					lastRequest : rightnow.getTime()/1000
				}
				playRoulette(bot,chatterID,chatRoomID,message,june);
			} else {
				console.log(timeElapsed+" seconds ago");
			}
		}
	}
}