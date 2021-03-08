const Follow = require('../models/follow');
const User = require('../models/user');

async function follow(username, ctx) {

    // ctx:
    // user: {
    //     id: '60256ddd9c97995d90a031d1',
    //     name: 'Matías',
    //     email: 'matias1993@gmail.com',
    //     username: 'matiasnnr',
    //     iat: 1615136386,
    //     exp: 1615222786
    // }

    const userFound = await User.findOne({ username });

    if (!userFound) throw new Error('Usuario no encontrado');

    console.log('userFound', userFound);

    try {
        const follow = new Follow({
            idUser: ctx.user.id,
            follow: userFound._id
        });

        // guardamos el follow de un usuario a otro creado anteriormente
        follow.save();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}

module.exports = {
    follow,
}