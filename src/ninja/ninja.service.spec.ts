import { Test, TestingModule } from '@nestjs/testing';
import { NinjaService } from './ninja.service';

describe('NinjaService', () => {
  let service: NinjaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NinjaService],
    }).compile();

    service = module.get<NinjaService>(NinjaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
