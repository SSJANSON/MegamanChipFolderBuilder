const graphql = require("graphql")
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString

} = graphql

const ChipType = new GraphQLObjectType({
    name: "Chip",
    fields: () => ({
        id: {type: GraphQLInt },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        damage: {type: GraphQLInt },
        description: { type: GraphQLString },
        letter: { type: GraphQLString },
        image: { type: GraphQLString }


    })
})

module.exports = ChipType