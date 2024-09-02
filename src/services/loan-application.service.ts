import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoanApplication, LoanStatus } from '../entities/loan-application.entity';
import { CreateLoanApplicationDto } from '../dtos/create-loan-application.dto';
import { Vehicle } from '../entities/vehicle.entity';

@Injectable()
export class LoanApplicationService {
  constructor(
    @InjectRepository(LoanApplication)
    private loanApplicationRepository: Repository<LoanApplication>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async createLoanApplication(loanData: LoanApplication): Promise<LoanApplication> {
    const vehicle = await this.vehicleRepository.findOne(CreateLoanApplicationDto.vehicleId);

    const loanApplication = new LoanApplication();
    loanApplication.vehicle = vehicle;
    loanApplication.loanAmount = CreateLoanApplicationDto.loanAmount;
    loanApplication.createdAt = new Date();
    loanApplication.status = LoanStatus.PENDING;

    return this.loanApplicationRepository.save(loanApplication);
  }

  async updateLoanStatus(id: number, status: LoanStatus): Promise<LoanApplication> {
    const loanApplication = await this.loanApplicationRepository.findOne(id);
    if (!loanApplication) {
      throw new NotFoundException('Loan application not found');
    }

    loanApplication.status = status;
    return this.loanApplicationRepository.save(loanApplication);
  }
}
