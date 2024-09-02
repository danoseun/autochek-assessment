import { IsString, IsInt } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  vin: string;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsInt()
  year: number;

  @IsInt()
  mileage: number;
}
