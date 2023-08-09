import { FormControl } from '@angular/forms';

export interface ApartamentResponse {
  id: number;
  name: string;
  location: string;
  area: string;
  floor: string;
  price: string;
}

export type PostApartament = Omit<ApartamentResponse, 'id'>;

export class Apartament implements ApartamentResponse {
  constructor(
    public id: number,
    public name: string,
    public location: string,
    public area: string,
    public floor: string,
    public price: string,
  ) {}
}

export interface GetApartamentsResponse {
  clients: Apartament[];
  totalCount: number;
}

export interface PostApartamentForm {
  name: FormControl<string>;
  location: FormControl<string>;
  area: FormControl<string>;
  floor: FormControl<string>;
  price: FormControl<string>;
}
