const userController = require('../controllers/user');

const resolvers = {
    Query: {
        // deben tener el mismo nombre que en el schema para que se puedan conectar

        // User
        getUser: (_, { id, username }) => userController.getUser(id, username),
    },
    Mutation: {
        // User
        register: (_, { input }) => userController.register(input),
        login: (_, { input }) => userController.login(input),
        updateAvatar: (_, { file }, ctx) => userController.updateAvatar(file, ctx),
    }
};

module.exports = resolvers;