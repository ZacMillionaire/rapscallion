exports.listenConsole = function(message,june) {

		var bot = june.bot;

		var consoleInput = message.toString();
		if((/!snooze/).test(consoleInput)) {
			console.log(cyan+"[PERSONA]"+reset+" bot is now snoozing");
			bot.setPersonaState(june.Steam.EPersonaState.Snooze); // to display your bot's status as "Snooze"
		} else if((/!online/).test(consoleInput)) {
			console.log(cyan+"[PERSONA]"+reset+" bot is now online");
			bot.setPersonaState(june.Steam.EPersonaState.Online); // to display your bot's status as "Online"
		} else if((/!away/).test(consoleInput)) {
			console.log(cyan+"[PERSONA]"+reset+" bot is now away");
			bot.setPersonaState(june.Steam.EPersonaState.Away); // to display your bot's status as "Away"
		} else if((/!db/).test(consoleInput)) {
			if(june.connection.state) {
				databaseHandle = june.loadModule('../lib/database').reconnect(june);
			}
		} else {
			bot.sendMessage(june.bot.steamChatRoomID,consoleInput);
			listener = june.loadModule('../lib/chatListener').listenToChat(consoleInput,bot.steamID,'grpmsg',june.bot.steamChatRoomID,june);
		}
}