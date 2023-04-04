import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBranchDto {

    @ApiProperty({ example: "Branch", description: "Fillial nomi" })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: "1", description: "Tuman ID raqami" })
    @IsNumber()
    @IsNotEmpty()
    district_id: number

    @ApiProperty({ example: "1.0000, 1.0000", description: "Koordinatalar" })
    @IsString()
    @IsNotEmpty()
    location: string

    @ApiProperty({ example: "Address", description: "Manzil" })
    @IsString()
    @IsNotEmpty()
    address_name: string

    @ApiProperty({ example: "100000", description: "Pochta indeksi" })
    @IsString()
    @IsNotEmpty()
    zip_code: string

}