
import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';


@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) { }

  async executeSeed() {
    const data = await this.http.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=10");

    // const insertPromisesArray = [];

    const pokemonToInsert: { name: string, no: number }[] = [];

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split("/");

      const no: number = +segments[segments.length - 2];
      // try {
      //   await this.pokemonModel.create({ name: name, no: no });
      // } catch (error) {
      //   throw new BadRequestException(`Pokemon no pudo se ingresado a la base de dato`);
      // }

      // insertPromisesArray.push(
      //   this.pokemonModel.create({ name, no })
      // )

      pokemonToInsert.push({ name, no });

    });


    await this.pokemonModel.insertMany(pokemonToInsert);

    return "seed execute";
  }
}
