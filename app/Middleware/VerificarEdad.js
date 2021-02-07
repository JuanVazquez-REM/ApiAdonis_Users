'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class VerificarEdad {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response }, next) {
    if(request.input('edad') < 18){
      return response.status(400).json({
        message: 'Ingrese una edad valida'
      })
    }
    await next()
  }
}

module.exports = VerificarEdad
