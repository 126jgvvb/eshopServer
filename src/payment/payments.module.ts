/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PaymentsController } from './payments-controller/payments-controller.controller';
import { PaymentService } from './payments-service/payment.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentService],
})
export class PaymentModule {}
