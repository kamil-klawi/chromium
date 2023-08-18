import { FormControl } from '@angular/forms';

export interface ApartmentResponse {
  id: number;
  name: string;
  location: string;
  image: string;
  area: string;
  floor: string;
  price: string;
  description: string;
}

export type PostApartment = Omit<ApartmentResponse, 'id'>;

export class Apartment implements ApartmentResponse {
  constructor(
    public id: number,
    public name: string,
    public location: string,
    public image: string,
    public area: string,
    public floor: string,
    public price: string,
    public description: string,
  ) {}
}

export interface GetApartmentsResponse {
  apartments: Apartment[];
  totalCount: number;
}

export interface PostApartmentForm {
  name: FormControl<string>;
  location: FormControl<string>;
  image: FormControl<string>;
  area: FormControl<string>;
  floor: FormControl<string>;
  price: FormControl<string>;
  description: FormControl<string>;
}
