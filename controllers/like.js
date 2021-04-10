const Like = require('../models/like');
const User = require('../models/user');
const {
    UserInputError,
    AuthenticationError,
    ForbiddenError,
    withFilter,
} = require('apollo-server')

async function addLike(idPublication, ctx) {
    if (!ctx.user) throw new AuthenticationError('Unauthenticated')
    try {
        const like = new Like({
            idPublication,
            idUser: ctx.user.id
        });

        const liked = await isLiked(idPublication, ctx);

        if (liked) throw new Error('Ya le ha dado like a esta publicación');

        like.save();

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function deleteLike(idPublication, ctx) {
    try {
        // quita el like del usuario en la publicación con idPublication
        await Like.findOneAndDelete({ idPublication }).where({ idUser: ctx.user.id });

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function isLiked(idPublication, ctx) {
    try {
        const liked = await Like.findOne({ idPublication }).where({ idUser: ctx.user.id });
        if (!liked) throw new Error('No le ha dado like a esta publicación'); // si entra acá, entonces salta al catch y devuelve un false, sino sigue y devuelve un true

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function countLikes(idPublication) {
    try {
        const result = await Like.countDocuments({ idPublication });
        return result;
    } catch (error) {
        console.log(error);
        return 0;
    }
}

module.exports = {
    addLike,
    deleteLike,
    isLiked,
    countLikes,
}