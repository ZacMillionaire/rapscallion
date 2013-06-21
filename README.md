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
	- You'll also need to gift a game to this account in order to allow it to join chat rooms.
		- This is something Steam has in place, so there's no getting around it. (see [This support article](https://support.steampowered.com/kb_article.php?ref=3330-IAGK-7663) for exact details)

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

##Betting

For this feature to work, your bot MUST HAVE STEAM GUARD ENABLED FOR AT LEAST 15 DAYS IF YOU WANT TO BE ABLE TO BET ITEMS.

As per the guidelines set by Steam:

>‌###I can't trade! Why not?

>There are a few different reasons why you may be unable to trade. The reason is typically shown to you when you try to initiate a trade.
>We require Steam Guard to be enabled for 15 days to help protect your items and Steam Wallet funds from being misused by somebody who may have illicitly obtained your password. If you have not had Steam Guard enabled for 15 days, you will be unable to trade. Accounts that currently have Steam Guard disabled will be unable to trade.
>If you reset your password, you will be restricted from trading for 5 days. If your account has not had any activity for more than 2 months, you will be restricted from trading for 30 days. We do this to help protect users who lose access to their email account. Note that this does not affect password changes, only password resets.
>You also may be unable to trade if your account has been banned from trading by Steam Support for violating the Steam Subscriber Agreement. Bans may be temporary. Permanent bans can only be removed by Steam Support.


##Closing

That's about it. The code is terrible for now and sparsly commented. Though its fairly self explanitory if you have used node.js before or have a decent understanding in javascript.

I'll make it more reader friendly once the features are leveled.