import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Enfermero,
  Persona,
} from '../models';
import {EnfermeroRepository} from '../repositories';

export class EnfermeroPersonaController {
  constructor(
    @repository(EnfermeroRepository) protected enfermeroRepository: EnfermeroRepository,
  ) { }

  @get('/enfermeros/{id}/persona', {
    responses: {
      '200': {
        description: 'Enfermero has one Persona',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Persona),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Persona>,
  ): Promise<Persona> {
    return this.enfermeroRepository.persona(id).get(filter);
  }

  @post('/enfermeros/{id}/persona', {
    responses: {
      '200': {
        description: 'Enfermero model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Enfermero.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersonaInEnfermero',
            exclude: ['id'],
            optional: ['enfermeroId']
          }),
        },
      },
    }) persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    return this.enfermeroRepository.persona(id).create(persona);
  }

  @patch('/enfermeros/{id}/persona', {
    responses: {
      '200': {
        description: 'Enfermero.Persona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Partial<Persona>,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.enfermeroRepository.persona(id).patch(persona, where);
  }

  @del('/enfermeros/{id}/persona', {
    responses: {
      '200': {
        description: 'Enfermero.Persona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.enfermeroRepository.persona(id).delete(where);
  }
}
