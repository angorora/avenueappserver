/************** includes ******************/
///<reference path = "../../database/database_models.ts"/>
///<reference path = "../../services/model_validation/guest/guest_validation.ts"/>

import * as  databaseModels from  '../../database/database_models';
import * as  validation from  '../../services/model_validation/guest/guest_validation';

export function Client(app,upload){
  /*
   * Searches for all Guest documents
   * @returns all the  Guests
  */
    app.get('/api/Guests', function (req, res) {
       databaseModels.DatabaseModels.Guest.find({})
            .exec(function (err, bookings) {
                if (err)
                    res.send(err);
                res.json(bookings);
            });
    });
    
    /*
    * Searches for a Guest document in the Guests collection in the avenues database given an ID number
    * @returns a Guest object/document
    */
    
    app.get('/api/Guests/:id_number', function (req, res) {// get and return all the bookings done by client
        databaseModels.DatabaseModels.Guest.find({
            id_number: req.params.id_number,
        }).exec(function (err, Guest) {
            if (err)
                res.send(err);
            // get and return all the bookings after you delete another
            res.json(Guest);
        })
    });
    
    /*
    * Adds a Guest document to the Guests collection in the avenues database
    * @returns the recently added Guest
    */
    app.post('/api/Guests/add', function (req, res) {
        if (!req.body) {
            res.json("Adding Guest(s) Not Complete Because The Values Recieved Are Empty");      // HTTP status 404: NotFound
        }
        // else if (valid) {
        //     console.log("Inside");
        //     console.log(valid);
        //     res.json("Booking Not Complete Because A Similar Booking Was Found");       // HTTP status 404: NotFound
        // } 
        else {
            databaseModels.DatabaseModels.Guest.create({
                first_name: req.body.first_name.toUpperCase(),
                last_name: req.body.last_name.toUpperCase(),
                id_number: req.body.id_number.toUpperCase(),
                age: req.body.age,
                nationality: req.body.nationality.toUpperCase(),
                gender: req.body.gender.toUpperCase()
            }, function (err, Guests) {
                if (err)
                    res.send(err);
                res.json(Guests);
            })
        }
    });

    /*
     * Updates a Guest document in the Guests collection in the avenues database
     *  @returns the recently updated Guest
    */
    
    app.post('/api/Guests/update', function (req, res) {
        databaseModels.DatabaseModels.Guest.findById(req.body._id, function (err, Guest:any) {
            if (err)
                res.send(err);//when error
            Guest.first_name = req.body.first_name.toUpperCase();
            Guest.last_name = req.body.last_name.toUpperCase();
            Guest.id_number = req.body.id_number.toUpperCase();
            Guest.age = req.body.age;
            Guest.nationality = req.body.nationality.toUpperCase();
            Guest.gender = req.body.gender.toUpperCase();
            Guest.save(function (err, Guests) {
                if (err)
                    res.send(err);
                    res.json(Guests);
            });
        });
    });
    app.delete('/api/Guests/remove/:id', function (req, res) {
        databaseModels.DatabaseModels.Guest.remove({
            _id: req.params.id
        }, function (err) {
            if (err)
                res.send(err);
            databaseModels.DatabaseModels.Guest.find({})
                .exec(function (err, bookings) {
                    if (err)
                        res.send(err);
                    res.json(bookings);
                });;
        });
    });
}
