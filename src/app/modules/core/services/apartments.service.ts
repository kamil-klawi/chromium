import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  Apartment,
  ApartmentResponse,
  GetApartmentsResponse,
  PostApartment,
} from '../models/apartment.model';

@Injectable({
  providedIn: 'root',
})
export class ApartmentsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getApartments(
    pageIndex: number,
    itemsPerPage: number,
    sortDirection: string,
    sortColumnName: string,
    value = '',
  ): Observable<GetApartmentsResponse> {
    let params = new HttpParams()
      .append('_page', pageIndex)
      .append('_limit', itemsPerPage);

    if (sortColumnName) {
      params = params
        .append('_sort', sortColumnName)
        .append('_order', sortDirection);
    }

    if (value) {
      params = params.append('name_like', value);
    }

    return this.http
      .get<ApartmentResponse[]>(`${this.apiUrl}/apartments`, {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          if (!response.body) return { apartments: [], totalCount: 0 };
          const apartmentArray: Apartment[] = response.body.map(
            ({ id, name, location, image, area, floor, price, description }) =>
              new Apartment(
                id,
                name,
                location,
                image,
                area,
                floor,
                price,
                description,
              ),
          );

          const totalCount = Number(response.headers.get('X-Total-Count'));

          return { apartments: apartmentArray, totalCount };
        }),
      );
  }

  getApartment(id: number): Observable<Apartment> {
    return this.http
      .get<ApartmentResponse>(`${this.apiUrl}/apartments/${id}`)
      .pipe(
        map(
          ({ id, name, location, image, area, floor, price, description }) =>
            new Apartment(
              id,
              name,
              location,
              image,
              area,
              floor,
              price,
              description,
            ),
        ),
      );
  }

  postApartment(apartmentData: PostApartment): Observable<Apartment> {
    return this.http
      .post<ApartmentResponse>(`${this.apiUrl}/apartments`, apartmentData)
      .pipe(
        map(
          ({ id, name, location, image, area, floor, price, description }) =>
            new Apartment(
              id,
              name,
              location,
              image,
              area,
              floor,
              price,
              description,
            ),
        ),
      );
  }

  deleteApartment(id: number): Observable<Record<string, never>> {
    return this.http.delete<Record<string, never>>(
      `${this.apiUrl}/apartments/${id}`,
    );
  }

  putApartment(
    apartmentData: PostApartment,
    id: number,
  ): Observable<Apartment> {
    return this.http
      .put<ApartmentResponse>(`${this.apiUrl}/apartments/${id}`, apartmentData)
      .pipe(
        map(
          ({ id, name, location, image, area, floor, price, description }) =>
            new Apartment(
              id,
              name,
              location,
              image,
              area,
              floor,
              price,
              description,
            ),
        ),
      );
  }
}
