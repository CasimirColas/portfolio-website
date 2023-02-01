import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    from:{type:String},
    title:{type:String},
    content:{type:String},
    sendingDate:{type:String},
    type:{type:String}
})

export default mongoose.models.User || mongoose.model("Message",messageSchema)