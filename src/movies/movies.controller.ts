import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'this will return all movies';
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `Trying to search movies made after : ${searchingYear}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: string) {
    return 'this will return movie ' + movieId;
  }

  @Post()
  create(@Body() movieData) {
    console.log(movieData);
    return movieData;
  }

  @Delete(':id')
  delete(@Param('id') movieId: string) {
    return 'this will delete a movie ' + movieId;
  }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updated: movieId,
      ...updateData,
    };
  }
}
