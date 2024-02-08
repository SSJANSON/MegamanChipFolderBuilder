const graphql = require("graphql")
const ChipType = require("./ChipType")
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList

} = graphql

const FolderType = new GraphQLObjectType({
    name: "Folder",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type:GraphQLString },
        counter: { type: new GraphQLList(CounterType) },
        chips: { type: new GraphQLList(ChipType) },
    })
})

const CounterType = new GraphQLObjectType({
    name: "Counter",
    fields: () => ({
        name: { type: GraphQLString },
        category: { type: GraphQLString },
        count: { type: GraphQLInt },
    })
})

module.exports = FolderType