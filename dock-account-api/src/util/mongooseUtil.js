exports.toJSON = function() {
	
	const { __v, _id, ...object } = this.toObject();
	return {id: _id, ...object};
}