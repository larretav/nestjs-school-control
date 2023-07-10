import { Injectable } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';

@Injectable()
export class SeedService {
  
  constructor(
    // Aqui se inyectan todos los services para llenar la bd
  )
  { }
  
  async execudeSeed() {

    // await this.pokemonModel.deleteMany(); // Borrar todo antes de insertar 

    // // MÉTODO CON MAP()
    // const pokemonsToInsert = data.results.map(({ name, url }) => {
    //   const segments = url.split('/');
    //   const no: number = +segments[segments.length - 2];

    //   return { name, no };
    // });

    // await this.pokemonModel.insertMany(pokemonsToInsert);

    return 'Seed executed';
  }
}
