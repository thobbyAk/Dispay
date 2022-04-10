import { IsNumber, IsOptional, IsDefined , IsMongoId} from 'class-validator';
  
export class UpdateClubDto {
    @IsOptional()
    name: string;

    @IsOptional()
    description:String

    @IsOptional()
    monthlySubscriptionPrice:Number
}