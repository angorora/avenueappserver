///<reference path = "../../../database/database_models.ts"/>
///<reference path="../../../node_modules/ts-promise/dist/ts-promise.d.ts"/>
import * as  databaseModels from  '../../../database/database_models';
import Promise from "ts-promise";
export class BookingService{
	model:any ;
	constructor(model:any){
		this.model= model;
	}
	
  public  FindBookedDates(){
      return  new Promise<boolean>((resolve,reject) =>{
          let bookedDates:any[] = [];
           databaseModels.DatabaseModels.Booking.find({})
           .exec( function(err, bookings:any) {
                  valid  = bookings.length <= 0;
             bookings.forEach(booking => {
             var date = booking.checkin_datetime.toISOString()
                                  .replace(/T/, ' ')    // replace T with a space
                                  .replace(/\..+/, '')     // delete the dot and everything after
                var datePart = date.split(" ")[0];
                bookedDates.push(datePart);
             });
           }).then(function(){ 
              resolve(bookedDates) 
           });
      });
  }
}