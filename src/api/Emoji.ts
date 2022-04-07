import { Emoji } from "@/interfaces/type";

export let emoji: Emoji[] = [
    {
        name: "Thunder",
        content: "&#9889;"
    },
    {
        name: "Lion",
        content: "&#129409;"
    },
    {
        name: "Football",
        content: "&#9917;"
    },
    {
        name: "MapleLeaf",
        content: "&#127809;"
    },
    {
        name: "Ring",
        content: "&#x1F48D;"
    },
    {
        name: "Door",
        content: "&#x1F6AA;"
    },
    {
        name: "MobilePhone",
        content: "&#x1F4F1;"
    },
    {
        name: "CrystalBall",
        content: "&#x1F52E;"
    }
    ,
    {
        name: "Hundred",
        content: "&#x1F4AF;"
    },
    {
        name: "Atom",
        content: "&#x269B;"
    },
    {
        name: "YinYang",
        content: "&#x262F;"
    },
    {
        name: "Recycle",
        content: "&#x267B;"
    },
    {
        name: "DoubleExclamation",
        content: "&#8252;"
    }
    , {
        name: "Love",
        content: "&#129505;"
    }
]

export function random() {
    console.log(Math.floor(Math.random() * (emoji.length)))
    return Math.floor(Math.random() * (emoji.length))
}