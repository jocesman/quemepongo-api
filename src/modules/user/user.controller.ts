import { Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {

    constructor() {}  

    @Get()
    getHello() {
        console.log('Hola desde el controlador de usuarios');
        return 'Hola desde el controlador de usuarios';
    }

    @Post()
    createUser() {
        console.log('Creando un usuario...');
        return {
            message: 'Este es un ejemplo de respuesta del controlador de usuario',
            success: true,
        };
    }


}
