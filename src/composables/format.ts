
import parserBabel from "prettier/esm/parser-babel.mjs"
import prettier from 'prettier/esm/standalone.mjs'

//sum formatter
let parseSet = new Map()
parseSet.set("js", parserBabel)

export function format(source: String, language: string) {
	console.log(`language${language}`)
	return prettier.format(source, {
		parser: "babel",

		plugins: [parseSet.get(language)],
	})
}
