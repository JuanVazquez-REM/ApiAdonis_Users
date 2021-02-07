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

    //MOSTRAR MIS COMENTARIOS
    async mis_comments ({auth}){
        return await Comment.query().where('user_id',auth.user.id)
    }

    //EDITAR MIS COMENTARIOS
    async editar_comment ({response, request,auth}){
        const input = request.all();

        const validation = await validateAll(input, {
            'id': 'required'
        });

        if(validation.fails()){
            return validation.messages()
        }
        if(await Comment.query().where('id',request.input('id')).where('user_id',auth.user.id).update(input)){
            return response.status(200).json({
                status: "true",
                message: "Comentario actualizado correctamente"
            })
        }

        return response.status(406).json({
            status: "false",
            message: "El comentario no fue actualizado"
        })
        
    }

    //EliMINAR MIS COMENTARIOS
    async eliminar_comment ({response, request,auth }){
        const input = request.all();

        const validation = await validateAll(input, {
            'id': 'required'
        });

        if(validation.fails()){
            return validation.messages()
        }
        if(await Comment.query().where('id',request.input('id')).where('user_id',auth.user.id).delete()){
            return response.status(200).json({
                status: "true",
                message: "Comentario eliminado correctamente"
            })
        }

        return response.status(406).json({
            status: "false",
            message: "El comentario no fue eliminado"
        })
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
