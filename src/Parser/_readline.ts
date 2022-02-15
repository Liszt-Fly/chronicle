import readline from 'readline'
import fs from 'fs-extra'
let lastline = 0
export async function Freadline(path: string): Promise<string[]> {
    const fileStream = fs.createReadStream(path);
    console.log(path)
    let Content: string[] = []
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        lastline++;
        // input.txt 中的每一行都将在此处作为 `line` 连续可用。
        Content.push(line)

    }
    return Promise.resolve(Content)

}

export async function FreadNewLine(path: string) {
    const fileStream = fs.createReadStream(path);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
     

}
