import messages from "./messages";
import users from "./users";

export default {
    Message: {
        createdAt: (parent: any) => parent.createdAt.toISOString()
    },
    Query: {
        ...users.Query,
        ...messages.Query
    },
    Mutation: {
        ...users.Mutation,
        ...messages.Mutation
    }
}
