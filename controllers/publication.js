const Publication = require('../models/publication.js');
const User = require('../models/user.js');
const awsUploadImage = require('../utils/aws-upload-image');
const { v4: uuidv4 } = require('uuid');

async function publish(file, ctx) {
    const { id } = ctx.user;
    const { createReadStream, mimetype } = await file;
    const extension = mimetype.split('/')[1] // de image/jpeg sacaría jpeg
    const fileName = `publication/${uuidv4()}.${extension}`;
    const fileData = createReadStream();

    try {
        const result = await awsUploadImage(fileData, fileName); // devuelve la url de la imagen
        const publication = new Publication({
            idUser: id,
            file: result,
            typeFile: mimetype.split('/')[0], // de image/jpeg sacaría image
            createdAt: Date.now()
        });
        publication.save();

        return {
            status: true,
            urlFile: result
        }
    } catch (error) {
        return {
            status: null,
            urlFile: ''
        }
    }
}

async function getPublications(username) {
    const user = await User.findOne({ username });

    if (!user) throw new Error('Usuario no encontrado');

    const publications = await Publication.find().where({ idUser: user._id }).sort({ createdAt: -1 });

    return publications;
}

module.exports = {
    publish,
    getPublications,
}