import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a aquatic center.
 */
export interface AquaticCenterResource extends BaseResource {
  /**
   * Unique identifier for the reservation.
   */
  id:           number;
  name:         string;
  activityType: string;
  capacity:     number;
  latitude:     number;
  longitude:    number;

}

/**
 * Response envelope for reservation collection queries.
 */
export interface AquaticCentersResponse extends BaseResponse {
  /**
   * An Array for reservation resources included in the response.
   */
  aquaticCenters: AquaticCenterResource[];
}
