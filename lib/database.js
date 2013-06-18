exports.errorHandle = function(error,june) {
	console.log(june.colour.red+"[June]"+june.colour.reset+" Lost connection to database! "+error);
	this.reconnect(june);
	//if(error.state)
	//june.connection = june.mysql.createConnection(june.cfg.dbInfo);
};
exports.reconnect = function(june) {
	june.connection = june.mysql.createConnection(june.cfg.dbInfo);

	june.connection.connect(function(err) {
		if(err) {
			if(err.code=="ECONNREFUSED") {
				console.log(june.colour.red+"[June]"+june.colour.reset+" Connection refused, database server most likely offline.");
			} else {
				console.log(june.colour.red+"[June]"+june.colour.reset+" Connection failed! "+err);
			}
		} else {
			console.log(june.colour.green+"[June]"+june.colour.reset+" Reconnected and ready to go.");
		}
	});
	return;
}