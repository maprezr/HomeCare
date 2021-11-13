import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {HomecareDsDataSource} from '../datasources';
import {SolicitudServicio, SolicitudServicioRelations, Cliente, Enfermero, OtrosServicios, Factura} from '../models';
import {ClienteRepository} from './cliente.repository';
import {EnfermeroRepository} from './enfermero.repository';
import {OtrosServiciosRepository} from './otros-servicios.repository';
import {FacturaRepository} from './factura.repository';

export class SolicitudServicioRepository extends DefaultCrudRepository<
  SolicitudServicio,
  typeof SolicitudServicio.prototype.id,
  SolicitudServicioRelations
> {

  public readonly cliente: HasOneRepositoryFactory<Cliente, typeof SolicitudServicio.prototype.id>;

  public readonly Enfermero: HasOneRepositoryFactory<Enfermero, typeof SolicitudServicio.prototype.id>;

  public readonly otrosServicios: HasManyRepositoryFactory<OtrosServicios, typeof SolicitudServicio.prototype.id>;

  public readonly factura: HasOneRepositoryFactory<Factura, typeof SolicitudServicio.prototype.id>;

  constructor(
    @inject('datasources.homecareDS') dataSource: HomecareDsDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('EnfermeroRepository') protected enfermeroRepositoryGetter: Getter<EnfermeroRepository>, @repository.getter('OtrosServiciosRepository') protected otrosServiciosRepositoryGetter: Getter<OtrosServiciosRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(SolicitudServicio, dataSource);
    this.factura = this.createHasOneRepositoryFactoryFor('factura', facturaRepositoryGetter);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
    this.otrosServicios = this.createHasManyRepositoryFactoryFor('otrosServicios', otrosServiciosRepositoryGetter,);
    this.registerInclusionResolver('otrosServicios', this.otrosServicios.inclusionResolver);
    this.Enfermero = this.createHasOneRepositoryFactoryFor('Enfermero', enfermeroRepositoryGetter);
    this.registerInclusionResolver('Enfermero', this.Enfermero.inclusionResolver);
    this.cliente = this.createHasOneRepositoryFactoryFor('cliente', clienteRepositoryGetter);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
