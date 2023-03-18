import { IsBoolean, IsDefined, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateBusinessLocationDto {
    @IsDefined()
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    name:string;

    @IsDefined()
    @IsBoolean()
    @IsNotEmpty()
    default:boolean;
}
