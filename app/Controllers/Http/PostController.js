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

    //EDITAR MIS POSTS
    async editar_post ({response, request,auth}){
        const input = request.all();

        const validation = await validateAll(input, {
            'id': 'required'
        });

        if(validation.fails()){
            return validation.messages()
        }
        if(await Post.query().where('id',request.input('id')).where('user_id',auth.user.id).update(input)){
            return response.status(200).json({
                status: "true",
                message: "Post actualizado correctamente"
            })
        }

        return response.status(406).json({
            status: "false",
            message: "El Post no fue actualizado"
        })
        
    }

    //EliMINAR MIS POSTS
    async eliminar_post ({response, request,auth }){
        const input = request.all();

        const validation = await validateAll(input, {
            'id': 'required'
        });

        if(validation.fails()){
            return validation.messages()
        }
        if(await post.query().where('id',request.input('id')).where('user_id',auth.user.id).delete()){
            return response.status(200).json({
                status: "true",
                message: "Post eliminado correctamente"
            })
        }

        return response.status(406).json({
            status: "false",
            message: "El Post no fue eliminado"
        })
    }
}

module.exports = PostController
