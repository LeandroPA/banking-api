module.exports =  (err, req, res, next) => {

	if (err && err.name == 'ValidationError' ) {
		let errors = {};

		Object.keys(err.errors).forEach((key) => {
			errors[key] = err.errors[key].message;
		});

		res.status(400).send({errors: errors});

	}
  }