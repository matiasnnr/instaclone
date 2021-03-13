const Comment = require('../models/comment');

async function addComment(input, ctx) {

    const { idPublication, comment } = input;
    const { id } = ctx.user;

    try {
        const newComment = new Comment({
            idPublication,
            idUser: id,
            comment
        });

        newComment.save();

        return newComment;
    } catch (error) {
        console.log(error);
    }
}

async function getComments(idPublication) {
    const comments = await Comment.find({ idPublication }).populate("idUser");

    if (!comments) throw new Error('Esta publicación ya no está disponible o no tiene comentarios');

    return comments;
}

module.exports = {
    addComment,
    getComments,
}