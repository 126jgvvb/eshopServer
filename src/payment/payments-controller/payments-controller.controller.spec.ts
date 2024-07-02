import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsControllerController } from './payments-controller.controller';

describe('PaymentsControllerController', () => {
  let controller: PaymentsControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsControllerController],
    }).compile();

    controller = module.get<PaymentsControllerController>(
      PaymentsControllerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
