#Node.js Steam Chat Bot

A work in progress steam chat bot using node.js.

For this to work, the following dependancies are needed:

- [node-steam](https://github.com/seishun/node-steam)
	- [Which in turn requires usra](https://github.com/Obvious/ursa)
- [node-mysql](https://github.com/felixge/node-mysql)
	- This bot relies on having a connection to a database
		- either locally hosted on the machine you run node.js from (So literally your desktop PC or the server hosting your node.js server)
		- Or if you want to run the bot from your desktop PC and connect to a remote database somewhere, you can do that as well. It's up to you to ensure you can handle this, you're responsible for obtaining support from your hosts support channels if you don't know how to remotely connect/set up a database connection.

Non-node.js dependancies are:

- A new steam account to be used as a bot.
	- This account will need to have steamGuard disabled
	- You'll also need to gift a game to this account or select a free one from the store in order to allow it to join chat rooms.
		- This is something Steam has in place, so there's no getting around it.

You'll also need to create an empty database, then import the sql into that database, then within the cfg/config.js file, set the database and steam account details accordingly and all should be set.
I've not tested this part so let me know if anything goes wrong.

That's about it. The code is terrible for now and sparsly commented. Though its fairly self explanitory if you have used node.js before or have a decent understanding.

I'll make it more friendly once the features are leveled.