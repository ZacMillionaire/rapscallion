var Steam		=	require('steam');
var SteamTrade  =	require('steam-trade');
var SteamTrade  =	new SteamTrade();
var mysql		=	require('mysql');
var fs			=	require('fs');
var cfg			=	require('./config');
var bot			=	new Steam.SteamClient();
var stdin		=	process.openStdin();
var util 		= 	require('util');
var Twitter 	= 	require('twit');
var Twitter 	= new Twitter({
						consumer_key: 'WuCRqKmeWJcNR2TAhQg',
						consumer_secret: 'i1u6doFqW1ddCaFglrnhhU8vKPgQRPepgUsrejlsZBE',
						access_token: '179030882-Zh7fKnzvn8wkSFdyM7yDpkELMRth3IpBr2GurrmS',
						access_token_secret: 'NBifKsbrcNK48GFqyYh19HX5c2kEBLmeXOw8yKO8'
					});

bot.steamChatRoomID = '103582791429601458'; // remember to pass this into the bots config at some point

var colours = {
	reset : "\033[0m",
	red : "\033[31m",
	green : "\033[32m",
	yellow : "\033[33m",
	blue : "\033[34m",
	magenta : "\033[35m",
	cyan : "\033[36m",
	white : "\033[37m",
}

exports.Steam = Steam;
exports.SteamTrade = SteamTrade;
exports.mysql = mysql;
exports.fs = fs;
exports.cfg = cfg;
exports.stdin = stdin;
exports.colour = colours;
exports.bot = bot;
exports.Twitter = Twitter;
exports.util = util;

exports.loadModule = function(module){
    delete require.cache[require.resolve(module)]
    return require(module)
}