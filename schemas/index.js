const graphql = require("graphql")
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = graphql

const chipData = require("../schemas/chip_data.json")
const folderData = require("../schemas/folder_data.json")

const ChipType = require("./TypeDefs/ChipType")
const FolderType = require("./TypeDefs/FolderType")

function getNextId(obj) {
    return (Math.max.apply(Math, obj.map(function(o) {
      return o.id;
    })) + 1);
  }

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllChips:{
            type: new GraphQLList(ChipType),
            args: { id: {type: GraphQLInt}},
            resolve(parent,args){
                return chipData
            }
        },
        getAllFolders:{
            type: new GraphQLList(FolderType),
            args: { id: {type: GraphQLInt}},
            resolve(parent,args){
                return folderData
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addChip: {
            type: ChipType,
            args: {
                folder_id: {type: GraphQLInt},
                id: {type: GraphQLInt},
                name: {type: GraphQLString}
            },
            resolve(parent, args){
                const folderIndex = folderData.find(folder => folder.id === args.folder_id)
                if (!folderIndex){
                    throw new Error("folder does not exist")
                }
                folderIndex.chips.push({
                    id: args.id,
                    name: args.name
                })
                return args;
            }
        },
        createFolder: {
            type: FolderType,
            args: {
                name: {type: GraphQLString}
            },
            resolve(parent, args){
                const next = getNextId(folderData)
                res = {
                    id: next,
                    name: args.name,
                    chips: []
                }
                folderData.push(res)
                return res;
            }
        },
        deleteChip: {
            type: FolderType,
            args: {
                folder_id: {type: GraphQLInt},
                chip_id: {type: GraphQLInt},
            },
            resolve(parent, args){
                const folderIndex = folderData.find(folder => folder.id === args.folder_id)
                if (!folderIndex){
                    throw new Error("folder does not exist")
                }
                const chipIndex = folderIndex.chips.findIndex(chip => chip.id === args.chip_id)
                
                if (chipIndex !== -1) {
                    folderIndex.chips.splice(chipIndex, 1)
                }
                console.log(chipIndex)
                res = {
                    id: args.chip_id
                }
                return res;
            }
        }
    }
})

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })