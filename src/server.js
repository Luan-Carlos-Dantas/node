import http from 'node:http'

// Aplicações => HTTP
// CommonJS =>
// ESModule

const server = http.createServer((req,res)=>{
  return res.end('Hello World')
})

server.listen(3333)
