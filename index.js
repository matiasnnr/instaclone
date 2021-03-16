const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./gql/schema');
const resolvers = require('./gql/resolver');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

// nos conecta con nuestra base de datos
mongoose.connect(process.env.BBDD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
    // }, (err, res) => {
}, (err, _) => { // si no usamos una variable la dejamos con barra baja _
    if (err) {
        // console.log(err);
        console.log('Error de conexión')
    } else {
        server();
    }
});

// conectar servidor de GraphQL
function server() {
    const serverApollo = new ApolloServer({
        // aquí es donde se van a conectar entre sí los schema y resolvers
        typeDefs,
        resolvers,
        context: ({ req }) => { // podemos ocupar el context para obtener la información del user mediante el token que recibimos por authorization
            const token = req.headers.authorization;

            if (token) {
                try {
                    const user = jwt.verify(
                        token.replace('Bearer ', ''),
                        process.env.SECRET_KEY
                    );

                    return {
                        user,
                    }
                } catch (error) {
                    console.log('#### ERROR ###');
                    console.log(error);
                    throw new Error('token inválido');
                }
            }
        }
    });

    // si estamos en el servidor de producción tomamos el puerto desde las variables de entorno, sino por defecto será el puerto 4000
    serverApollo.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
        console.log('##################################');
        console.log(`Servidor en ${url}`);
        console.log('##################################');
    });
}