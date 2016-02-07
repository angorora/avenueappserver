///<reference path = "../../database/database_models.ts"/>
///<reference path="../../node_modules/ts-promise/dist/ts-promise.d.ts"/>
///<reference path = "../../services/date_service/date_service.ts"/>
import * as  databaseModels from  '../../database/database_models';
import * as  dateService from  '../../services/date_service/date_service';
import Promise from "ts-promise";
export class BookingService{
	model:any ;
	constructor(model:any){
		this.model= model;
	}
	
  public  FindBookedDates(){
      return  new Promise<any>((resolve,reject) =>{
          let bookedDates:any[] = [];
          let dates = dateService.DateService;
           databaseModels.DatabaseModels.Booking.find({})
           .exec( function(err, bookings:any) {
                    bookings.forEach(booking => {
                      var date1 = dates.getDateString(booking.checkin_datetime)
                      var date2 = dates.getDateString(booking.checkout_datetime)
                      var diff = dates.getDaysDiff(date1,date2);
                  bookedDates.push(date1);
                    for(var i = 1;i < diff;i++){
                       var myDate = new Date(date1);
                       var dayOfMonth = myDate.getDate();
                       myDate.setDate(dayOfMonth + 1);
                      var newDate =  dates.getDateString(myDate)
                      bookedDates.push(newDate);
                    }
                    bookedDates.push(date2);
             });
           }).then(function(){ 
              resolve(bookedDates) 
           });
      });
  }
}