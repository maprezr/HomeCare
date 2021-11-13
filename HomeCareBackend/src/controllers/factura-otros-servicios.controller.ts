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
  OtrosServicios,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaOtrosServiciosController {
  constructor(
    @repository(FacturaRepository) protected facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/otros-servicios', {
    responses: {
      '200': {
        description: 'Array of Factura has many OtrosServicios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OtrosServicios)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<OtrosServicios>,
  ): Promise<OtrosServicios[]> {
    return this.facturaRepository.otrosServicios(id).find(filter);
  }

  @post('/facturas/{id}/otros-servicios', {
    responses: {
      '200': {
        description: 'Factura model instance',
        content: {'application/json': {schema: getModelSchemaRef(OtrosServicios)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Factura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OtrosServicios, {
            title: 'NewOtrosServiciosInFactura',
            exclude: ['id'],
            optional: ['facturaId']
          }),
        },
      },
    }) otrosServicios: Omit<OtrosServicios, 'id'>,
  ): Promise<OtrosServicios> {
    return this.facturaRepository.otrosServicios(id).create(otrosServicios);
  }

  @patch('/facturas/{id}/otros-servicios', {
    responses: {
      '200': {
        description: 'Factura.OtrosServicios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OtrosServicios, {partial: true}),
        },
      },
    })
    otrosServicios: Partial<OtrosServicios>,
    @param.query.object('where', getWhereSchemaFor(OtrosServicios)) where?: Where<OtrosServicios>,
  ): Promise<Count> {
    return this.facturaRepository.otrosServicios(id).patch(otrosServicios, where);
  }

  @del('/facturas/{id}/otros-servicios', {
    responses: {
      '200': {
        description: 'Factura.OtrosServicios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(OtrosServicios)) where?: Where<OtrosServicios>,
  ): Promise<Count> {
    return this.facturaRepository.otrosServicios(id).delete(where);
  }
}
