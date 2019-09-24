let stageData = {
    allocatedTo : "",
    dateOfAllocation : "",
    dateOfCompletion : "",
}
class RequestBean {
    constructor(obj) {
        this.requestId = obj.requestId;
        this.empName = obj.empName;
        this.emailId = obj.emailId;
        this.title = obj.title;
        this.brief = obj.brief;
        this.typeOfRecording = obj.typeOfRecording;
        this.recordingLocation  = obj.recordingLocation;
        this.requestStatus = "";
        this.stages = {
            preProduction : {...stageData},
            production : {...stageData},
            postProduction : {...stageData}
        },
        this.comments = []
    }
}
module.exports = RequestBean;