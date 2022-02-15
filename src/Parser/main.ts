import { Freadline } from "./_readline"

function main() {
    let result = Freadline("./example.md")
    result.then(v => {
        console.log(v)
    })
}
main()