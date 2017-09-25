'use strict';

var crypto = require('crypto');

var getHash = function(str) {
	return crypto.createHash('sha256').update(str).digest('hex');
}

var _ = function(app, p) {
	
	var azbn = app.azbn;
	
	var hash_type = 'sha256';
	
	var ctrl = {
		
		chain : [],
		
		calculateHash : function(block) {
			return crypto.createHash(hash_type).update(
				block.uid +
				block.prevHash +
				block.created_at +
				JSON.stringify(block.data)
			).digest('hex');
		},
		
		createBlock : function(uid, data, prevHash) {
			
			prevHash = prevHash || '';
			
			var block = {
				uid : uid,
				created_at : azbn.now(),
				prevHash : prevHash,
				data : data,
			};
			
			block.hash = ctrl.calculateHash(block);
			
			return block;
			
		},
		
		saveBlock : function(block) {
			
			ctrl.chain.push(block);
			
		},
		
		getChain : function() {
			
			return ctrl.chain;
			
		},
		
	};
	
	return ctrl;
	
};

module.exports = _;