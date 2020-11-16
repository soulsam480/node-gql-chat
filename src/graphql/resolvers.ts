import { ResolverMap } from "src/types/resolverType";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import { UserInputError } from "apollo-server";


const resolvers: ResolverMap = {
    Query: {
        getUsers: async () => await User.find()
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

            //todo check if user exists
            if (User.findOne({ where: { username } })) errors.username = "username taken"
            if (User.findOne({ where: { email } })) errors.email = "email taken"

            if (Object.keys(errors).length > 0) {
                throw new UserInputError("Bad Input", errors)
            }

            //todo hash pass
            password = await bcrypt.hash(password, 6)
            // todo create user and send data
            const createdUser = await User.create({ username, email, password });
            const results = User.save(createdUser)
            return results
        }
    }
};

export default resolvers