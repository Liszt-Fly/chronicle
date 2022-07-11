import {ChronComponent} from "./ParserType";


export let rules = [
    {
        name: ChronComponent.HEADING,
        rule: /^(#{1,6}) ([\s\S]+)/
    },
    // {
    //     name:ChronComponent.BULLET,
    //     rule:/^* [\s\S]+/
    // }
]


