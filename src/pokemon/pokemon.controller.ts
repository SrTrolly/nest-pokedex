import { Controller, Get, Post, Body, Patch, Param, Delete, } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';

@Controller('pokemon')
export class PokemonController {

  constructor(private readonly pokemonService: PokemonService) { }

  @Post()
  // @HttpCode(HttpStatus.OK)
  create(@Body() createPokemonDto: CreatePokemonDto) {

    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':termino')
  findOne(@Param('termino') termino: string) {
    console.log(termino);
    return this.pokemonService.findOne(termino);
  }

  @Patch(':termino')
  update(@Param('termino') termino: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(termino, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}