/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsController } from './payment/payments-controller/payments-controller.controller';
import { PaymentService } from './payment/payments-service/payment.service';
import { PaymentModule } from './payment/payments.module';
import {ConfigModule} from '@nestjs/config';
import  authorizeConfig from './config/authorize.config';
//import {authorizeModule} from '';

@Module({
  imports: [PaymentModule,ConfigModule.forRoot({isGlobal:true,load:[authorizeConfig]})],
  controllers: [AppController, PaymentsController],
  providers: [AppService, PaymentService],
})
export class AppModule {}
