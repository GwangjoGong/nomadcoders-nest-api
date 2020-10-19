import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreateLength = service.getAll().length;
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2020,
      });
      const afterCreateLength = service.getAll().length;

      expect(afterCreateLength).toEqual(beforeCreateLength + 1);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2020,
      });

      const movie = service.getOne(0);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(0);
    });

    it('should throw not found error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with id:999 not found.');
      }
    });
  });

  describe('deleteOne', () => {
    it('should delete a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2020,
      });

      const allMovies = service.getAll();
      service.delete(0);
      const afterMovies = service.getAll();

      expect(afterMovies.length).toEqual(allMovies.length - 1);
    });

    it('should throw not found error', () => {
      try {
        service.delete(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with id:999 not found.');
      }
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2020,
      });

      service.patch(0, {
        title: 'Updated Test',
      });

      const updatedMovie = service.getOne(0);
      expect(updatedMovie.title).toEqual('Updated Test');
    });

    it('should throw not found error', () => {
      try {
        service.patch(999, {
          title: 'bullshit',
        });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with id:999 not found.');
      }
    });
  });
});
