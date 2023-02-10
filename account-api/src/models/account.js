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
            // get: value => clientApiRestService.get(value),
            validate: validApiRequestResource,
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

function validApiRequestResource(id) {
    return clientApiRestService.get(id)
        .catch(err => {
            let { errors } = err.body || {};

            if (errors) {
                err = new Error(Object.values(errors)[0]);
            }

            throw err;
        });
}

// accountSchema.post('findOne', (account, next) => {
//     console.log('post Find', account.holder);
//     clientApiRestService.get(account.holder)
//         .then(person => {
//             account.holderObject = person;
//             return account;
//         })
//         .then(next);
// })

accountSchema.method('toJSON', toJSON);

// accountSchema.virtual('holderObject')
//     .get((value, virtual, doc) => {
//         console.log(`Last value? ${value}`);
//         return clientApiRestService.get(this.holder);
//     });

module.exports = mongoose.model('Account', accountSchema);