const { gql } = require('apollo-server');

const typeDefs = gql`
    # aquí definimos todos los types, mutations, queries, inputs, etc.

        # definimos que es lo que se ve a devolver cuando nos hagan una petición y nos pidan un User (devolvera todo en string, menos el id)
    type User {
        id: ID
        name: String
        username: String
        email: String
        siteWeb: String
        description: String
        password: String
        avatar: String
        createdAt: String
    }

    type Token {
        token: String
    }

    type UpdateAvatar {
        status: Boolean,
        urlAvatar: String
    }

    type Publish {
        status: Boolean
        urlFile: String
    }

    type Publication {
        id: ID
        idUser: ID
        file: String
        typeFile: String
        createdAt: String
    }

    type Comment {
        idPublication: ID
        idUser: User
        comment: String
        createdAt: String
    }

        # definimos los datos que queremos para poder registrar a un User
    input UserInput {
        name: String! # ! define que es obligatorio
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input UserUpdateInput {
        name: String
        email: String
        currentPassword: String
        newPassword: String
        siteWeb: String
        description: String
    }

    input CommentInput {
        idPublication: ID,
        comment: String
    }

        # aquí van todas las queries (consultas get)
    type Query {
        
         ### User ###

        # query que no recibe nada y devuelve un User
        getUser(id: ID, username: String): User
        
        # va a recibir el nombre del usuario que el cliente este buscando
        search(search: String): [User]

         ### Follow ###
         isFollow(username: String!): Boolean
         getFollowers(username: String!): [User]
         getFolloweds(username: String!): [User]

         ### Publication ###
         getPublications(username: String!): [Publication]

         ### Comment ###
         getComments(idPublication: ID!): [Comment]
    }

        # aquí van todos los mutation (post, put, patch, etc. Todos los que generan cambios en la db)
    type Mutation {

        ### User ###

        register(input: UserInput): User

        # Login
        login(input: LoginInput): Token

        # el tipo Upload ya lo tiene grapghql, entonces no es necesario agregarlo.
        updateAvatar(file: Upload): UpdateAvatar

        deleteAvatar: Boolean

        updateUser(input: UserUpdateInput): Boolean

        ### Follow ###

        # para seguir a usuarios
        follow(username: String!): Boolean

        unFollow(username: String!): Boolean

        ### Publication ###

        # el tipo Upload ya lo tiene grapghql, entonces no es necesario agregarlo.
        publish(file: Upload): Publish

        ### Comment ###
        addComment(input: CommentInput): Comment
    }
`;

module.exports = typeDefs;