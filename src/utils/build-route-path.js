export function buildRoutePath(path){
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

  // console.log(pathWithParams)

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
  // console.log(Array.from(path.matchAll(routeParametersRegex)))
  // return new RegExp()

  return pathRegex
}
