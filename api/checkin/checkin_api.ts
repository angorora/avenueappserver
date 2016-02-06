/************** includes ******************/
///<reference path = "../../database/database_models.ts"/>
///<reference path = "../../services/model_validation/checkin/checkin_validation.ts"/>

import * as  databaseModels from  '../../database/database_models';
import * as  validation from  '../../services/model_validation/checkin/checkin_validation';

export function CheckInApi(app,upload){

  /*
   * Searches for all checkin documents
   * @returns all the  checkins
  */ 
  
    app.get('/api/checkins', function (req, res) {
        databaseModels.DatabaseModels.CheckIn.find({})
            .exec(function (err, bookings) {
                if (err)
                    res.send(err);
                res.json(bookings);
            });
    });
    
    /*
    *   @Searches for Checkins  done on a particular date collection in the avenues database
    *    @returns the recently added member
    */
    
   app.get('/api/checkins/:date', function (req, res) {// get and return all the bookings done by client
       databaseModels.DatabaseModels.CheckIn.find({
            checkin_datetime: req.params.checkin_datetime,
        }).populate("booking")
        .exec(function (err, checkins) {
            if (err)
                res.send(err);
            res.json(checkins);
        })
    });
    
    /*
    *    @Retrieves Images  associated with checkin
    *    @returns the images in an array
    */
    
   app.get('/api/checkins/images/:id', function (req, res) {
         databaseModels.DatabaseModels.CheckIn.findOne({
            _id: req.params.id,
        }).exec(function (err, checkin) {
            if (err)
                res.send(err);
            // var images = imageProcessor.retrieveImages(checkin.images);
            // res.json(images);
        })
        
    });
    
    /*
    * Adds a CheckIn document to the Members collection in the avenues database
    * @returns the recently added checkin instance
    */
    
    app.post('/api/checkins/add',upload.single('images'),function (req, res) {
        if (!req.body) {
            res.json("Adding CheckIn(s) Not Complete Because The Values Recieved Are Empty");     
        }
        var validated = new validation.CheckInValidation(req.body)
        validated.VaidateDuplication().done(function(valid){
            if (!valid) {
                res.json("Check In Not Complete Because A Similar Record Was Found");      
            } 
            else {
                //var image_paths = imageProcessor.saveImageToFileSystem(req);
                databaseModels.DatabaseModels.CheckIn.create({
                checkin_datetime :req.body.checkin_datetime,
                booking:req.body.booking,
                comments:req.body.comments,
                //images:image_paths,
                inspector:req.body.inspector,
                }, function (err, checkins) {
                    if (err)
                        res.send(err);
                    res.json(checkins);
                })
            }
      });
    });
    /*
     * Updates a checkin document in the CheckIn  collection in the avenues database
     *  @returns the recently updated CheckIn instance
    */
    
    app.post('/api/checkin/update', function (req, res) {
         databaseModels.DatabaseModels.CheckIn.findById(req.body._id, function (err, checkin:any) {
            if (err)
                res.send(err);//when error
           checkin.checkin_datetime = req.body.checkin_datetime;
           checkin.booking  = req.body.booking;
           checkin.comments  = req.body.comments;
           checkin.inspector  = req.body.inspector;
           checkin.save(function (err, checkins) {
                if (err)
                    res.send(err);
                    res.json(checkins);
            });
        });
    });
    
     /*
     * Removes a checkin document from the CheckIn  collection in the avenues database
     *  @returns the remaining check ins
    */
    
    app.delete('/api/checkin/remove/:id', function (req, res) {
         databaseModels.DatabaseModels.CheckIn.remove({
            _id: req.params.id
        }, function (err) {
            if (err)
                res.send(err);
             databaseModels.DatabaseModels.CheckIn.find({})
                .exec(function (err, checkins) {
                    if (err)
                        res.send(err);
                    res.json(checkins);
                });;
        });
    });
}
