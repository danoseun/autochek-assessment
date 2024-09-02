import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Valuation } from './entities/valuation.entity';
import { LoanApplication } from './entities/loan-application.entity';
import { VehicleController } from './controllers/vehicle.controller';
import { LoanApplicationController } from './controllers/loan-application.controller';
import { ValuationController } from './controllers/valuation.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Vehicle, Valuation, LoanApplication],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Vehicle, Valuation, LoanApplication]),
  ],
  controllers: [VehicleController, LoanApplicationController, ValuationController],
  providers: [],
})
export class AppModule {}

