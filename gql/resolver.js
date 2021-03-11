const userController = require('../controllers/user');
const followController = require('../controllers/follow');

const resolvers = {
    Query: {
        // deben tener el mismo nombre que en el schema para que se puedan conectar

        // User
        getUser: (_, { id, username }) => userController.getUser(id, username),
        search: (_, { search }) => userController.search(search),

        // Follow
        isFollow: (_, { username }, ctx) => followController.isFollow(username, ctx),
        getFollowers: (_, { username }) => followController.getFollowers(username),
        getFolloweds: (_, { username }) => followController.getFolloweds(username),
    },
    Mutation: {
        // User
        register: (_, { input }) => userController.register(input),
        login: (_, { input }) => userController.login(input),
        updateAvatar: (_, { file }, ctx) => userController.updateAvatar(file, ctx),
        deleteAvatar: (_, { }, ctx) => userController.deleteAvatar(ctx),
        updateUser: (_, { input }, ctx) => userController.updateUser(input, ctx),

        // Follow

        // decimos que el usuario que viene en ctx va a seguir al usuario de username
        follow: (_, { username }, ctx) => followController.follow(username, ctx),
        unFollow: (_, { username }, ctx) => followController.unFollow(username, ctx),
    }
};

module.exports = resolvers;