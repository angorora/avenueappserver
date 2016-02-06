///<reference path = "../../../database/database_models.ts"/>
///<reference path="../../../node_modules/ts-promise/dist/ts-promise.d.ts"/>
import * as  databaseModels from  '../../../database/database_models';
import Promise from "ts-promise";
export class CheckOutValidation{
	model:any ;
	constructor(model:any){
		this.model= model;
	}
	
  public  VaidateDuplication(){
      return  new Promise<boolean>((resolve,reject) =>{
          let valid = true;
            databaseModels.DatabaseModels.Checkout.find({
                checkin_datetime : this.model.checkin_datetime,
            }).where("booking").equals(this.model.booking)
            .exec( function(err, checkouts:any) {
                  valid  = checkouts.length <= 0;
            }).then(
                function(){ resolve(valid) 
            });
      });
  }
}