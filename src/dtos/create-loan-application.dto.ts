import { IsInt, IsEnum } from 'class-validator';
import { LoanStatus } from '../entities/loan-application.entity';

export class CreateLoanApplicationDto {
  @IsInt()
  vehicleId: number;

  @IsInt()
  loanAmount: number;
    static loanAmount: number;
}
