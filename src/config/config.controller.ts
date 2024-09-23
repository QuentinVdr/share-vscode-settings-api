import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConfigDocument } from './config.model';
import { ConfigService } from './config.service';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Post()
  async create(@Body() config: ConfigDocument) {
    return this.configService.create(config);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.configService.findById(id);
  }
}
