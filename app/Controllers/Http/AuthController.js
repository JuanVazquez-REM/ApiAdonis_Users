'use strict'

    const User = use('App/Models/User')
    const {validateAll} = use('Validator')
class AuthController {

    async registro ({request, response}){
        
        const input = request.all();

        const validation = await validateAll(input, {
            'username': 'required|max:80',
            'email': 'required|max:120|unique:users,email',
            'password': 'required|max:60',
            'edad': 'required',
            'genero': 'required',
        });

        if(validation.fails()){
            return validation.messages()
        }
        
        if(await User.create(input)){
            return response.status(201).json({
                message: "Registrado correctamente"
            })
        }
    }

    async login ({ auth, request }) {
        const { email, password } = request.all()

        const validation = await validateAll(request.all(), {
            'email': 'required',
            'password': 'required',
        });

        if(validation.fails()){
            return validation.messages()
        }
        return await auth.attempt(email, password)
    }

    async check ({ auth, response }) {
        try {
            if(await auth.check()){
                return response.status(200).json({
                    message: "True"
                })
            } //Checkear el token para saber es valido
        } catch (error) {
            response.status(400).send('Token invalido JWT')
        }
    }
}

module.exports = AuthController
