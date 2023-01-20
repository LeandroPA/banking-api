let mongoose = require('mongoose')
let { toJSON } = require('../util/mongooseUtil')

let accountSchema = new mongoose.Schema(
	{
        holder: String,
        agency: String,
        number: String,
        enabled: {
            type: Boolean,
            default: true
        },
        blocked:  {
            type: Boolean,
            default: false
        },
        balance: {
            currency: {
                type: String,
                default: 'BRL'
            }
        },
        limits: {
            withdraw: {
                daily: {
                    type: Number,
                    default: 2000
                }
            },
            deposit: {
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