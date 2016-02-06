/************** includes ******************/
///<reference path = "../../database/database_models.ts"/>
///<reference path = "../../services/model_validation/client/client_validation.ts"/>

import * as  databaseModels from  '../../database/database_models';
import * as  validation from  '../../services/model_validation/client/client_validation';

export function Client(app){
/*
*  Finds all the client records
*  @returns the existing records list
*/  

 app.get('/api/clients',function(req,res){
    databaseModels.DatabaseModels.Client.find(function(err,clients){
        if(err){
            res.send(err);
        }
        res.json(clients)
    });
});

/*
*  Finds all the client records that have the Id number passed
*  @returns the existing records list
*/  

app.get('/api/clients/:id_number', function(req, res) {
    databaseModels.DatabaseModels.Client.findOne({
        id_number : req.params.id_number
    }, function(err, client) {
        if (err)
            res.send(err);
        databaseModels.DatabaseModels.Client.find(function(err, client) {
            if (err)
                res.send(err)
            res.json(client);
        });
    });
});

/*
*  Adds a client record that have the Id number passed
*  @returns the existing records list
*/

app.post('/api/addclient',function(req,res){
      if (!req.body) {
            res.json("Adding Client(s) Not Complete Because The Values Recieved Are Empty");      // HTTP status 404: NotFound
        }
        var validated = new validation.ClientValidation(req.body)
        validated.VaidateDuplication().done(function(valid){
           if (!valid) {
            res.json("Adding Client Not Complete Because A Similar Client Was Found");       // HTTP status 404: NotFound
            } 
            else {
                databaseModels.DatabaseModels.Client.create({
                    first_name : req.body.first_name.toUpper(),
                    last_name : req.body.last_name.toUpper(),
                    id_number:req.body.id_number.toUpper(),
                    age:req.body.age,
                    nationality:req.body.nationality.toUpper(),
                    gender:req.body.gender.toUpper(),
                    contact:{
                    telephone:req.body.contact.telephone,
                    cellphone:req.body.contact.cellphone,
                    email:req.body.contact.email
                    },
                    password:req.body.password
                },function(err,clients){
                    if(err)
                            res.send(err);
                        databaseModels.DatabaseModels.Client.find(function(err,clients){
                        if(err)
                            res.send(err);
                        res.json(clients)
                        });
                });
            }
      });
});

/*
*  Updates  a client record that have the Id number passed
*  @returns the existing records list
*/

app.post('/api/updateclient',function(req,res){
    databaseModels.DatabaseModels.Client.findById(req.body._id,function(err,client:any){
        if(err)
            res.send(err);//when error
            client.first_name =  req.body.first_name.toUpper(),
            client.last_name = req.body.last_name.toUpper(),
            client.id_number = req.body.id_number.toUpper(),
            client.age = req.body.age,
            client.nationality = req.body.nationality.toUpper(),
            client.gender = req.body.gender.toUpper(),
            client.password = req.body.password||client.password,
            client.contact = {
              telephone:req.body.contact.telephone,
              cellphone:req.body.contact.cellphone,
              email:req.body.contact.email
            }
      
      client.save(function(err,clients){
            if(err)
                res.send(err);
             databaseModels.DatabaseModels.Client.find(function(err,clients){
            if(err)
                res.send(err);
            res.json(clients)
            });
      });
   });
});

/*
*  Updates  a client record that have the Id number passed
*  @returns the existing records list
*/

app.delete('/api/clients/:id', function(req, res) {
    databaseModels.DatabaseModels.Client.remove({
        _id : req.params.id
    }, function(err) {
        if (err)
            res.send(err);
        databaseModels.DatabaseModels.Client.find(function(err, clients) {
            if (err)
                res.send(err)
            res.json(clients);
        });
    });
});
}
