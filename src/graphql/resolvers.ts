import { Message } from './../entity/Message';
import { ResolverMap } from "src/types/resolverType";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import { AuthenticationError, UserInputError } from "apollo-server";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Not } from "typeorm";
dotenv.config()

const resolvers: ResolverMap = {
    Query: {
        getUsers: async (_, __, { user }) => {
            if (!user) throw new AuthenticationError("User not Authorized")
            return await User.find({ where: { username: Not(user.username) } })
        },
        login: async (_, args) => {
            const { username, password } = args;
            let errors: any = {}

            // todo send errors
            if (username.trim() === '') errors.username = "Username not empty";
            if (password.trim() === '') errors.password = "Password not empty";
            if (Object.keys(errors).length > 0) {
                throw new UserInputError("Bad Input", { errors })
            }

            const user = await User.findOne({ where: { username: username } })
            if (!user) {
                errors.password = "Username or password is incorrect";
                throw new UserInputError("Username or password is incorrect", { errors })
            }
            const isPassword = await bcrypt.compare(password, user.password);
            if (!isPassword) {
                errors.password = "Username or password is incorrect";
                throw new UserInputError("Username or password is incorrect", { errors })
            }

            const token = jwt.sign({ username: username }, process.env.TOKEN!, {
                expiresIn: "7d"
            })

            console.log(token);

            return {
                ...user,
                token: token,
                createdAt: user.createdAt.toISOString()
            }
        }
    },
    Mutation: {
        register: async (_, args) => {
            let { username, email, password, confirmPassword } = args;
            let errors: any = {}

            // todo send errors
            if (email.trim() === '') errors.email = "Email not empty"
            if (password.trim() === '') errors.email = "Password not empty"
            if (username.trim() === '') errors.email = "Username not empty"
            if (confirmPassword.trim() === '') errors.email = "ConfirmPassword not empty"
            if (confirmPassword !== password) errors.confirmPassword = "Passwords don't match"
            //todo check if user exists
            if (await User.findOne({ where: { username } })) errors.username = "Username taken"
            if (await User.findOne({ where: { email } })) errors.email = "Email taken"

            if (Object.keys(errors).length > 0) {
                throw new UserInputError("Bad Input", { errors })
            }

            //todo hash pass
            password = await bcrypt.hash(password, 10)
            // todo create user and send data
            const user = await User.create({ username, email, password }).save()
            return user
        },
        sendMessage: async (parent, { to, content }, { user }) => {
            if (!user) throw new AuthenticationError("User not Authorized")
            const recipient = await User.findOne({ where: { username: to } })
            if (!recipient) throw new UserInputError("User not found")
            if (content.trim() === '') throw new UserInputError("Mesaage is empty")

            const message = await Message.create({ content, from: user.username, to }).save()
            return {
                ...message,
                createdAt: message.createdAt.toISOString()
            }
        }
    }
};

export default resolvers