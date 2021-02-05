const { gql } = require('apollo-server');

const typeDefs = gql`
    # aquí definimos todos los types, mutations, queries, inputs, etc.

    # definimos que es lo que se ve a devolver cuando nos hagan una petición y nos pidan un User
    type User {
        id: ID,
        name: String
        username: String
    }

    type Query {
        # aquí van todas las queries
        
        # query que no recibe nada y devuelve un User
        getUser: User
    }
`;

module.exports = typeDefs;