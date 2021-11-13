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
  SolicitudServicio,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaSolicitudServicioController {
  constructor(
    @repository(FacturaRepository) protected facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/solicitud-servicio', {
    responses: {
      '200': {
        description: 'Factura has one SolicitudServicio',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SolicitudServicio),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudServicio>,
  ): Promise<SolicitudServicio> {
    return this.facturaRepository.solicitudServicio(id).get(filter);
  }

  @post('/facturas/{id}/solicitud-servicio', {
    responses: {
      '200': {
        description: 'Factura model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Factura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudServicio, {
            title: 'NewSolicitudServicioInFactura',
            exclude: ['id'],
            optional: ['facturaId']
          }),
        },
      },
    }) solicitudServicio: Omit<SolicitudServicio, 'id'>,
  ): Promise<SolicitudServicio> {
    return this.facturaRepository.solicitudServicio(id).create(solicitudServicio);
  }

  @patch('/facturas/{id}/solicitud-servicio', {
    responses: {
      '200': {
        description: 'Factura.SolicitudServicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudServicio, {partial: true}),
        },
      },
    })
    solicitudServicio: Partial<SolicitudServicio>,
    @param.query.object('where', getWhereSchemaFor(SolicitudServicio)) where?: Where<SolicitudServicio>,
  ): Promise<Count> {
    return this.facturaRepository.solicitudServicio(id).patch(solicitudServicio, where);
  }

  @del('/facturas/{id}/solicitud-servicio', {
    responses: {
      '200': {
        description: 'Factura.SolicitudServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudServicio)) where?: Where<SolicitudServicio>,
  ): Promise<Count> {
    return this.facturaRepository.solicitudServicio(id).delete(where);
  }
}
