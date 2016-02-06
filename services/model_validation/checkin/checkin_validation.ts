///<reference path = "../../../database/database_models.ts"/>
///<reference path="../../../node_modules/ts-promise/dist/ts-promise.d.ts"/>
import * as  databaseModels from  '../../../database/database_models';
import Promise from "ts-promise";
export class CheckInValidation{
	model:any ;
	constructor(model:any){
		this.model= model;
	}
	
  public  VaidateDuplication(){
      return  new Promise<boolean>((resolve,reject) =>{
          let valid = true;
            databaseModels.DatabaseModels.Checkin.find({
                checkin_datetime : this.model.checkin_datetime,
            }).where("booking").equals(this.model.booking)
            .exec( function(err, checkins:any) {
                  valid  = checkins.length <= 0;
                      console.log("Inside Before Return****************");
              }).then(
                function(){ resolve(valid) 
                  console.log("Inside On Return**************");
              });
      });
  }
}