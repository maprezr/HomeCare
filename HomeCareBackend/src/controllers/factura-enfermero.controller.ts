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
  Factura,
  Enfermero,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaEnfermeroController {
  constructor(
    @repository(FacturaRepository) protected facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/enfermero', {
    responses: {
      '200': {
        description: 'Factura has one Enfermero',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Enfermero),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Enfermero>,
  ): Promise<Enfermero> {
    return this.facturaRepository.enfermero(id).get(filter);
  }

  @post('/facturas/{id}/enfermero', {
    responses: {
      '200': {
        description: 'Factura model instance',
        content: {'application/json': {schema: getModelSchemaRef(Enfermero)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Factura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enfermero, {
            title: 'NewEnfermeroInFactura',
            exclude: ['id'],
            optional: ['facturaId']
          }),
        },
      },
    }) enfermero: Omit<Enfermero, 'id'>,
  ): Promise<Enfermero> {
    return this.facturaRepository.enfermero(id).create(enfermero);
  }

  @patch('/facturas/{id}/enfermero', {
    responses: {
      '200': {
        description: 'Factura.Enfermero PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enfermero, {partial: true}),
        },
      },
    })
    enfermero: Partial<Enfermero>,
    @param.query.object('where', getWhereSchemaFor(Enfermero)) where?: Where<Enfermero>,
  ): Promise<Count> {
    return this.facturaRepository.enfermero(id).patch(enfermero, where);
  }

  @del('/facturas/{id}/enfermero', {
    responses: {
      '200': {
        description: 'Factura.Enfermero DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Enfermero)) where?: Where<Enfermero>,
  ): Promise<Count> {
    return this.facturaRepository.enfermero(id).delete(where);
  }
}
