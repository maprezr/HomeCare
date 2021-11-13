import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {HomecareDsDataSource} from '../datasources';
import {Persona, PersonaRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly cliente: HasOneRepositoryFactory<Cliente, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.homecareDS') dataSource: HomecareDsDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Persona, dataSource);
    this.cliente = this.createHasOneRepositoryFactoryFor('cliente', clienteRepositoryGetter);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
