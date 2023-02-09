const mongoose = require('mongoose');
const clientApiRestService = require('../services/clientApiRestService');
const { toJSON } = require('../util/mongooseUtil');

const balanceSchema = new mongoose.Schema(
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

const accountSchema = new mongoose.Schema(
	{
        holder: {
            type: String,
            required: [true, '{PATH} is required'],
            get: value => clientApiRestService.get(value),
            validate: [clientApiRestService.get, '{PATH} not found']
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

    agency = agency.padStart(4, 0);
    number = number.padStart(7, 0);
    
	return this.findOne({agency: agency, number: `${number}-${numberDigit}`});
});

accountSchema.method('toJSON', toJSON);

// accountSchema.virtual('holder')
//     .get((value, virtual, doc) => {
//         console.log(`Last value? ${value}`);
//         return clientApiRestService.get(this.holder);
//     });

module.exports = mongoose.model('Account', accountSchema);