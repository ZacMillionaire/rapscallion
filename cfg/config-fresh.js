/*

	Database Config
		Should be fairly obvious, if you're testing on a local machine, with an AMP stack, so XAMPP
		on windows for example, use what you'd normally use for a database connection, eg:

			host : 'localhost',
			user : 'root',
			password : '',
			database : 'chatBotDatabase'

		The set up is the same if you want to remotely connect to a database, but that
		depends on if your remote host allows it. Any quirks that host has such as database
		username/table prefixes and connection methods is up to you to resolve through your
		host's support channels.

		In addition to this, you'll either need to use the database structure provided in the .sql
		file, or rewrite the queries in the main 
		
*/
var dbCred = {
	host     : '',
	user     : '',
	password : '',
	database : ''
};
/*
	
	Steam Account Config
		Again, fairly obvious, the details below are whatever your bot uses to login.

		A few gotcha's here though:

			- Your bot's Steam account should have steamguard DISABLED
			- Your bot will also need to have a game gifted to it and accepted before it will be
			  able to join chat rooms
		
*/
var steamAccount = {
	username : '',
	password : ''
};
exports.database = dbCred;
exports.steam = steamAccount;