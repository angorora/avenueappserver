///<reference path = "../typings/mongoose/mongoose.d.ts"/>
import * as mongoose from "mongoose";

//var emailRegex = /@^(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))" + @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-\w]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$/;
export class  DatabaseModels {
    Schema:any = new mongoose.Schema;
    static  Client = mongoose.model("Client", new mongoose.Schema({
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        id_number: { type: String, required: true },
        age: { type: Number, max: 100 },
        nationality: { type: String, required: true },
        gender: { type: String, required: true, enum: ["M", "F"] },
        contact: {
            telephone: String,
            cellphone: String,
            email: { type: String, required: true }
        },
        password: { type: String, required: true }
    })) ;
    static Guest = mongoose.model("Guest", new mongoose.Schema({
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        id_number: { type: String, required: true },
        age: Number,
        nationality: { type: String, required: true },
        gender: { type: String, required: true },
    }));
    static Booking =  mongoose.model("Booking", new mongoose.Schema({
        checkin_datetime: { type: Date, required: true },
        checkout_datetime: { type: Date, required: true },
        rate: { type: Number, required: true },
        client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
        members: [{ member_id: { type: mongoose.Schema.Types.ObjectId, ref: "Member" } }],
        reference_number: { type: String, required: true },
        booking_date: { type: Date },
        pending_payment: { type: Boolean, default: true },
        active: { type: Boolean, default: true }
    }));
    static Lodge =  mongoose.model("Lodge", new mongoose.Schema({
        lodge_name: String,
        gps_coordinates: String,
        link: String,
    }));
    
    static  CheckIn = mongoose.model("CheckIn", new mongoose.Schema({
        checkin_datetime: { type: Date, required: true },
        booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
        comments: { type: String, required: true },
        images: [{ type: String }],
        inspector: { type: String, required: true },
    }));
    static  CheckOut = mongoose.model("CheckOut", new mongoose.Schema({
        checkout_datetime: { type: Date, required: true },
        booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
        comments: { type: String, required: true },
        images: [{ type: String }],
        inspector: { type: String, required: true },
    })) ;
    static  Payment =  mongoose.model("Payment", new mongoose.Schema({
        reference_number: { type: String, required: true },
        amount: { type: Number, required: true },
        date: Date,
    }));
    static Todo = mongoose.model("ToDo", new mongoose.Schema({
        activty: { type: String, required: true },
        cost: Number,
        link: String,
        operating_hrs: { type: String, required: true },
        images: [{ path: { type: String } }],
    }))
}