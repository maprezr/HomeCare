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
import {SolicitudServicio} from '../models';
import {SolicitudServicioRepository} from '../repositories';

export class SolicitudServicioController {
  constructor(
    @repository(SolicitudServicioRepository)
    public solicitudServicioRepository : SolicitudServicioRepository,
  ) {}

  @post('/solicitud-servicios')
  @response(200, {
    description: 'SolicitudServicio model instance',
    content: {'application/json': {schema: getModelSchemaRef(SolicitudServicio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudServicio, {
            title: 'NewSolicitudServicio',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitudServicio: Omit<SolicitudServicio, 'id'>,
  ): Promise<SolicitudServicio> {
    return this.solicitudServicioRepository.create(solicitudServicio);
  }

  @get('/solicitud-servicios/count')
  @response(200, {
    description: 'SolicitudServicio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SolicitudServicio) where?: Where<SolicitudServicio>,
  ): Promise<Count> {
    return this.solicitudServicioRepository.count(where);
  }

  @get('/solicitud-servicios')
  @response(200, {
    description: 'Array of SolicitudServicio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudServicio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudServicio) filter?: Filter<SolicitudServicio>,
  ): Promise<SolicitudServicio[]> {
    return this.solicitudServicioRepository.find(filter);
  }

  @patch('/solicitud-servicios')
  @response(200, {
    description: 'SolicitudServicio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudServicio, {partial: true}),
        },
      },
    })
    solicitudServicio: SolicitudServicio,
    @param.where(SolicitudServicio) where?: Where<SolicitudServicio>,
  ): Promise<Count> {
    return this.solicitudServicioRepository.updateAll(solicitudServicio, where);
  }

  @get('/solicitud-servicios/{id}')
  @response(200, {
    description: 'SolicitudServicio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudServicio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SolicitudServicio, {exclude: 'where'}) filter?: FilterExcludingWhere<SolicitudServicio>
  ): Promise<SolicitudServicio> {
    return this.solicitudServicioRepository.findById(id, filter);
  }

  @patch('/solicitud-servicios/{id}')
  @response(204, {
    description: 'SolicitudServicio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudServicio, {partial: true}),
        },
      },
    })
    solicitudServicio: SolicitudServicio,
  ): Promise<void> {
    await this.solicitudServicioRepository.updateById(id, solicitudServicio);
  }

  @put('/solicitud-servicios/{id}')
  @response(204, {
    description: 'SolicitudServicio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() solicitudServicio: SolicitudServicio,
  ): Promise<void> {
    await this.solicitudServicioRepository.replaceById(id, solicitudServicio);
  }

  @del('/solicitud-servicios/{id}')
  @response(204, {
    description: 'SolicitudServicio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.solicitudServicioRepository.deleteById(id);
  }
}
