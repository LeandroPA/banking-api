const i18n = require('../config/i18n.config.js');

/**
 * LocaleService
 */
class LocaleService {
	/**
	 *
	 * @param i18nProvider The i18n provider
	 */
	constructor(i18nProvider) {
		this.i18nProvider = i18nProvider;
	}
	/**
	 *
	 * @returns {string} The current locale code
	 */
	getCurrentLocale() {
		return this.i18nProvider.getLocale();
	}
	/**
	 *
	 * @returns string[] The list of available locale codes
	 */
	getLocales() {
		return this.i18nProvider.getLocales();
	}
	/**
	 *
	 * @param locale The locale to set. Must be from the list of available locales.
	 */
	setLocale(locale) {
		if (this.getLocales().indexOf(locale) !== -1) {
		this.i18nProvider.setLocale(locale)
		}
	}

	queryParameterMiddleware(req, res, next) {
		
		if (req.query.lang) {
			module.exports.i18nProvider.setLocale(req, req.query.lang);
		}
		next();
	}

	/**
	 *
	 * @param string String to translate
	 * @param args Extra parameters
	 * @returns {string} Translated string
	 */
	translate() {
		return this.i18nProvider.__.apply(this, arguments); 
	}
	/**
	 *
	 * @param phrase Object to translate
	 * @param count The plural number
	 * @returns {string} Translated string
	 */
	translatePlurals() {
		return this.i18nProvider.__N.apply(this, arguments); 
	}
}

module.exports = new LocaleService(i18n);