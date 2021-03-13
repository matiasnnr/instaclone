const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = Schema({
    // Schema con id de la publicación a la que se le ha dado like y el id del usuario que le ha dado like
    // de esta manera podemos validar que solo le de like 1 sola vez
    idPublication: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Publication" // sirve para traer toda la info con population o hacer referencia de un sitio a otro
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    }
});

module.exports = mongoose.model("Like", LikeSchema);