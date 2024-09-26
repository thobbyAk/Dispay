import * as moongose from 'mongoose';

export const MemberSchema = new moongose.Schema({
    name: String,
    walletAddress: String,
});


export interface Member extends moongose.Document {
    name: String;
    walletAddress: String;
}