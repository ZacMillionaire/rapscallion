exports.listenConsole = function(message,june) {

		var bot = june.bot;

		var consoleInput = message.toString();
		if((/!snooze/).test(consoleInput)) {
			bot.setPersonaState(june.Steam.EPersonaState.Snooze); // to display your bot's status as "Snooze"
		} else if((/!online/).test(consoleInput)) {
			bot.setPersonaState(june.Steam.EPersonaState.Online); // to display your bot's status as "Online"
		} else if((/!away/).test(consoleInput)) {
			bot.setPersonaState(june.Steam.EPersonaState.Away); // to display your bot's status as "Away"
		} else {
			bot.sendMessage(june.bot.steamChatRoomID,consoleInput);
			listener = june.loadModule('../lib/chatListener').listenToChat(consoleInput,bot.steamID,'grpmsg',june.bot.steamChatRoomID,june);
		}

}