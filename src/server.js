import http from 'node:http'

// Aplicações => HTTP
// CommonJS =>
// ESModule

// http methods
// GET, POST, PUT, PATCH, DELETE

// GET => buscar um recurso no backend
// POST => criar um recurso no backend
// PUT => atualizar um recurso no backend
// PATCH => atualizar um recurso em específico no backend
// DELETE => deletar um recurso no backend

// POST /users => criando usuários
// GET /users => buscando usuários

// Statefull => possui sempre infomações que são salvas em memória
// Stateless => possui informações salvas fora do ambiente local

// JSON - Javascript Object Notation

// Cabeçalhos => Metadados
// HTTP Status Code
const users = []

const server = http.createServer((req,res)=>{
  const {method, url} = req

  console.log(req.headers)

  console.log(method, url)

  if(method === 'GET' && url === '/users'){
    return res
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(users))
  }

  if(method === 'POST' && url === '/users'){

    users.push({
      id: 1,
      name: 'Luan',
      email: 'luan@example.com'
    })

    return res
            .writeHead(201)
            .end('Criação de usuários')
  }

  return res
  .writeHead(404)
  .end()
})

server.listen(3333)
