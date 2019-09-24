const express = require('express');
const router = require('./routes/routing');
const app = express();
const requestLogger = require('./utilities/requestLogger.js');
const errorLogger = require('./utilities/errorLogger');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = require('http').createServer(app)
const nodeSSPI = require('node-sspi')
const path = require('path');

app.use(express.static("public"));

const corsOptions = {
    origin: ['http://localhost:4200'],
    optionsSuccessStatus: 200,
    credentials: true
}
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(requestLogger);

/*----Node SSPI ----*/ 
app.use("/getUserName", cors(corsOptions), (req, res, next) => {
    var nodeSSPIObj = new nodeSSPI({retrieveGroups: true})
    nodeSSPIObj.authenticate(req, res, function (err) {
        res.finished || next()
    });
})
app.use("/getUserName", cors(corsOptions), (req, res, next) => {
    userName = req.connection.user;;
    res.send(JSON.stringify({ "username" : userName.split('\\')[1]}))    
})
/*----Node SSPI ----*/ 

app.use('/', router);
router.get('/download',(req,res)=>{
    filepath=path.join(__dirname, '/public')
    res.download(__dirname +'/public/newFile.zip', "fILE NAME")
})

app.use(errorLogger);
server.listen( 3000 );

console.log('Express server listening on port 3000');

//To be deleted later
const collection = require('./utilities/connection');
const dummyData = require('./model/data.json')
router.get('/setupDb', (req, res, next) => {
    //take id and update the status provided to the corresponding id
    return collection.getEducatorCollection().then((eduColl) => {
        return eduColl.deleteMany().then((response) => {
            return eduColl.insertMany(dummyData).then((data) => {
                if (data) res.send("Insertion Successfull")
                else {
                    let err = new Error("Insertion failed");
                    err.status = 400;
                    throw err;
                }
            })
        })
    }).catch(err => next(err))
})