import { IsEnum } from 'class-validator';
import { LoanStatus } from '../entities/loan-application.entity';

export class UpdateLoanStatusDto {
  @IsEnum(LoanStatus)
  status: LoanStatus;
}
