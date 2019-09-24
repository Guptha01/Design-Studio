var express = require('express');
var routing = express.Router();
const path = require('path');
var service = require('../service/service');
var beanClass = require('../model/RequestBean');
var multer = require('multer');


var store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '.../../public')
    },
    filename: function (req, file, cb) {
        cb(null, Data.now() + '.' + file, originalname);
    }
})
var upload = multer({ storage: store }).single('file');

routing.post('/upload', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            return res.json({ error: err })
        }
        res.json({ originalname: req.file.originalname, uploadname: req.file.filename })
    })
})

routing.post('/submit', (req, res, next) => {
    console.log(service.store(req.body.file));
    var Bean = new beanClass(req.body)
    return service.submit(Bean).then(data => {
        if (data) res.json({ "message": "data is submitted" })
    }).catch(err => {
        next(err);
    })
})

routing.get('/all', (req, res, next) => {
    service.getAllBookings().then((data) => {
        res.status(200);
        res.send(data);
    }).catch((err) => { next(err) })
})

routing.use(express.static(path.join(__dirname, "public")));

routing.get('/getEducatorData/:userName', (req, res, next) => {
    service.getUserBookings(req.params.userName).then(data => {
        res.send(data)
    }).catch(err => next(err))
})

routing.get('/download', (req, res, next) => {
    res.download(path.join(__dirname, "/downloads/newFile.txt"));
})

routing.put('/allocate/:requestId', (req, res, next) => {
    let person = req.body.person
    let doA = req.body.date
    let stage = req.body.stage
    let requestId = String(req.params.requestId)
    let obj = { personAllocated: person, requestId: requestId, date: doA, stage: stage };
    service.allocatePerson(obj).then((data) => {
        if (data) { res.send(`Allocation Done of Request id:${requestId} to ${person}`) }
    }).catch((err) => next(err))
})

routing.put('/updateStatus/:requestId/:stage', (req, res, next) => {
    let { requestId, stage } = req.params
    service.updateStatus(requestId, stage).then(res => {
        res.send({ "message": `Updation of ${requestId} is successful` })
    }).catch(err => next(err))
})

module.exports = routing;