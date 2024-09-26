import { IsNumber, IsOptional, IsDefined , IsMongoId} from 'class-validator';
  
export class CreateClubDto {
    @IsDefined()
    name: string;

    @IsDefined()
    description:Number

    @IsNumber()
    @IsDefined()
    monthlySubscriptionPrice:String
}