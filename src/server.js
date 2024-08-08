import http from 'node:http'
import { randomUUID } from 'node:crypto';
import { json } from './middlewares/json.js'
import { Database } from './middlewares/database.js';

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
const database = new Database()

const server = http.createServer(async (req,res)=>{
  const {method, url} = req

  await json(req, res)

  if(method === 'GET' && url === '/users'){
    const users = database.select('users')

    return res.end(JSON.stringify(users))
  }

  if(method === 'POST' && url === '/users'){
    const {name,email} = req.body
    const id = randomUUID()
    const user = {
      id: id,
      name: name,
      email: email
    }

    database.insert('users', user)

    return res
            .writeHead(201)
            .end('Criação de usuários')
  }

  return res
  .writeHead(404)
  .end()
})

server.listen(3333)
