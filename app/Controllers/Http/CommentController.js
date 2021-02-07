'use strict'

    const Comment = use('App/Models/Comment')
    const {validateAll} = use('Validator')

class CommentController {

     //Mostrar todos los Comment
    async todos_comments ({}){
        return await Comment.all();
    }

    //Mostrar cometarios de un cierto post
    async comments_post ({request}){
        const input = request.all();
        const validation = await validateAll(input, {
            'post_id': 'required'
        });

        if(validation.fails()){
            return validation.messages()
        }
        return await Comment.query().where('post_id',request.input('post_id'))
    }

    //Crear un nuevo Comment
    async nuevo_comment ({request, response, auth}){
        const input = request.all();
        input.user_id = auth.user.id

        const validation = await validateAll(input, {
            'post_id': 'required',
            'titulo_comentario': 'required|min:1',
            'contenido_comentario': 'required|min:1',
        });

        if(validation.fails()){
            return validation.messages()
        }
        await Comment.create(input)

        return response.json({
            message: "Comment creado correctamente",
            Comment: input
        })
    }
}

module.exports = CommentController
