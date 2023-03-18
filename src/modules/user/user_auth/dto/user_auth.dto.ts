import { IsDefined, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UserAuthDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    email:string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    password:string;
}
