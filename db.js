const { Random } = require('mockjs')

let data = { todos: [] }


for (let i = 0; i < 10; i++) {
    data.todos.push({
        id: i, name: Random.cword(2, 3)
    })

}
console.log(data)