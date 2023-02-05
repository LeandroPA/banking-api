let mongoose = require('mongoose')
let { toJSON } = require('../util/mongooseUtil')

let balanceSchema = new mongoose.Schema(
    {
        currency: {
            type: String,
            default: 'BRL'
        }
    }, 
    {
        _id: false,
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
)

balanceSchema.virtual('value')
    .get(() => this.value || 0)
    .set((val) => val);

let accountSchema = new mongoose.Schema(
	{
        holder: {
            type: String,
            required: [true, '{PATH} is required']
        },
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
            type: balanceSchema,
            default: {}
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
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

accountSchema.static('findOneByIdOrAgencyAndNumber', function(IdOrAgencyAndNumber) {
	if (mongoose.isValidObjectId(IdOrAgencyAndNumber)) {
		return this.findById(IdOrAgencyAndNumber);
	}

    let [agency, number, numberDigit] = IdOrAgencyAndNumber.split('-');
    
	return this.findOne({agency: agency, number: `${number}-${numberDigit}`});
});

accountSchema.method('toJSON', toJSON);

module.exports = mongoose.model('Account', accountSchema);