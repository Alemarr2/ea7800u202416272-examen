import {AquaticCenter} from '../domain/model/aquatic-center.entity';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {AquaticCenterAssembler} from './aquatic-center-assembler';
import {AquaticCenterResource, AquaticCentersResponse} from './aquatic-centers-response';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

export class AquaticCentersApiEndpoint extends BaseApiEndpoint<AquaticCenter, AquaticCenterResource, AquaticCentersResponse, AquaticCenterAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderAquaticCentersEndpointPath}`, new AquaticCenterAssembler());
  }
}
