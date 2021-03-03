const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const awsUploadImage = require('../utils/aws-upload-image');

function createToken(user, SECRET_KEY, expiresIn) {
    const { id, name, email, username } = user;

    const payload = {
        id,
        name,
        email,
        username
    };

    return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

async function getUser(id, username) {
    let user = null;

    if (id) user = await User.findById(id);
    if (username) user = await User.findOne({ username }); // User.findOne({ username: username }); pero como se llaman igual, entonces lo dejamos así

    if (!user) throw new Error("El usuario no existe");

    return user;
}

async function register(input) {
    const newUser = input;

    newUser.email = newUser.email.toLowerCase();
    newUser.username = newUser.username.toLowerCase();

    const { email, username, password } = newUser;

    // revisamos si el email ya existe en la db
    const foundEmail = await User.findOne({ email });

    if (foundEmail) throw new Error('El email ya está en uso');

    // revisamos si el username ya existe en la db
    const foundUsername = await User.findOne({ username });

    if (foundUsername) throw new Error('El nombre de usuario ya está en uso')

    // encryptar password del usuario
    const salt = await bcrypt.genSaltSync(10);
    newUser.password = await bcrypt.hash(password, salt);

    try {
        const user = new User(newUser);
        user.save();
        return user;
    } catch (error) {
        console.log(error);
    }
}

async function login(input) {
    const { email, password } = input;

    const userFound = await User.findOne({ email: email.toLowerCase() });

    if (!userFound) throw new Error('Error en el email o contraseña');

    const passwordSucces = await bcrypt.compare(password, userFound.password);

    if (!passwordSucces) throw new Error('Error en el email o contraseña');

    const userToken = createToken(userFound, process.env.SECRET_KEY, '24h');

    return {
        token: userToken
    };
}

async function updateAvatar(file, ctx) {
    // const { createReadStream, mimetype } = await file;
    // const extension = mimetype.split('/')[1];
    // const imgName = `avatar/avt.${extension}`;
    // const fileData = createReadStream();

    // try {
    //     const result = await awsUploadImage(fileData, imgName);
    //     console.log(result);
    // } catch (error) {
    //     console.log(error);
    //     return {
    //         status: false,
    //         urlAvatar: null
    //     }
    // }

    console.log('hola mundo');
    console.log(ctx);
    return null;
}

module.exports = {
    register,
    getUser,
    login,
    updateAvatar,
}