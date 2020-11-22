/* import messages from "./messages";
import users from "./users";

export default {
    Query: {
        ...users.Query,
        ...messages.Query
    },
    Mutation: {
        ...users.Mutation,
        ...messages.Mutation
    }
} */

/* interface Resolvers {
    Query: {},
    Mutation:{}
}

import fs from 'fs';
import path from 'path';

const basename = path.basename(__filename);
const resolvers: Resolvers  = {}

fs
    .readdirSync("./")
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .map((file) => { functions[file.slice(0, -3)] = require(path.join(__dirname, file})))

module.exports = functions; */