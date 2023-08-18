import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Subscription,
  merge,
  startWith,
  switchMap,
  map,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Apartment } from '../core/models/apartment.model';
import { ApartmentsService } from '../core/services/apartments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss'],
})
export class ApartmentsComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'lp',
    'name',
    'location',
    'area',
    'floor',
    'price',
    'buttons',
  ];
  dataSource!: MatTableDataSource<Apartment>;
  totalCount = 0;
  filterValue = new FormControl('', { nonNullable: true });
  sub = new Subscription();
  apartment!: Apartment;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apartmentsService: ApartmentsService,
    private route: Router,
  ) {}

  get currentUrl() {
    return this.route.url;
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub.add(
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            const pageIndex = this.paginator.pageIndex + 1;
            const itemsPerPage = this.paginator.pageSize;
            const sortDirection = this.sort.direction;
            const sortColumnName = this.sort.active;
            return this.apartmentsService.getApartments(
              pageIndex,
              itemsPerPage,
              sortDirection,
              sortColumnName,
            );
          }),
          map((data) => {
            this.totalCount = data.totalCount;
            return data.apartments;
          }),
        )
        .subscribe((apartments) => {
          this.dataSource = new MatTableDataSource<Apartment>(apartments);
        }),
    );

    this.sub.add(
      this.filterValue.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((value: string) => {
          const val = value?.trim();
          this.applyFilter(val);
        }),
    );
  }

  applyFilter(value: string) {
    const pageIndex = this.paginator.pageIndex + 1;
    const itemsPerPage = this.paginator.pageSize;
    const sortDirection = this.sort.direction;
    const sortColumnName = this.sort.active;

    this.apartmentsService
      .getApartments(
        pageIndex,
        itemsPerPage,
        sortDirection,
        sortColumnName,
        value,
      )
      .subscribe({
        next: (resp) => {
          this.totalCount = resp.totalCount;
          this.dataSource = new MatTableDataSource<Apartment>(resp.apartments);
        },
      });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
