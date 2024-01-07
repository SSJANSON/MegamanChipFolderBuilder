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
            args: { chip_id: {type: GraphQLInt}},
            resolve(parent,args){
                return chipData
            }
        },
        getAllFolders:{
            type: new GraphQLList(FolderType),
            args: { chip_id: {type: GraphQLInt}},
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
                chip_id: {type: GraphQLInt},
                name: {type: GraphQLString},
                letter: {type: GraphQLString},
            },
            resolve(parent, args){
                const folderIndex = folderData.find(folder => folder.id === args.folder_id)
                if (!folderIndex){
                    throw new Error("folder does not exist")
                }
                const maxId = folderIndex.chips.reduce(
                    (max, curr) => curr.id < max ? max : curr.id,
                    0,
                );

                res = {
                    id : maxId +1,
                    chip_id: args.chip_id,
                    name: args.name,
                    letter: args.letter,
                }

                folderIndex.chips.push(res)
                return res;
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
                id: {type: GraphQLInt}
            },
            resolve(parent, args){
                const folderIndex = folderData.find(folder => folder.id === args.folder_id)
                if (!folderIndex){
                    throw new Error("folder does not exist")
                }
                const chipIndex = folderIndex.chips.findIndex(chip => chip.id === args.id)
                
                if (chipIndex !== -1) {
                    folderIndex.chips.splice(chipIndex, 1)
                }
                res = {
                    id: args.chip_id
                }
                return res;
            }
        }
    }
})

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })