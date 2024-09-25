import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { VscodeConfig } from './vscodeConfig.model';
import { VscodeConfigService } from './vscodeConfig.service';

@Controller('vscode-config')
@ApiSecurity('X-API-Key')
export class VscodeConfigController {
  constructor(private readonly vscodeConfigService: VscodeConfigService) {}

  @Post()
  async create(@Body() vscodeConfig: VscodeConfig): Promise<VscodeConfig> {
    return this.vscodeConfigService.create(vscodeConfig);
  }

  @Get()
  async findAll(): Promise<VscodeConfig[]> {
    return this.vscodeConfigService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<VscodeConfig> {
    return this.vscodeConfigService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.vscodeConfigService.delete(id);
  }
}
