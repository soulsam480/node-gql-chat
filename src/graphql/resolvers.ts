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
        getUsers: async (_, __, context) => {
            let user: any;
            if (context.req && context.req.headers.authorization) {
                const token = context.req.headers.authorization.split('Bearer ')[1];
                console.log(token);
                user = jwt.verify(token, process.env.TOKEN!, (err: any, res: any) => {
                    if (err) throw new AuthenticationError("User not Authorized");
                    return res
                })
            }

            return await User.find({ where: { username: Not(user.username) } })

        },
        login: async (_, args) => {
            const { username, password } = args;
            let errors: any = {}

            // todo send errors
            if (username.trim() === '') errors.username = "username not empty";
            if (password.trim() === '') errors.email = "password not empty";
            if (Object.keys(errors).length > 0) {
                throw new UserInputError("Bad Input", { errors })
            }

            const user = await User.findOne({ where: { username: username } })
            if (!user) {
                throw new AuthenticationError("username or password is incorrect")
            }
            const isPassword = await bcrypt.compare(password, user.password);
            if (!isPassword) {
                throw new AuthenticationError("username or password is incorrect")
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
            if (email.trim() === '') errors.email = "email not empty"
            if (password.trim() === '') errors.email = "password not empty"
            if (username.trim() === '') errors.email = "username not empty"
            if (confirmPassword.trim() === '') errors.email = "confirmPassword not empty"
            if (confirmPassword !== password) errors.confirmPassword = "Passwords don't match"
            //todo check if user exists
            console.log(User.findOne({ where: { username: username } }));

            if (User.findOne({ where: { username } })) errors.username = "username taken"
            if (User.findOne({ where: { email } })) errors.email = "email taken"

            if (Object.keys(errors).length > 0) {
                throw new UserInputError("Bad Input", { errors })
            }

            //todo hash pass
            password = await bcrypt.hash(password, 10)
            // todo create user and send data
            const createdUser = User.create({ username, email, password });
            const results = User.save(createdUser)
            return results
        }
    }
};

export default resolvers