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
  SolicitudServicio,
  Factura,
} from '../models';
import {SolicitudServicioRepository} from '../repositories';

export class SolicitudServicioFacturaController {
  constructor(
    @repository(SolicitudServicioRepository) protected solicitudServicioRepository: SolicitudServicioRepository,
  ) { }

  @get('/solicitud-servicios/{id}/factura', {
    responses: {
      '200': {
        description: 'SolicitudServicio has one Factura',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Factura),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Factura>,
  ): Promise<Factura> {
    return this.solicitudServicioRepository.factura(id).get(filter);
  }

  @post('/solicitud-servicios/{id}/factura', {
    responses: {
      '200': {
        description: 'SolicitudServicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Factura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof SolicitudServicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFacturaInSolicitudServicio',
            exclude: ['id'],
            optional: ['solicitudServicioId']
          }),
        },
      },
    }) factura: Omit<Factura, 'id'>,
  ): Promise<Factura> {
    return this.solicitudServicioRepository.factura(id).create(factura);
  }

  @patch('/solicitud-servicios/{id}/factura', {
    responses: {
      '200': {
        description: 'SolicitudServicio.Factura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Partial<Factura>,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.solicitudServicioRepository.factura(id).patch(factura, where);
  }

  @del('/solicitud-servicios/{id}/factura', {
    responses: {
      '200': {
        description: 'SolicitudServicio.Factura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.solicitudServicioRepository.factura(id).delete(where);
  }
}
