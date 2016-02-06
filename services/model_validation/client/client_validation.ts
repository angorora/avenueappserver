///<reference path = "../../../database/database_models.ts"/>
///<reference path="../../../node_modules/ts-promise/dist/ts-promise.d.ts"/>
import * as  databaseModels from  '../../../database/database_models';
import Promise from "ts-promise";
export class ClientValidation{
	model:any ;
	constructor(model:any){
		this.model= model;
	}
	
  public  VaidateDuplication(){
      return  new Promise<boolean>((resolve,reject) =>{
          let valid = true;
            databaseModels.DatabaseModels.Client.find({
                id_number : this.model.id_number,
                }).exec( function(err, clients:any) {
                      valid  = clients.length <= 0;
                }).then(
                function(){ resolve(valid) 
            });
      });
  }
}