import { Injectable } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SeedService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  )
  { }
  
  async execudeSeed() {

    this.userRepository.insert()
    return 'ok';
  }
}
