import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a reservation.
 */
export interface ReservationResource extends BaseResource {
  /**
   * Unique identifier for the reservation.
   */
  id: number;
  aquaticCenterId:    number;
  activityType:       string;
  participantName:    string;
  participants:       number;
  weatherTemperature: number;
  reservedAt:         string;

}

/**
 * Response envelope for reservation collection queries.
 */
export interface ReservationsResponse extends BaseResponse {
  /**
   * An Array for reservation resources included in the response.
   */
  reservations: ReservationResource[];
}
