// Streams =>

// process.stdin
//   .pipe(process.stdout)

import {Readable, Writable, Transform} from 'node:stream'

// Ler dados
class OneToHundredStream extends Readable{
  index = 1
  _read(){
    const i = this.index++

    setTimeout(()=>{
      if(i >= 100){
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))

        this.push(buf)
      }
    },2000)
  }
}



// Escrever dados
class MultipyByTenStream extends Writable{
  _write(chunk, encoding, callback){
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}



new OneToHundredStream()
  .pipe(new InverseNumber())
  .pipe(new MultipyByTenStream())
