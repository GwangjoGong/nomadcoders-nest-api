import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(movieId: number): Movie {
    const movie = this.movies.find(movie => movie.id === movieId);
    if (!movie) {
      throw new NotFoundException(`Movie with id:${movieId} not found.`);
    }
    return movie;
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length,
      ...movieData,
    });
  }

  delete(movieId: number) {
    this.getOne(movieId);
    this.movies.filter(movie => movie.id !== movieId);
  }

  patch(movieId: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(movieId);
    this.delete(movieId);
    this.movies.push({
      ...movie,
      ...updateData,
    });
  }
}
