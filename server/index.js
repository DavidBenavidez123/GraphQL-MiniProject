const express = require('express');
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')


const app = express();

app.use(cors());

mongoose.connect("mongodb+srv://david:123@cluster0-c31g5.mongodb.net/test?retryWrites=true")
mongoose.connection.once('open', () => {
    console.log("connected to data base")
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true

}))

app.listen(4000,() => {
    console.log("listening for requests on port 4000")
})