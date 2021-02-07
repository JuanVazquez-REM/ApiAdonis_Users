'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/','')
Route.post('/registro','AuthController.registro').middleware(['verificar_edad'])
Route.post('/login','AuthController.login')


Route.post('/check','AuthController.check') //Checar token 

Route.group(() => {
  //POSTS
  Route.post('/posts','PostController.todos_posts') //mostrar todos los posts
  Route.post('/myposts','PostController.mis_posts') //mostrar mis posts
  Route.post('/nuevo/post','PostController.nuevo_post') //agregar nuevo post

  //COMMENTS
  Route.post('/comments/post','CommentController.comments_post')
  Route.post('/nuevo/comment','CommentController.nuevo_comment')
}).middleware(['auth'])
