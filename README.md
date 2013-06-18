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

##Chat Commands

!chatstats

Displays rough stats logged.

!mystats

Sends a stat link to the requesting user

!roulette

Spins the wheel and kicks the winning user

!superroulette

Spins the wheel and bans the winning user.

The above roulette commands require the bot to have a higher rank than those you wish to have affected.
Steam uses a simple permission system currently, and the highest rank wins out.

Group owner -> Officer -> Moderator -> User

For the best result, the bot should have Officer status and everyone else at Moderator below. Or give the bot just Moderator priviledges if you only want it to affect regular users.
Nothing with happen if the bot cannot kick or ban a 'winner' aside from sending a message to them and the group chat window.

##Closing

That's about it. The code is terrible for now and sparsly commented. Though its fairly self explanitory if you have used node.js before or have a decent understanding in javascript.

I'll make it more reader friendly once the features are leveled.