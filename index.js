const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./gql/schema');
const resolvers = require('./gql/resolver');
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
        // context
    });

    serverApollo.listen().then(({ url }) => {
        console.log('##################################');
        console.log(`Servidor en ${url}`);
        console.log('##################################');
    });
}