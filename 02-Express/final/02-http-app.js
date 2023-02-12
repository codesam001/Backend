
// Express Start ---

const http = require('http')
const {readFileSync, readdirSync} = require('fs')


//get all files 
const homePage = readFileSync('./nav-app/index.html')
const homeStyles = readFileSync('./nav-app/styles.css')
// const homeImages = readFileSync('./nav-app/browser-app.js')
const homeLogic = readFileSync('./nav-app/browser-app.js')



const server = http.createServer((req, res)=>{
    // console.log(req.method)
    // console.log(req.url)
    const url = req.url;
    if(url === '/'){
        console.log(url)
        res.writeHead(200, {'content-type': 'text/html'})
        res.write(homePage)
        res.end()
    }
    //Styles
    else if (url === '/styles.css'){
        res.writeHead(200, {'content-type': 'text/css'})
        res.write(homeStyles)
        res.end()
    }
    // Logic
    else if (url === '/styles.css'){
        res.writeHead(200, {'content-type': 'text/css'})
        res.write(homeStyles)
        res.end()
    }
    //about page
    else if (url === '/browser-app'){
        res.writeHead(200, {'content-type': 'text/javascript'})
        res.write(homeLogic)
        res.end()
    }
    // 404
    else{
        res.writeHead(404, {'content-type': 'text/html'})
        res.write('<h1>Page not found</h1>')
        res.end()

    }
})

server.listen(5000)

















