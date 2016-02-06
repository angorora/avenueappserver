/************** includes ******************/
///<reference path = "../../database/database_models.ts"/>
///<reference path = "../../services/model_validation/checkout/checkout_validation.ts"/>

import * as  databaseModels from  '../../database/database_models';
import * as  validation from  '../../services/model_validation/checkout/checkout_validation';

export function CheckOutApi(app,upload){

  /*
   * Searches for all checkout documents
   * @returns all the  checkouts
  */ 
  
    app.get('/api/checkouts', function (req, res) {
           databaseModels.DatabaseModels.CheckOut.find({})
            .exec(function (err, bookings) {
                if (err)
                    res.send(err);
                res.json(bookings);
            });
    });
    
    /*
    *   @Searches for checkouts  done on a particular date collection in the avenues database
    *    @returns the recently added member
    */
    
   app.get('/api/checkouts/:date', function (req, res) {// get and return all the bookings done by client
         databaseModels.DatabaseModels.CheckOut.find({
            checkout_datetime: req.params.checkout_datetime,
        }).populate("booking")
        .exec(function (err, checkouts) {
            if (err)
                res.send(err);
            res.json(checkouts);
        })
    });
    
    /*
    *    @Retrieves Images associated with a checkout
    *    @returns the images in an array
    */
    
   app.get('/api/checkouts/images/:id', function (req, res) {// get and return all the bookings done by client
       databaseModels.DatabaseModels.CheckOut.findOne({
            _id: req.params.id,
        }).exec(function (err, checkout) {
            if (err)
                res.send(err);
            //var images = imageProcessor.retrieveImages(checkout.images);
           // res.json(images);
        })
        
    });
    
    /*
    * Adds a CheckOut document to the Members collection in the avenues database
    * @returns the recently added checkout instance
    */
    
    app.post('/api/checkouts/add',upload.single('images'),function (req, res) {
        if (!req.body) {
            res.json("Adding CheckOut(s) Not Complete Because The Values Recieved Are Empty");      // HTTP status 404: NotFound
        }
                   
        var validated = new validation.CheckOutValidation(req.body)
        validated.VaidateDuplication().done(function(valid){
            if (!valid) {
            res.json("Booking Not Complete Because A Similar Booking Was Found");       // HTTP status 404: NotFound
            } 
            else {
                //var image_paths = imageProcessor.saveImageToFileSystem(req);
                databaseModels.DatabaseModels.CheckOut.create({
                checkout_datetime :req.body.checkout_datetime,
                booking:req.body.booking,
                comments:req.body.comments,
                // images:image_paths,
                inspector:req.body.inspector,
                }, function (err, checkouts) {
                    if (err)
                        res.send(err);
                    res.json(checkouts);
                })
            }
        });
    });
    /*
     * Updates a checkout document in the CheckOut  collection in the avenues database
     *  @returns the recently updated CheckOut instance
    */
    
    app.post('/api/checkouts/update', function (req, res) {
           databaseModels.DatabaseModels.CheckOut.findById(req.body._id, function (err, checkout:any) {
            if (err)
                res.send(err);//when error
           checkout.checkout_datetime = req.body.checkout_datetime;
           checkout.booking  = req.body.booking;
           checkout.comments  = req.body.comments;
           checkout.inspector  = req.body.inspector;
           checkout.save(function (err, checkouts) {
                if (err)
                    res.send(err);
                    res.json(checkouts);
            });
        });
    });
    
     /*
     * Removes a checkout document from the CheckOut  collection in the avenues database
     *  @returns the remaining check ins
    */
    
    app.delete('/api/checkouts/remove/:id', function (req, res) {
      databaseModels.DatabaseModels.CheckOut.remove({
            _id: req.params.id
        }, function (err) {
            if (err)
                res.send(err);
               databaseModels.DatabaseModels.CheckOut.find({})
                .exec(function (err, checkouts) {
                    if (err)
                        res.send(err);
                    res.json(checkouts);
                });;
        });
    });
}
