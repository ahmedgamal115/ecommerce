const { gql } = require("apollo-server-express");

module.exports = gql`
    scalar DateTime
    scalar Upload

    type Query{
        colors: [Colors!]!
        color( id:ID! ): Colors!

        productsFeed: [Product!]!
        product( id: ID! ): Product!
        productType( gender: String! ): [Product!]!
        productColor( color: String! ): [Product!]!

        promocodes: [PromoCodes!]!
        promocode( id: ID! ): PromoCodes!
        checkPromocode( code: String! ): PromoCodes!

        OrdersFeed:  [Orders!]!
    }
    type Colors{
        id: ID!
        color: String!
        colorName: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type Product{
        id: ID!
        image: [String!]!
        status: String!
        gender: String!
        color: Colors!
        price: Float!
        amounts: Float!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type PromoCodes{
        id: ID!
        code: String!
        discount: Float!
        expire: DateTime!
        expired: Boolean
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type Orders{
        id: ID!
        username: String!
        email: String!
        phone: String!
        otherPhone: String
        address: String!
        size: [String!]!
        amount: [Float!]!
        payway: String!
        commentQ: String
        orderNumber: Float
        discountCode: PromoCodes
        productOrder: [Product!]!
        delivered: Boolean
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type Mutation{
        addColors( color: String!,colorName: String! ): Colors!
        deleteColors( id:ID! ): String!

        addProduct( image: [Upload!]!, status: String!, gender: String!, color: ID!, price: Float!, amounts: Float!): Product!
        deleteProduct( id: ID! ): String!
        updateProduct( id: ID!, image: [Upload!],oldImage: [String!], status: String, gender: String, color: ID, price: Float, amounts: Float ): Product!

        addPromoCode(code: String!,discount: Float!,expire: String!): PromoCodes!
        deletePromoCode( id: ID! ): String!
        updatePromoCode( id: ID!,code: String!,discount: Float!,expire: String! ): PromoCodes!
    
        makeOrder( username: String!,email: String!,phone: String!,commentQ: String,otherPhone: String,
            address: String!,size: [String!]!,amount: [Float!]!,
            payway: String!,orderNumber: Float,discountCode: ID,
            productOrder: [ID!]! ): Orders!
        
        deliverOrder( id: ID! ): String!
        deleteOrder( id: ID! ): String!
    }
`