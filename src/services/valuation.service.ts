import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Valuation } from '../entities/valuation.entity';
import { Vehicle } from '../entities/vehicle.entity';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';

@Injectable()
export class ValuationService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @InjectRepository(Valuation)
    private valuationRepository: Repository<Valuation>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async getVehicleValuation(vin: string): Promise<Valuation> {
    const vehicle = await this.vehicleRepository.findOne({ where: { vin } });

    const options = {
      method: 'GET',
      url: this.configService.get<string>('VIN_LOOKUP_URL'),
      params: { vin },
      headers: {
        'x-rapidapi-key': this.configService.get<string>('RAPIDAPI_KEY'),
        'x-rapidapi-host': this.configService.get<string>('RAPIDAPI_HOST'),
      },
    };

    const estimatedValue = await this.httpService
      .request(options)
      .pipe(map((response) => response.data.estimatedValue))
      .toPromise();

    const valuation = new Valuation();
    valuation.vehicle = vehicle;
    valuation.estimatedValue = estimatedValue;
    valuation.createdAt = new Date();

    return this.valuationRepository.save(valuation);
  }
}
