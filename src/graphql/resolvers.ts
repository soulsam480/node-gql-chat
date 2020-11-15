
const resolvers = {
    Query: {
        getUsers: () => {
            const users: {}[] = [
                {
                    username: "sambit",
                    email: "smsm@mdmd.com"
                },
                {
                    username: "sfdsf",
                    email: "smsm@mdmd.com"
                },
                {
                    username: "sfdsf",
                    email: "smsm@mdmd.com"
                }
            ]
            return users
        }
    },
};

export default resolvers