import fs from 'node:fs'

const databasePath = new URL('../db,json', import.meta.url)


export class Database {
  constructor(){
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(()=>{
        this.#persist()
      })
  }

  // {"users": [...]}
  #database = {}

  #persist(){
    fs.writeFile(databasePath, JSON.stringify(this.#database),  (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    })
  }

  select(table){
    const data = this.#database[table] ?? []

    return data
  }

  insert(table, data){
    if(Array.isArray(this.#database[table])){
      this.#database[table].push(data)
    }else{
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }
}
