import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AquaticCentersStore} from '../../../application/aquatic-centers.store';
import {Reservation} from '../../../domain/model/reservation.entity';
import {AquaticCenter} from '../../../domain/model/aquatic-center.entity';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-reservation-form',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInput,
    ReactiveFormsModule
  ],
  styleUrl: './reservation-form.css',
  templateUrl: './reservation-form.html',
})
export class ReservationForm {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(AquaticCentersStore);


  form = this.fb.group({
    activityType: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    participantName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    participants: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(1)] }),
    weatherTemperature: new FormControl<number | null>(null, { validators: [Validators.required] }),
    aquaticCenterId: new FormControl<number | null>(null),
    reservedAt: new FormControl<string | null>(null, { validators: [Validators.required] })
  });

  aquaticCenters = this.store.aquaticCenters;

  /**
   * Indicates if the form is in edit mode.
   */
  isEdit = false;

  reservationId : number | null = null;

  constructor() {
    this.route.params.subscribe(params => {
      this.reservationId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.reservationId;
      if (this.isEdit && this.reservationId) {
        const id = this.reservationId;
        const reservation = this.store.getReservationById(id)();
        if (reservation) {
          this.form.patchValue({
            activityType: reservation.activityType,
            participantName: reservation.participantName,
            participants: reservation.participants,
            weatherTemperature: reservation.weatherTemperature,
            aquaticCenterId: reservation.aquaticCenterId
          });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;
    const reservation: Reservation = new Reservation({
      id: this.reservationId ?? 0,
      aquaticCenterId: this.form.value.aquaticCenterId ?? 0,
      activityType: this.form.value.activityType!,
      participantName: this.form.value.participantName!,
      participants: this.form.value.participants ?? 0,
      weatherTemperature: this.form.value.weatherTemperature ?? 0,
      reservedAt: this.form.value.reservedAt ?? "",
    });

    if (this.isEdit) {
    } else {
      this.store.addReservation(reservation);
    }

    this.router.navigate(['aquatic-centers/reservations']).then();

  }
}
