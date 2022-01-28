import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

export class ListData implements InMemoryDbService {
  createDb() {
    let lists = [
      {
        id: 0,
        title: 'Me gusta',
        icon: 'heart',
        films: [
          {
            id: 0,
            title: 'Spiderman 2',
            actors: ['Filomeno', 'Pedro', 'María'],
            date: new Date('2021-12-26T08:00'),
            description:
              'Pelicula muy buena donde una araña muerde a un hombre.',
            genders: ['Acción', 'Drama'],
            images: [],
            trailers: [],
            duration: 120,
          },
        ],
      },
      {
        id: 1,
        title: 'Para Asier',
        icon: 'star',
        films: [
          {
            id: 2,
            title: 'Spiderman 3',
            actors: ['Filomeno', 'Pedro', 'María'],
            date: new Date('2021-12-26T08:00'),
            description:
              'Pelicula muy buena donde una araña muerde a un hombre.',
            genders: ['Acción', 'Drama'],
            images: [],
            trailers: [],
            duration: 120,
          },
          {
            id: 3,
            title: 'Spiderman 105',
            actors: ['Filomeno', 'Pedro', 'María'],
            date: new Date('2021-12-26T08:00'),
            description:
              'Pelicula muy buena donde una araña muerde a un hombre.',
            genders: ['Acción', 'Drama'],
            images: [],
            trailers: [],
            duration: 120,
          },
        ],
      },
    ];
    return { lists: lists };
  }
}
