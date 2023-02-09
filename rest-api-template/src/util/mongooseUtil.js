exports.toJSON = function() {
	
	const { __v, _id, ...object } = this.toObject();
	return {id: _id, ...object};
}

exports.optionsTransformToJSON = {
    toObject: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
}