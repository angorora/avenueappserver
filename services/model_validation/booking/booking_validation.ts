///<reference path = "../../../database/database_models.ts"/>
///<reference path="../../../node_modules/ts-promise/dist/ts-promise.d.ts"/>
import * as  databaseModels from  '../../../database/database_models';
import Promise from "ts-promise";
export class BookingValidation{
	model:any ;
	constructor(model:any){
		this.model= model;
	}
	
  public  VaidateDuplication(){
      return  new Promise<boolean>((resolve,reject) =>{
          let valid = true;
            databaseModels.DatabaseModels.Booking.find({
                checkin_datetime : this.model.checkin_datetime,
            }).where("client").equals(this.model.client)
            .exec( function(err, bookings:any) {
                  valid  = bookings.length <= 0;
                      console.log("Inside Before Return****************");
              }).then(
                function(){ resolve(valid) 
                  console.log("Inside On Return**************");
              });
      });
  }
}