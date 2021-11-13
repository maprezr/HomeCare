import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {HomecareDsDataSource} from '../datasources';
import {Factura, FacturaRelations, Cliente, Enfermero, OtrosServicios, SolicitudServicio} from '../models';
import {ClienteRepository} from './cliente.repository';
import {EnfermeroRepository} from './enfermero.repository';
import {OtrosServiciosRepository} from './otros-servicios.repository';
import {SolicitudServicioRepository} from './solicitud-servicio.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly cliente: HasOneRepositoryFactory<Cliente, typeof Factura.prototype.id>;

  public readonly enfermero: HasOneRepositoryFactory<Enfermero, typeof Factura.prototype.id>;

  public readonly otrosServicios: HasManyRepositoryFactory<OtrosServicios, typeof Factura.prototype.id>;

  public readonly solicitudServicio: HasOneRepositoryFactory<SolicitudServicio, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.homecareDS') dataSource: HomecareDsDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('EnfermeroRepository') protected enfermeroRepositoryGetter: Getter<EnfermeroRepository>, @repository.getter('OtrosServiciosRepository') protected otrosServiciosRepositoryGetter: Getter<OtrosServiciosRepository>, @repository.getter('SolicitudServicioRepository') protected solicitudServicioRepositoryGetter: Getter<SolicitudServicioRepository>,
  ) {
    super(Factura, dataSource);
    this.solicitudServicio = this.createHasOneRepositoryFactoryFor('solicitudServicio', solicitudServicioRepositoryGetter);
    this.registerInclusionResolver('solicitudServicio', this.solicitudServicio.inclusionResolver);
    this.otrosServicios = this.createHasManyRepositoryFactoryFor('otrosServicios', otrosServiciosRepositoryGetter,);
    this.registerInclusionResolver('otrosServicios', this.otrosServicios.inclusionResolver);
    this.enfermero = this.createHasOneRepositoryFactoryFor('enfermero', enfermeroRepositoryGetter);
    this.registerInclusionResolver('enfermero', this.enfermero.inclusionResolver);
    this.cliente = this.createHasOneRepositoryFactoryFor('cliente', clienteRepositoryGetter);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
