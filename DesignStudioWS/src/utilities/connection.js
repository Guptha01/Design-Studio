const mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true)
const url = "mongodb://localhost:27017/designStudio";
let connection = {}
//schema for educator

let allocationSchema = new Schema({
    "allocatedTo": { type: String },
    "dateOfAllocation": { type: Date},
    "dateOfCompletion": { type: Date},
})
const educatorSchema = Schema({
    requestId: { type: String, required: [true, "Request id required"], unique: true },
    empName: { type: String, required: [true, "Employee name required"] },
    emailId: { type: String, required: [true, "Email id required"] },
    title: { type: String, required: [true, "Course title is required"] },
    brief: { type: String, required: [true, "Content description is required"] },
    typeOfRecording: { type: String, required: [true, "Specify the type of recording"] },
    recordingLocation: { type: String, required: [true, "Specify recording location"] },
    requestStatus: { type: String, required: [true, ""] },
    rejectStatus: { status: { type: Boolean }, default: false },
    stages: {
        type: {
            preProduction: {
                type: allocationSchema
            },
            production: {
                type: allocationSchema
            },
            postProduction: {
                type: allocationSchema
            },
        }
    },
    comments: { type: [String] }
}, { collection: "educator", timestamps: true });


//connection for educator schema
connection.getEducatorCollection = () => {
    return mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('educator', educatorSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}
module.exports = connection;