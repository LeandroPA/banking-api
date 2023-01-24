let mongoose = require('mongoose')
let { toJSON } = require('../util/mongooseUtil')

let sequencialGeneratorSchema = new mongoose.Schema(
	{
        identifier: String,
        sequencial: {
            type: Number,
            default: 0
        }
    },
	{
		timestamps: true 
    }
)

sequencialGeneratorSchema.method('toJSON', toJSON);

module.exports = mongoose.model('SequencialGenerator', sequencialGeneratorSchema);