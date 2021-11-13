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
  Cliente,
  SolicitudServicio,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteSolicitudServicioController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/solicitud-servicios', {
    responses: {
      '200': {
        description: 'Array of Cliente has many SolicitudServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudServicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudServicio>,
  ): Promise<SolicitudServicio[]> {
    return this.clienteRepository.solicitudServicios(id).find(filter);
  }

  @post('/clientes/{id}/solicitud-servicios', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudServicio, {
            title: 'NewSolicitudServicioInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) solicitudServicio: Omit<SolicitudServicio, 'id'>,
  ): Promise<SolicitudServicio> {
    return this.clienteRepository.solicitudServicios(id).create(solicitudServicio);
  }

  @patch('/clientes/{id}/solicitud-servicios', {
    responses: {
      '200': {
        description: 'Cliente.SolicitudServicio PATCH success count',
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
    return this.clienteRepository.solicitudServicios(id).patch(solicitudServicio, where);
  }

  @del('/clientes/{id}/solicitud-servicios', {
    responses: {
      '200': {
        description: 'Cliente.SolicitudServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudServicio)) where?: Where<SolicitudServicio>,
  ): Promise<Count> {
    return this.clienteRepository.solicitudServicios(id).delete(where);
  }
}
