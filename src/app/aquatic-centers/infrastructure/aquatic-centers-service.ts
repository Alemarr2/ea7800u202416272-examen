import {inject, Service} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {AquaticCenter} from '../domain/model/aquatic-center.entity';
import {Reservation} from '../domain/model/reservation.entity';
import {AquaticCentersApiEndpoint} from './aquatic-centers-api-endpoint';
import {ReservationsApiEndpoint} from './reservations-api-endpoint';
import {HttpClient} from '@angular/common/http';


@Service()
export class AquaticCentersService extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly reservationsEndpoint = new ReservationsApiEndpoint(this.http);
  private readonly aquaticCentersEndpoint = new AquaticCentersApiEndpoint(this.http);

  /**
   * Retrieves all reservations.
   * @returns Stream with the reservation collection.
   */
  getReservations = (): Observable<Reservation[]> =>
    this.reservationsEndpoint.getAll();

  /**
   * Retrieves a single reservation by ID.
   * @param id - The ID of the reservation.
   * @returns An Observable of the reservation object.
   */
  getReservation = (id: number): Observable<Reservation> =>
    this.reservationsEndpoint.getById(id);

  /**
   * Creates a new reservation.
   * @param reservation - The reservation to create.
   * @returns An Observable of the created reservation object.
   */
  createReservation = (reservation: Reservation): Observable<Reservation> =>
    this.reservationsEndpoint.create(reservation);

  /**
   * Updates an existing reservation.
   * @param reservation - The reservation to update.
   * @returns An Observable of the updated reservation object.
   */
  updateReservation = (reservation: Reservation): Observable<Reservation> =>
    this.reservationsEndpoint.update(reservation, reservation.id);


  /**
   * Retrieves all categories.
   * @returns Stream with the category collection.
   */
  getCategories = (): Observable<AquaticCenter[]> =>
    this.aquaticCentersEndpoint.getAll();

  /**
   * Retrieves a single category by ID.
   * @param id - The ID of the category.
   * @returns An Observable of the Category object.
   */
  getCategory = (id: number): Observable<AquaticCenter> =>
    this.aquaticCentersEndpoint.getById(id);


}
