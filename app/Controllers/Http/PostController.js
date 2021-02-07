'use strict'

    const Post = use('App/Models/Post')
    const {validateAll} = use('Validator')
class PostController {

    //Mostrar todos los post
    async todos_posts ({request}){
        return await Post.all();
    }

    //Mostrar solo mis posts
    async mis_posts ({request}){
        return await Persona.find(request.id)
    }

    //Crear un nuevo post
    async nuevo_post ({request, auth, response}){
        const input = request.all();
        input.user_id = auth.user.id

        const validation = await validateAll(input, {
            'titulo': 'required|min:1',
            'contenido': 'required|min:1',
        });

        if(validation.fails()){
            return validation.messages()
        }
        newpost = await Post.create(input)

        return response.json({
            message: "Post creado correctamente",
            Post: newpost
        })
    }
}

module.exports = PostController
