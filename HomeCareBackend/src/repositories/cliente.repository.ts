import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {HomecareDsDataSource} from '../datasources';
import {Cliente, ClienteRelations, Persona, SolicitudServicio} from '../models';
import {PersonaRepository} from './persona.repository';
import {SolicitudServicioRepository} from './solicitud-servicio.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly persona: HasOneRepositoryFactory<Persona, typeof Cliente.prototype.id>;

  public readonly solicitudServicios: HasManyRepositoryFactory<SolicitudServicio, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.homecareDS') dataSource: HomecareDsDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('SolicitudServicioRepository') protected solicitudServicioRepositoryGetter: Getter<SolicitudServicioRepository>,
  ) {
    super(Cliente, dataSource);
    this.solicitudServicios = this.createHasManyRepositoryFactoryFor('solicitudServicios', solicitudServicioRepositoryGetter,);
    this.registerInclusionResolver('solicitudServicios', this.solicitudServicios.inclusionResolver);
    this.persona = this.createHasOneRepositoryFactoryFor('persona', personaRepositoryGetter);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
