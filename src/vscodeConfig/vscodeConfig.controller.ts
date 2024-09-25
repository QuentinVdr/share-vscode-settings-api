import { Body, Controller, Delete, Get, Logger, Param, Post } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { VscodeConfig } from './vscodeConfig.model';
import { VscodeConfigService } from './vscodeConfig.service';

@Controller('vscode-config')
@ApiSecurity('X-API-Key')
export class VscodeConfigController {
  private readonly logger = new Logger(VscodeConfigController.name);

  constructor(private readonly vscodeConfigService: VscodeConfigService) {}

  @Post()
  async create(@Body() vscodeConfig: VscodeConfig): Promise<VscodeConfig> {
    this.logger.log(`Creating vscode config: ${JSON.stringify(vscodeConfig)}`);
    return this.vscodeConfigService.create(vscodeConfig);
  }

  @Get()
  async findAll(): Promise<VscodeConfig[]> {
    this.logger.log('Finding all vscode configs');
    return this.vscodeConfigService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<VscodeConfig> {
    this.logger.log(`Finding vscode config by id: ${id}`);
    return this.vscodeConfigService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.logger.log(`Deleting vscode config by id: ${id}`);
    this.vscodeConfigService.delete(id);
  }
}
