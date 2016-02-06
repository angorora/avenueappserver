/************** includes ******************/
///<reference path = "../../database/database_models.ts"/>
///<reference path = "../../services/model_validation/booking_validation.ts"/>
///<reference path = "../../services/booking/booking_service.ts"/>
var databaseModels = require('../../database/database_models');
var validation = require('../../services/model_validation/booking_validation');
var _bookingService = require('../../services/booking/booking_service');


export function BookingApi (app) {
    /*
     * Finds and returns all booked dates
     * @returns the dates that are currently taken
     */
    app.get('/api/bookings/bookeddates', function (req, res) {
       var bookingService = new _bookingService.BookingService(req.body)
       bookingService.FindBookedDates().done(function(dates){
           
       })
           
       
    });
   /*
    * Adds a Booking document to the Booking collection in the avenues database
    * @returns the existing booking instances
    */
    
    app.get('/api/bookings', function (req, res) {
        databaseModels.DatabaseModels.Booking.find({})
            .populate("client members")
            .exec(function (err, bookings) {
                if (err)
                    res.send(err);
                res.json(bookings);
            });
    });
    
    /*
    * Finds  Booking records  for a client with the Id number passed 
    * @returns the records if it finds the records or an empty list
    */
    
    app.get('/api/bookings/:id_number', function (req, res) {
         databaseModels.DatabaseModels.Client.find({
            id_number: req.params.id_number,
        }).exec(function (err, clients) {
            var ids = clients.map(function (client) {
                return client._id;
            });
             databaseModels.DatabaseModels.Booking.find({ client: { $in: ids } }).populate("client members").exec(function (err, bookings) {
                if (err)
                    res.send(err);
                res.json(bookings);
            })
        });
    })
      
    /*
    * Finds  Booking records  for a specific check in date and time 
    * @returns the records if it finds the records or an empty list
    */
    
    app.get('/api/bookings/findByCheckinDate/:checkin_datetime', function (req, res) { 
         databaseModels.DatabaseModels.Booking.find({
            checkin_datetime: req.params.checkin_datetime,
        }).populate("client members")
            .exec(function (err, bookings) {
                if (err)
                    res.send(err);

                res.json(bookings);
            });
    });
    
   /*
    * Finds  Booking records  for a specific check out date and time 
    * @returns the records if it finds the records or an empty list
   */
  
    app.get('/api/bookings/findByCheckoutDate/:checkout_date', function (req, res) {
         databaseModels.DatabaseModels.Booking.find({
            checkout_date: req.params.checkout_date,
        }).populate("client members")
            .exec(function (err, bookings) {
                if (err)
                    res.send(err);

                res.json(bookings);
            });
    });
    
   /*
    * Finds  Booking records  for a specific client, check out  date and time 
    * @returns the records if it finds the records or an empty list
   */
  
    app.get('/api/bookings/findByClientCheckoutDate/:id_number/:checkin_datetime/', function (req, res) {
            databaseModels.DatabaseModels.Client.find({ id_number: req.params.id_number }, function (err, clients) {
            var ids = clients.map(function (client) { return client._id; });
                
            databaseModels.DatabaseModels.Booking.find({ client: { $in: ids } }).populate('client').exec(function (err, bookings) {
                    if (err)
                        res.send(err);
                        res.json(bookings);
                });
            });
    });
    
   /*
    * Finds  Booking records  for a specific client, check in  date and time 
    * @returns the records if it finds the records or an empty list
   */
    app.get('/api/bookings/findByClientCheckinDate/:id_number/:checkin_datetime/', function (req, res) {
         databaseModels.DatabaseModels.Client.find({ id_number: req.params.id_number }, function (err, clients) {
            var ids = clients.map(function (client) { return client._id; });
             databaseModels.DatabaseModels.Booking.find({ client: { $in: ids } }).populate('client').exec(function (err, bookings) {
                if (err)
                    res.send(err);
                res.json(bookings);
            });
        });
    });
    
   /*
    * Adds a Booking document to the Booking collection
    *  @returns the existing records list
   */

    app.post('/api/bookings/addbooking', function (req, res) {
        var validated = new validation.BookingValidation(req.body)
        validated.VaidateDuplication().done(function(valid){
           
                if (!req.body) {
                    res.json("Booking Not Complete Because The Values Recieved Are Empty");      // HTTP status 404: NotFound
                }
                else if (!valid) {
                            
                    res.json("Booking Not Complete Because A Similar Booking Was Found");       // HTTP status 404: NotFound
                } 
                else {
                    databaseModels.DatabaseModels.Booking.create({
                        checkin_datetime: req.body.checkin_datetime,
                        checkout_datetime: req.body.checkout_datetime,
                        rate: req.body.rate,
                        client: req.body.client,
                        members: req.body.members,
                        reference_number: req.body.reference_number,
                        booking_date: req.body.booking_date,
                        pending_payment: req.body.pending_payment,
                    }, function (err, bookings) {
                        if (err)
                            res.send(err);
                        // get and return all the bookings after you create another
                        databaseModels.DatabaseModels.Booking.find({})
                            .populate("client members")
                            .exec(function (err, bookings) {
                                if (err)
                                    res.send(err);
                                res.json(bookings);
                            });;
                    });
                }
        });
      
    });
    
   /*
    * Updates a Booking's active status 
    *  @returns the existing records list
   */
  
    app.post('/api/bookings/update/:id', function (req, res) {
         databaseModels.DatabaseModels.Booking.findById(req.params.id, function (err, booking:any) {
            if (err)
                res.send(err);//when error
            booking.active = req.body.active
            booking.save(function (err, bookings) {
                if (err)
                    res.send(err);
                // get and return all the bookings after you create another
                 databaseModels.DatabaseModels.Booking.find({})
                    .populate("client members")
                    .exec(function (err, bookings) {
                        if (err)
                            res.send(err);
                        res.json(bookings);
                    });;
            });
        });
    });
    
   /*
    * Updates a Booking document                                                                                              
    *  @returns the existing records list
   */
  
    app.post('/api/bookings/updatebooking', function (req, res) {
         databaseModels.DatabaseModels.Booking.findById(req.body._id, function (err, booking:any) {
            if (err)
                res.send(err);//when error
        
            booking.checkin_date = req.body.checkin_date,
            booking.checkout_date = req.body.checkout_date,
            booking.rate = req.body.rate,
            booking.client = req.body.client,
            booking.members = req.body.members
            booking.booking_date = req.body.booking_date,
            booking.pending_payment = req.body.pending_payment,
            booking.active = req.body.active
            booking.save(function (err, bookings) {
                if (err)
                    res.send(err);
                // get and return all the bookings after you create another
                 databaseModels.DatabaseModels.Booking.find({})
                    .populate("client members")
                    .exec(function (err, bookings) {
                        if (err)
                            res.send(err);
                        res.json(bookings);
                    });;
            });
        });
    });
    
   /*
    * removes  a Booking document that matches the id passed from the Booking collection
    * @returns the remaining records list
   */
        app.delete('/api/bookings/removebooking/:id', function (req, res) {
           databaseModels.DatabaseModels.Booking.remove({
                _id: req.params.id
            }, function(err) {
                if (err)
                    res.send(err);
                 databaseModels.DatabaseModels.Booking.find({})
                    .populate("client members")
                    .exec(function (err, bookings) {
                        if (err)
                            res.send(err);
                        res.json(bookings);
                    });;
            });
        });
    }
