import {AquaticCenter} from '../domain/model/aquatic-center.entity';
import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {AquaticCenterResource, AquaticCentersResponse} from './aquatic-centers-response';

/**
 * Maps AquaticCenter entities to and from API resources.
 */
export class AquaticCenterAssembler implements BaseAssembler<AquaticCenter, AquaticCenterResource, AquaticCentersResponse> {

  /**
   * Converts a CategoriesResponse to an array of AquaticCenter entities.
   * @param response - The API response containing categories.
   * @returns An array of AquaticCenter entities.
   */
  toEntitiesFromResponse = (response: AquaticCentersResponse): AquaticCenter[] =>
    response.aquaticCenters.map(resource => this.toEntityFromResource(resource as AquaticCenterResource));

  /**
   * Converts a AquaticCenterResource to a AquaticCenter entity.
   * @param resource - The resource to convert.
   * @returns The converted AquaticCenter entity.
   */
  toEntityFromResource = (resource: AquaticCenterResource): AquaticCenter =>
    new AquaticCenter({
      id: resource.id,
      name: resource.name,
      activityType : resource.activityType,
      capacity     : resource.capacity,
      latitude     : resource.latitude,
      longitude    : resource.longitude

    });

  /**
   * Converts a AquaticCenter entity to a AquaticCenterResource.
   * @param entity - The entity to convert.
   * @returns The converted AquaticCenterResource.
   */
  toResourceFromEntity = (entity: AquaticCenter): AquaticCenterResource =>
    ({
      id: entity.id,
      name: entity.name,
      activityType : entity.activityType,
      capacity     : entity.capacity,
      latitude     : entity.latitude,
      longitude    : entity.longitude
    } as AquaticCenterResource);


}
