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

async function isFollow(username, ctx) {
    const userFound = await User.findOne({ username });

    if (!userFound) throw new Error('Usuario no encontrado');

    const follow = await Follow // decimos que busque en la colección Follow que tenga este id de usuario y como dato en "follow" sea igual a userFound._id
        .find({ idUser: ctx.user.id })
        .where("follow")
        .equals(userFound._id);

    if (follow.length > 0) {
        return true;
    }
    return false;
}

async function unFollow(username, ctx) {
    const userFound = await User.findOne({ username });

    if (!userFound) throw new Error('Usuario no encontrado');

    const follow = await Follow.deleteOne({ idUser: ctx.user.id }).where("follow").equals(userFound._id);

    console.log(follow);

    if (follow.deletedCount > 0) {
        return true;
    }
    return false;
}

module.exports = {
    follow,
    isFollow,
    unFollow,
}