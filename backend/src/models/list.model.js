import mongoose from 'mongoose'

const listItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        lowercase: true,
        required: true
    },
    isBought: {
        type: Boolean,
        default: false
    }
}, { _id: false })
const listSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    listName: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true
    },
    items: [
        listItemSchema
    ]
}, { timestamps: true })

export const List = mongoose.model("List", listSchema)