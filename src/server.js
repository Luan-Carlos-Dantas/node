import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './middlewares/routes.js'
import { extractQueryParams } from './utils/extract-query-params.js';


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


const server = http.createServer(async (req,res)=>{
  const {method, url} = req

  await json(req, res)

  const route = routes.find(route=>{
    return route.method === method && route.path.test(url)
  })

  if(route){
    const routeParams = req.url.match(route.path)

    console.log(extractQueryParams(routeParams.groups.query))

    const { query, ...params} = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res
  .writeHead(404)
  .end()
})

server.listen(3333)
