var bookSlot = {};
var model = require('../model/dbLayer');

//code functionalities here

//get all bookings from Database
bookSlot.getAllBookings = () => {
    return model.getAllBookings().then((data) => {
        if (data == null) {
            let err = new Error("No Bookings found");
            err.status = 400;
            throw err;
        }
        else {
            return data
        }
    })
}

bookSlot.submit=(data)=>{
    return  model.submit(data).then(data=>{
        console.log('service', data)
        if(data) return true
        else return false;
    })
}

//allocating person for the booking for different stages
bookSlot.allocatePerson=(obj)=>{
    return model.allocatePerson(obj).then((data)=>{
        if(data.length>0 &&  data!=null)return data
        else{
            let err = new Error("No Bookings foun");
            err.status = 400;
            throw err;
        }
    })
}


bookSlot.getUserBookings = (userName) => {
    return model.getUserBookings(userName).then(data => {
        if (data.length > 0) return data
        else {
            let err = new Error('No records found');
            err.status = 404;
            throw err
        }
    })
}

bookSlot.updateStatus = ( requestId, stage  ) => {
    return model.updateStatus( requestId, stage ).then( data => {
        if( data ) return data
        else throw new Error("Status updation failed");        
    })
}

module.exports = bookSlot;