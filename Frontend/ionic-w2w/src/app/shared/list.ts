import { Content } from './content';

export interface List {
  id: number;
  title: string;
  icon: string;
  films: Content[];
}
