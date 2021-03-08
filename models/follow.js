const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowSchema = Schema({
    // con esto decimos que el usuario de idUser sigue al usuario de follow
    idUser: { // este usuario sigue a:
        type: Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    follow: { // este otro usuario
        type: Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Follow', FollowSchema);