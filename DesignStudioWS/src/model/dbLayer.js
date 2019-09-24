var bookingDb = {};
var collection = require('../utilities/connection');


//code here

//Get request->to get all details
bookingDb.getAllBookings = () => {
    return collection.getEducatorCollection().then((collection) => {
        return collection.find({}, { _id: 0, __v: 0 }).then((educatorData) => {
            if (educatorData) { return educatorData }
            else {
                let err = new Error("No record found");
                err.status = 404;
                throw err;
            }
        })
    })
}


//PUT request->to allocate the person for different bookings for different stages 
bookingDb.allocatePerson = (obj) => {
    return collection.getEducatorCollection().then((collection) => {
        console.log("in here");
        let updateObj = {}
        let stage = obj.stage;
        // {`stages.${stage}.allocatedTo`:obj.personAllocated,"stages.stage.dateOfAllocation":obj.date}}
        obj.personAllocated ? updateObj[`stages.${stage}.allocatedTo`] = obj.personAllocated : null
        obj.date ? updateObj[`stages.${stage}.dateOfAllocation`] = obj.date : null
        // obj.completionDate ? updateObj[`stages.${stage}.dateOfCompletion`] = obj.completionDate : null
        return collection.updateOne({ "requestId": obj.requestId }, { $set: updateObj }).then((updatedData) => {
            console.log(updatedData);
            if (updatedData.nModified == 1)  return obj 
            else {
                let err = new Error("Data not updated");
                err.status = 200;
                throw err;
            }
        })
    })
}


bookingDb.getUserBookings = (userName) => {
    return collection.getEducatorCollection().then(eduColl => {
        return eduColl.find({ empName: userName }).then(data => {
            return data
        })
    })
}

bookingDb.updateStatus = (requestId, stage) => {
    return collection.getEducatorCollection().then(eduColl => {
        return eduColl.find({ requestId: requestId }).then(data => {
            if (data.length === 1) {
                let stages = data[0].stages;
                stage !== "rejected" ? ( stages[stage]["dateOfCompletion"] = new Date() ) : stages = stages
               return eduColl.updateOne({ requestId: requestId }, {$set  : { requestStatus: stage, stages : stages } }).then( data =>{
                   console.log(data)
                   return data
               })
            }
        })
    })
}

bookingDb.submit=(data)=>{
    
    output=bookingDb.CreateRequest(data.recordingLocation);
    data.requestId=output;
    return collection.getEducatorCollection().then(collection=>{
        return collection.create(data).then(data=>{
            if(data) return data
            else return null;
        })
    })
}

bookingDb.CreateRequest=(location)=>{
  location=location;
  var date = new Date();
  requestId=location.substr(0,3).toUpperCase()+date.yyyymmdd()
  return requestId;    
}

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('');
  };

module.exports = bookingDb;

