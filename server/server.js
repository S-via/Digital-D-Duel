const express = require('express');
const path = require('path');

const {ApolloServer} = require('@apollo/server');
const {expressMiddleware} =require('@apollo/server/express4');

const {typeDefs, resolvers}=require('./schemas');
const {authMiddleware} = require('./utils/auth');

const db= require('./config/connection');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// startApolloServer wrapper 
const startApolloServer = async() => {
    await server.start();

    app.use(express.urlencoded({extended:true}));
    app.use(express.json());
    app.use('/graphql',expressMiddleware(server,{context:authMiddleware}));

    // for production for client side
    if(process.env.NODE_ENV === 'production'){
        app.use(express.static(path.join(__dirname,'../client/dist')));
    
    // Static file for SPA
            app.get('*',(req,res)=>{
                res.sendFile(path.join(__dirname,'../client/dist/index.html'))
            });
    }

    db.once('open',()=>{
        app.listen(PORT,() => {
            console.log(`on localhost:${PORT}`);
            console.log(`graphql:http://localhost:${PORT}/graphql`)
        })
        
    })

}
startApolloServer(); 
