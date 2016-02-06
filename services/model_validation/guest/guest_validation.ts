///<reference path = "../../../database/database_models.ts"/>
///<reference path="../../../node_modules/ts-promise/dist/ts-promise.d.ts"/>
import * as  databaseModels from  '../../../database/database_models';
import Promise from "ts-promise";
export class GuestValidation{
	model:any ;
	constructor(model:any){
		this.model= model;
	}
	
  public  VaidateDuplication(){
      return  new Promise<boolean>((resolve,reject) =>{
          let valid = true;
            databaseModels.DatabaseModels.Guest.find({
                id_number : this.model.id_number,
                }).exec( function(err, guests:any) {
                      valid  = guests.length <= 0;
                }).then(
                function(){ resolve(valid) 
            });
      });
  }
}