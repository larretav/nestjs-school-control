import { Injectable } from '@nestjs/common';
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
  
  async runSeed() {

    // this.userRepository.in
    return 'ok';
  }
}
