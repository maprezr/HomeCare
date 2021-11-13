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
  Cliente,
} from '../models';
import {SolicitudServicioRepository} from '../repositories';

export class SolicitudServicioClienteController {
  constructor(
    @repository(SolicitudServicioRepository) protected solicitudServicioRepository: SolicitudServicioRepository,
  ) { }

  @get('/solicitud-servicios/{id}/cliente', {
    responses: {
      '200': {
        description: 'SolicitudServicio has one Cliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente> {
    return this.solicitudServicioRepository.cliente(id).get(filter);
  }

  @post('/solicitud-servicios/{id}/cliente', {
    responses: {
      '200': {
        description: 'SolicitudServicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof SolicitudServicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInSolicitudServicio',
            exclude: ['id'],
            optional: ['solicitudServicioId']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    return this.solicitudServicioRepository.cliente(id).create(cliente);
  }

  @patch('/solicitud-servicios/{id}/cliente', {
    responses: {
      '200': {
        description: 'SolicitudServicio.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.solicitudServicioRepository.cliente(id).patch(cliente, where);
  }

  @del('/solicitud-servicios/{id}/cliente', {
    responses: {
      '200': {
        description: 'SolicitudServicio.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.solicitudServicioRepository.cliente(id).delete(where);
  }
}
