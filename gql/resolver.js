const resolvers = {
    Query: {
        // deben tener el mismo nombre que en el schema para que se puedan conectar

        // User
        getUser: () => {
            console.log('Obteniendo usuario');
            return null;
        }
    }
};

module.exports = resolvers;