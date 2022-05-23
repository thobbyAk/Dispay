import * as moongose from 'mongoose';
import { Member } from 'src/member/member.model';

export const ClubSchema = new moongose.Schema({
    name: String,
    description: String,
    monthlySubscriptionPrice:Number,
    members: [{ type: moongose.Schema.Types.ObjectId, ref: 'Member'}]

});


export interface Club extends moongose.Document {
    name: String;
    description: String;
    monthlySubscriptionPrice: Number;
}