import {Reservation} from '../domain/model/reservation.entity';
import {ReservationResource, ReservationsResponse} from './reservations-response';

import {BaseAssembler} from '../../shared/infrastructure/base-assembler';

/**
 * Maps Reservation entities to and from API resources.
 */
export class ReservationAssembler implements BaseAssembler<Reservation, ReservationResource, ReservationsResponse> {
  /**
   * Converts a ReservationsResponse to an array of Reservation entities.
   * @param response - The API response containing Reservations.
   * @returns An array of Reservation entities.
   */
  toEntitiesFromResponse = (response: ReservationsResponse): Reservation[] => {
    console.log(response);
    return response.reservations.map(resource => this.toEntityFromResource(resource as ReservationResource));
  };

  /**
   * Converts a ReservationResource to a Reservation entity.
   * @param resource - The resource to convert.
   * @returns The converted Reservation entity.
   */
  toEntityFromResource = (resource: ReservationResource): Reservation =>
    new Reservation({
      id: resource.id,
      aquaticCenterId : resource.aquaticCenterId,
      activityType    : resource.activityType,
      participantName : resource.participantName,
      participants    : resource.participants,
      weatherTemperature: resource.weatherTemperature,
      reservedAt      : (resource.reservedAt)
    });


  /**
   * Converts a Reservation entity to a ReservationResource.
   * @param entity - The entity to convert.
   * @returns The converted ReservationResource.
   */
  toResourceFromEntity = (entity: Reservation): ReservationResource =>
    ({
      id: entity.id,
      aquaticCenterId : entity.aquaticCenterId,
      activityType    : entity.activityType,
      participantName : entity.participantName,
      participants    : entity.participants,
      weatherTemperature: entity.weatherTemperature,
      reservedAt      : (entity.reservedAt)
    } as ReservationResource);

}
