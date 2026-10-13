import {computed, inject, Service, Signal, signal} from '@angular/core';
import {AquaticCenter} from '../domain/model/aquatic-center.entity';
import {Reservation} from '../domain/model/reservation.entity';
import {AquaticCentersService} from '../infrastructure/aquatic-centers-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';

/**
 * Holds learning application state and coordinates reservation/category application layer behavior.
 */
@Service()
export class AquaticCentersStore {
  private readonly aquaticCenterService = inject(AquaticCentersService);

  /**
   * Computed signal for the count of reservations.
   */
  readonly reservationCount = computed(() => this.reservations().length);

  /**
   * Computed signal for the count of aquatic centers.
   */
  readonly aquaticCenterCount = computed(() => this.aquaticCenters().length);

  private readonly reservationsSignal = signal<Reservation[]>([]);

  /**
   * Readonly signal for the list of reservation.
   */
  readonly reservations = this.reservationsSignal.asReadonly();

  private readonly aquaticCentersSignal = signal<AquaticCenter[]>([]);

  /**
   * Readonly signal for the list of aquatic centers.
   */
  readonly aquaticCenters = this.aquaticCentersSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);

  /**
   * Readonly signal indicating if data is loading.
   */
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);

  /**
   * Readonly signal for the current error message.
   */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Creates an instance of LearningStore and loads initial data.
   */
  constructor() {
    this.loadAquaticCenters();
    this.loadReservations();
  }

  /**
   * Selects a category by identifier.
   * @param id - Category identifier.
   * @returns Reactive selection for the requested category.
   */
  getAquaticCenterById = (id: number): Signal<AquaticCenter | undefined> =>
    computed(() => id ? this.aquaticCenters().find(c => c.id === id) : undefined);

  /**
   * Selects a reservation by identifier.
   * @param id - reservation identifier.
   * @returns Reactive selection for the requested reservation.
   */
  getReservationById = (id: number): Signal<Reservation | undefined> => {
    return computed(() => id ? this.reservations().find(c => c.id === id) : undefined);
  }

  /**
   * adds a new reservation.
   * @param reservation - The reservation to add.
   */
  addReservation = (reservation: Reservation): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.aquaticCenterService.createReservation(reservation).pipe(retry(2)).subscribe({
      next: createdReservation => {
        this.reservationsSignal.update(reservations => [...reservations, createdReservation]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create reservation'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Updates an existing reservation.
   * @param updatedReservation - The reservation to update.
   */
  updateReservation = (updatedReservation: Reservation): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.aquaticCenterService.updateReservation(updatedReservation).pipe(retry(2)).subscribe({
      next: reservation => {
        this.reservationsSignal.update(reservations =>
          reservations.map(r => r.id === reservation.id ? reservation : r)
        );
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update course'));
        this.loadingSignal.set(false);
      }
    });
  }


  /**
   * Loads all reservations
   */
  private loadReservations = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.aquaticCenterService.getReservations().pipe(takeUntilDestroyed()).subscribe({
      next: reservations => {
        console.log(reservations);
        this.reservationsSignal.set(reservations);
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
        this.assignAquaticCentersToReservations();


      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load courses'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Loads all categories from the API.
   */
  private loadAquaticCenters = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.aquaticCenterService.getAquaticCenters().pipe(takeUntilDestroyed()).subscribe({
      next: aquaticCenters => {
        this.aquaticCentersSignal.set(aquaticCenters);
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load aquatic centers'));
        this.loadingSignal.set(false);
      }
    });
  }

  private assignAquaticCentersToReservations = (): void => {
    this.reservationsSignal.update(reservations => reservations.map(reservation => this.assignAquaticCenterToReservation(reservation)));
  };

  private assignAquaticCenterToReservation = (reservation: Reservation): Reservation => {
    const aquaticCenterId = reservation.aquaticCenterId ?? 0;
    //reservation.aquaticCenterId = aquaticCenterId ? this.getCategoryById(aquaticCenterId)() ?? null : null;
    return reservation;
  }

  /**
   * Normalizes unknown errors into a display-friendly message.
   */
  private formatError = (error: unknown, fallback: string): string => {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  }
}
