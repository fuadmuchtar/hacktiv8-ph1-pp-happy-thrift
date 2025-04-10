// bcrypt

var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10)
var hash = bcrypt.hashSync('password', salt)


console.log(hash)

let authpassword1 = bcrypt.compareSync("password", hash)
let authpassword2 = bcrypt.compareSync("salaah", hash)

console.log(authpassword1)
console.log(authpassword2)