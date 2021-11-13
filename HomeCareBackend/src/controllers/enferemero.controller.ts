import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Enfermero} from '../models';
import {EnfermeroRepository} from '../repositories';

export class EnferemeroController {
  constructor(
    @repository(EnfermeroRepository)
    public enfermeroRepository : EnfermeroRepository,
  ) {}

  @post('/enfermeros')
  @response(200, {
    description: 'Enfermero model instance',
    content: {'application/json': {schema: getModelSchemaRef(Enfermero)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enfermero, {
            title: 'NewEnfermero',
            exclude: ['id'],
          }),
        },
      },
    })
    enfermero: Omit<Enfermero, 'id'>,
  ): Promise<Enfermero> {
    return this.enfermeroRepository.create(enfermero);
  }

  @get('/enfermeros/count')
  @response(200, {
    description: 'Enfermero model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Enfermero) where?: Where<Enfermero>,
  ): Promise<Count> {
    return this.enfermeroRepository.count(where);
  }

  @get('/enfermeros')
  @response(200, {
    description: 'Array of Enfermero model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Enfermero, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Enfermero) filter?: Filter<Enfermero>,
  ): Promise<Enfermero[]> {
    return this.enfermeroRepository.find(filter);
  }

  @patch('/enfermeros')
  @response(200, {
    description: 'Enfermero PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enfermero, {partial: true}),
        },
      },
    })
    enfermero: Enfermero,
    @param.where(Enfermero) where?: Where<Enfermero>,
  ): Promise<Count> {
    return this.enfermeroRepository.updateAll(enfermero, where);
  }

  @get('/enfermeros/{id}')
  @response(200, {
    description: 'Enfermero model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Enfermero, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Enfermero, {exclude: 'where'}) filter?: FilterExcludingWhere<Enfermero>
  ): Promise<Enfermero> {
    return this.enfermeroRepository.findById(id, filter);
  }

  @patch('/enfermeros/{id}')
  @response(204, {
    description: 'Enfermero PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enfermero, {partial: true}),
        },
      },
    })
    enfermero: Enfermero,
  ): Promise<void> {
    await this.enfermeroRepository.updateById(id, enfermero);
  }

  @put('/enfermeros/{id}')
  @response(204, {
    description: 'Enfermero PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() enfermero: Enfermero,
  ): Promise<void> {
    await this.enfermeroRepository.replaceById(id, enfermero);
  }

  @del('/enfermeros/{id}')
  @response(204, {
    description: 'Enfermero DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.enfermeroRepository.deleteById(id);
  }
}
