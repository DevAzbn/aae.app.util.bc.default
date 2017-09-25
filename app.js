'use strict';

var azbn = new require(__dirname + '/../../../../../system/bootstrap')({
	
});

var app = azbn.loadApp(module);

var argv = require('optimist')
	.usage('Usage: $0 --nn=[Name of neural network]')
	.default('nn', 'main')
	//.default('ext', '.php')
	//.demand(['str'])
	.argv
;

app.clearRequireCache(require);

var _prevHash = '';

for(var i = 0; i < 10; i++) {
	
	(function(cnt){
		
		var _block = app.mdl('chain').createBlock(
			'test',
			{
				'test' : cnt,
			},
			_prevHash
		);
		
		_prevHash = _block.hash;
		
		app.mdl('chain').saveBlock(_block);
		
	})(i)
	
}

app.saveJSON('chain', app.mdl('chain').getChain());
