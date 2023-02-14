const i18n = require('i18n');
const path = require('path');

i18n.configure({
	locales: ['en-US', 'pt-BR'],
	defaultLocale: 'pt-BR',
	queryParameter: 'lang',
	directory: path.join('./src/', 'locales')
});

module.exports = i18n;