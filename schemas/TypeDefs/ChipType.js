const graphql = require("graphql")
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString

} = graphql

const ChipType = new GraphQLObjectType({
    name: "Chip",
    fields: () => ({
        id: { type: GraphQLInt },
        chip_id: { type: GraphQLInt },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        damage: {type: GraphQLInt },
        description: { type: GraphQLString },
        letter: { type: GraphQLString },
        category: { type: GraphQLString },
        mb: { type: GraphQLInt },
        location: { type: GraphQLString },
        ver: { type: GraphQLString }

    })
})

module.exports = ChipType