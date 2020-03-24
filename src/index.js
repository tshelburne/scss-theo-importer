// thanks to https://basalt.io/journal/theo-design-tokens-using-node-sass-importer-for-any-build-method

const theo = require('theo')
const path = require('path')

function theoImporter(opts={}) {
	const matcher = opts.matcher || /\.theo\.(ya?ml|json)$/
	const baseTransform = opts.transform || { type: 'web' }
	const format = opts.format || { type: 'default.scss' }

	return function(url, prev, done) {
		if (!matcher.test(url)) return null

		const prevDirectory = path.parse(prev).dir
		const file = path.resolve(prevDirectory, url)

		const transform = {...baseTransform, file}

		theo.convert({transform, format })
			.then((contents) => {
				done({ contents })
			})
			.catch(({ message }) => {
				done(new Error(`Theo design token error in ${url} - ${message}`))
			})
	}
}

module.exports = theoImporter