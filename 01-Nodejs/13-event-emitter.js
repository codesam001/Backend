//Event  --

const EventEmitter = require('events')
const customEmitter = new EventEmitter()

//on - listen for an event
//emit - emit an event 


//1. Hm kitne baar v is .on event ko likh sakte hai I mean ye repeate ho sakta hai 
//2. the order is matter --- pahle .on event aana chaheye uske baad he .emit events aa sakta hai 

customEmitter.on('response', (name, id )=>{
    console.log(`data recieved ${name} ${id}`)
})

customEmitter.on('response', ()=>{
    console.log(`Some other logic`)
})

customEmitter.emit('response', 'john', 34,)  // ye hamesh .on events ke baad me he aayega 




































