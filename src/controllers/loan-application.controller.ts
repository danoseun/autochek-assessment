import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { LoanApplicationService } from '../services/loan-application.service';
import { CreateLoanApplicationDto } from '../dtos/create-loan-application.dto';
import { UpdateLoanStatusDto } from '../dtos/update-loan-status.dto';

@Controller('loan-applications')
export class LoanApplicationController {
  constructor(private readonly loanApplicationService: LoanApplicationService) {}

  @Post()
  create(@Body() createLoanApplicationDto: CreateLoanApplicationDto) {
    return this.loanApplicationService.createLoanApplication(createLoanApplicationDto);
  }

  @Patch('/:id/status')
  updateStatus(@Param('id') id: number, @Body() updateLoanStatusDto: UpdateLoanStatusDto) {
    return this.loanApplicationService.updateLoanStatus(id, updateLoanStatusDto.status);
  }
}
