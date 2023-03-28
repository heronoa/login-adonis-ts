import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import Mail from '@ioc:Adonis/Addons/Mail';
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

    public async confirm({request}: HttpContextContract) {
        const token = request.input("token");
        const user = await User.findBy("confirmation_token", token);
        if (user) {
            user.is_confirmed = true
            user.save()
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
            const savedUser = await User.create(newUser);
            const mailResult = await Mail.send((message) => {
                message
                .from('noreply@apexnftbrasil.com')
                .to(savedUser.email)
                .subject('Welcome Onboard!')
                .htmlView("emails/welcome")
                .html(`<h1>Welcome a board ${savedUser.email}<h1><br/><h4><a href="http://127.0.0.1:3333/confirm?token=${savedUser.confirmation_token}">Click here to confirm your email account</a></h4>`)
            })
            return mailResult;
        } else {
            return "E-mail already in use";
        }
    }

    public async resendConfirmation({auth}: HttpContextContract) {
        const user = auth.user!;
        if (user) {
            const mailResult = await Mail.send((message) => {
                message
                .from('noreply@apexnftbrasil.com')
                .to(user.email)
                .subject('Welcome Onboard!')
                .htmlView(`emails/welcome`, { name: 'Virk' })
                .html(`<h1>Welcome a board ${user.email}<h1><br/><h4><a href="http://127.0.0.1:3333/confirm?token=${user.confirmation_token}">C lick here to confirm your email account</a></h4>`)
            })
            return mailResult;
        } else {
            return "User doenst exist"
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
