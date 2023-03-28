import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class AuthController {
    public async login({ request, auth }: HttpContextContract) {
        const {email, password} = request.all();
        const token = await auth.attempt(email, password, {
            expiresIn: "365 days",
        })
        return token;
    }

    public async logout({auth}: HttpContextContract) {
        await auth.logout();
    }

    public async me({auth}: HttpContextContract) {
        return {isLoggedIn: auth.user!}
    }

    public async private() {
        return {route: "private"}
    }

    public async confirm({auth}: HttpContextContract) {
        const token = auth.user!.confirmation_token;
        const user = await User.findBy("confirmation_token", token);
        if (user) {
            user.is_confirmed = true
            return user
        } else {
            return "User not found"
        }
    }

    public async signin({request}: HttpContextContract) {
        const {email, password} = request.all();
        const existingUser = await User.findBy("email", email)
        if (!existingUser?.id) {
            const newUser = {
                email: email,
                password: password
            }
            const savedUser = User.create(newUser);
            return savedUser;
        } else {
            return "E-mail already in use";
        }
    }

    public async deleteUser({auth}: HttpContextContract) {
        const deletingId = auth.user!.id;
        const user = await User.findOrFail(deletingId);
        await user.delete();
        await auth.logout();
        return user;
    }

}
