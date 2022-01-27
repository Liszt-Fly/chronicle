
import parserBabel from "prettier/esm/parser-babel.mjs"
import prettier from 'prettier/esm/standalone.mjs'
import phpPlugin from "@prettier/plugin-php/standalone";
//sum formatter
let parseSet = new Map()
parseSet.set("js", parserBabel)

export function format(source: String, language: string) {
	console.log(`language${language}`)
    return prettier.format(source, {
        // parser:"php",
        // plugins: [phpPlugin],
		parser: "babel",

		plugins: [parseSet.get(language)],
	})
}
