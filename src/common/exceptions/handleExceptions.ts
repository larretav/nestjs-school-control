import { BadRequestException, InternalServerErrorException, Logger } from "@nestjs/common";

export class HandleExceptions {
  private readonly logger = new Logger();

  handleExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);


    this.logger.error(error);
    throw new InternalServerErrorException('Ayuda we :\'v')
  }
}