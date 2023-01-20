const SequencialGenerator = require('../models/sequencialGenerator');

exports.getSequencial = (identifier) => {
    return SequencialGenerator
        .findOne({identifier: identifier})
        .then(generator => {

            if (!generator) {
                generator = new SequencialGenerator({identifier: identifier})
            }

            generator.sequencial++;
            generator.save();

            return generator.sequencial;
        });
}