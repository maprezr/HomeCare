import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {HomecareDsDataSource} from '../datasources';
import {Enfermero, EnfermeroRelations, Persona, SolicitudServicio} from '../models';
import {PersonaRepository} from './persona.repository';
import {SolicitudServicioRepository} from './solicitud-servicio.repository';

export class EnfermeroRepository extends DefaultCrudRepository<
  Enfermero,
  typeof Enfermero.prototype.id,
  EnfermeroRelations
> {

  public readonly persona: HasOneRepositoryFactory<Persona, typeof Enfermero.prototype.id>;

  public readonly solicitudServicios: HasManyRepositoryFactory<SolicitudServicio, typeof Enfermero.prototype.id>;

  constructor(
    @inject('datasources.homecareDS') dataSource: HomecareDsDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('SolicitudServicioRepository') protected solicitudServicioRepositoryGetter: Getter<SolicitudServicioRepository>,
  ) {
    super(Enfermero, dataSource);
    this.solicitudServicios = this.createHasManyRepositoryFactoryFor('solicitudServicios', solicitudServicioRepositoryGetter,);
    this.registerInclusionResolver('solicitudServicios', this.solicitudServicios.inclusionResolver);
    this.persona = this.createHasOneRepositoryFactoryFor('persona', personaRepositoryGetter);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
