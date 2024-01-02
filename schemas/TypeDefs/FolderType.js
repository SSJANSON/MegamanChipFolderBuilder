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
        chips: { type: new GraphQLList(ChipType) },
    })
})

module.exports = FolderType