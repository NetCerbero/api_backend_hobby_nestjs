import { Type } from "class-transformer";
import { ArrayMinSize, arrayMinSize, IsArray, IsBoolean, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, ValidateIf, ValidateNested } from "class-validator";

export class CreateSaleProductDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    displayName:string;

    @IsOptional()
    @ValidateIf((object, value) => value !== null || value !== undefined)
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    sku:string;

    @IsOptional()
    @ValidateIf((object, value) => value !== null )
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    shortDescription:string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    type:string;


    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
    isActive:boolean;

    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
    canBeSold:boolean;

    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
    canBeBought:boolean;

    @IsDefined()
    @IsNumber()
    @Min(1)
    categoryId:number;  
    

    @IsDefined()
    @ValidateNested({each:true})
    @IsArray()
    @ArrayMinSize(1)
    @Type(()=> CreateSaleProductBranch)
    avaibleInBranch:CreateSaleProductBranch[]
}


export class CreateSaleProductBranch{

    @IsDefined()
    @IsNumber()
    @Min(0)
    stock: number;

    @IsDefined()
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    price: number;

    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
    isActive:boolean;

    @IsDefined()
    @IsNumber()
    @Min(1)
    branchId:number;
}
