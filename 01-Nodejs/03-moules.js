//CommanJS, Every fiile is module [by default]
//Modules - Encapsulated code (only share minimum)

const names = require('./04-names')
const sayHi = require('./05-utils')
const data = require('./06-alternative-flavor')


//if we have a function inside of a module that we invoke yes that will run even through we did't assign to the varivable 
require('./07-mind-grenade')


console.log(data)
sayHi('susan')
sayHi(names.john)
sayHi(names.peter)






