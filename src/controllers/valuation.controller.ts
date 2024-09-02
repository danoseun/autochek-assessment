import { Controller, Post, Param } from '@nestjs/common';
import { ValuationService } from '../services/valuation.service';

@Controller('vehicles')
export class ValuationController {
  constructor(private readonly valuationService: ValuationService) {}

  @Post(':vin/valuation')
  getValuation(@Param('vin') vin: string) {
    return this.valuationService.getVehicleValuation(vin);
  }
}
