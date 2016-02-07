/// <reference path="typings/express/express.d.ts" />var express = require('express');
///<reference path = "typings/body-parser/body-parser.d.ts"/>
///<reference path = "typings/cors/cors.d.ts"/>
///<reference path = "typings/mongoose/mongoose.d.ts"/>
///<reference path = "typings/multer/multer.d.ts"/>
///<reference path = "database/database_config.ts"/>
///<reference path = "api/client/client_api.ts"/>
///<reference path = "api/booking/booking_api.ts"/>
///<reference path = "api/guest/guest_api.ts"/>
///<reference path = "api/checkin/checkin_api.ts"/>
///<reference path = "api/checkout/checkout_api.ts"/>

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import * as multer from 'multer'
import * as database from './database/database_config'
// import * as client_api from './database/database_config'
 import * as booking_api from './api/booking/booking_api'
// import * as member_api from './database/database_config'
// import * as checkin_api from './database/database_config'
// import * as checkout_api from './database/database_config'
const app = express();

mongoose.connect(database.database_config.databaseUrl.Url);
app.use(express.static(__dirname + 'public'));  
app.use(bodyParser.json({ limit:"5000mb"}));     
app.use(bodyParser.urlencoded({extended:true,limit:'5000mb'}));                      
app.use(bodyParser.json());                                       
app.use(cors());

var upload = multer({ dest: '.src/server/services/uploads/' })  
app.listen( 8083,function(){
    console.log("Now Listening on Port 8082");
});
booking_api.BookingApi(app);
//require("./src/server/routes/testRoute")(app);
// require("./src/server/api/client/client_api")(app);
//require("./src/server/api/booking/booking_api")(app);
// require("./src/server/api/member/member_api")(app);
// require("./src/server/api/checkin/checkin_api")(app,upload);
// require("./src/server/api/checkout/checkout_api")(app,upload);
