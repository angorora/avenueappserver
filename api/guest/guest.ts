/************** includes ******************/
///<reference path = "../../database/database_models.ts"/>
///<reference path = "../../services/model_validation/client/guest_validation.ts"/>

import * as  databaseModels from  '../../database/database_models';
import * as  validation from  '../../services/model_validation/client/guest_validation';

export function Client(app,upload){
  /*
   * Searches for all member documents
   * @returns all the  members
  */
    app.get('/api/members', function (req, res) {
        models.Member.find()
            .exec(function (err, bookings) {
                if (err)
                    res.send(err);
                res.json(bookings);
            });
    });
    
    /*
    * Searches for a Member document in the Members collection in the avenues database given an ID number
    * @returns a member object/document
    */
    
    app.get('/api/members/:id_number', function (req, res) {// get and return all the bookings done by client
        models.Member.find({
            id_number: req.params.id_number,
        }).exec(function (err, member) {
            if (err)
                res.send(err);
            // get and return all the bookings after you delete another
            res.json(member);
        })
    });
    
    /*
    * Adds a Member document to the Members collection in the avenues database
    * @returns the recently added member
    */
    app.post('/api/members/add', function (req, res) {
        if (!req.body) {
            res.json("Adding Member(s) Not Complete Because The Values Recieved Are Empty");      // HTTP status 404: NotFound
        }
        // else if (valid) {
        //     console.log("Inside");
        //     console.log(valid);
        //     res.json("Booking Not Complete Because A Similar Booking Was Found");       // HTTP status 404: NotFound
        // } 
        else {
            models.Member.create({
                first_name: req.body.first_name.toUpperCase(),
                last_name: req.body.last_name.toUpperCase(),
                id_number: req.body.id_number.toUpperCase(),
                age: req.body.age,
                nationality: req.body.nationality.toUpperCase(),
                gender: req.body.gender.toUpperCase()
            }, function (err, members) {
                if (err)
                    res.send(err);
                res.json(members);
            })
        }
    });

    /*
     * Updates a Member document in the Members collection in the avenues database
     *  @returns the recently updated member
    */
    
    app.post('/api/members/update', function (req, res) {
        models.Member.findById(req.body._id, function (err, member) {
            if (err)
                res.send(err);//when error
            member.first_name = req.body.first_name.toUpperCase();
            member.last_name = req.body.last_name.toUpperCase();
            member.id_number = req.body.id_number.toUpperCase();
            member.age = req.body.age;
            member.nationality = req.body.nationality.toUpperCase();
            member.gender = req.body.gender.toUpperCase();
            member.save(function (err, members) {
                if (err)
                    res.send(err);
                    res.json(members);
            });
        });
    });
    app.delete('/api/members/remove/:id', function (req, res) {
        models.Member.remove({
            _id: req.params.id
        }, function (err, members) {
            if (err)
                res.send(err);
            models.Member.find()
                .exec(function (err, bookings) {
                    if (err)
                        res.send(err);
                    res.json(bookings);
                });;
        });
    });
}
