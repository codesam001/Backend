
// HTTP -- Creatiing your own server

const http = require('http')

const server = http.createServer((req, res)=>{
if (req.url === '/') {
    res.end('Hello to our home page')
}
if (req.url === '/about'){
    res.end("Welcome to our About Us Page")
}

// res.end(`<h1>Opps</h1>
//      <p>We can't seem to find the pages you are looking for</p>
//      <a href="/">Back Home</a>
//     `)
})

server.listen(5000)









