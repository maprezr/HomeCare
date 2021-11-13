import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {HomecareDsDataSource} from '../datasources';
import {OtrosServicios, OtrosServiciosRelations} from '../models';

export class OtrosServiciosRepository extends DefaultCrudRepository<
  OtrosServicios,
  typeof OtrosServicios.prototype.id,
  OtrosServiciosRelations
> {
  constructor(
    @inject('datasources.homecareDS') dataSource: HomecareDsDataSource,
  ) {
    super(OtrosServicios, dataSource);
  }
}
