let mongoose = require('mongoose')
let { toJSON } = require('../util/mongooseUtil')

let accountSchema = new mongoose.Schema(
	{
        holder: String,
        agency: String,
        number: String,
        enabled: Boolean,
        blocked: Boolean,
        limits: {
            deposit: {
                daily: Number,
                default: 2000
            },
            withdraw: {
                daily: Number
            }
        }
    },
	{
		timestamps: true 
    }
)

accountSchema.method('toJSON', toJSON);

module.exports = mongoose.model('Account', accountSchema);