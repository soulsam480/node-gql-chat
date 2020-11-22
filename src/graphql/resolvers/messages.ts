import { Message } from './../../entity/Message';
import { ResolverMap } from "src/types/resolverType";
import { User } from "./../../entity/User";
import { AuthenticationError, UserInputError } from "apollo-server";

const messages: ResolverMap = {
    Query: {
    },
    Mutation: {
        sendMessage: async (parent, { to, content }, { user }) => {
            if (!user) throw new AuthenticationError("User not Authorized")
            const recipient = await User.findOne({ where: { username: to } })
            if (!recipient) throw new UserInputError("User not found")
            if (recipient.username === user.username) throw new UserInputError("Can't send message to yourself!!")
            if (content.trim() === '') throw new UserInputError("Mesaage is empty")

            const message = await Message.create({ content, from: user.username, to }).save()
            return {
                ...message,
                createdAt: message.createdAt.toISOString()
            }
        }
    }
};

export default messages