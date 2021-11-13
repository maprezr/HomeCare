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
  OtrosServicios,
} from '../models';
import {SolicitudServicioRepository} from '../repositories';

export class SolicitudServicioOtrosServiciosController {
  constructor(
    @repository(SolicitudServicioRepository) protected solicitudServicioRepository: SolicitudServicioRepository,
  ) { }

  @get('/solicitud-servicios/{id}/otros-servicios', {
    responses: {
      '200': {
        description: 'Array of SolicitudServicio has many OtrosServicios',
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
    return this.solicitudServicioRepository.otrosServicios(id).find(filter);
  }

  @post('/solicitud-servicios/{id}/otros-servicios', {
    responses: {
      '200': {
        description: 'SolicitudServicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(OtrosServicios)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof SolicitudServicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OtrosServicios, {
            title: 'NewOtrosServiciosInSolicitudServicio',
            exclude: ['id'],
            optional: ['solicitudServicioId']
          }),
        },
      },
    }) otrosServicios: Omit<OtrosServicios, 'id'>,
  ): Promise<OtrosServicios> {
    return this.solicitudServicioRepository.otrosServicios(id).create(otrosServicios);
  }

  @patch('/solicitud-servicios/{id}/otros-servicios', {
    responses: {
      '200': {
        description: 'SolicitudServicio.OtrosServicios PATCH success count',
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
    return this.solicitudServicioRepository.otrosServicios(id).patch(otrosServicios, where);
  }

  @del('/solicitud-servicios/{id}/otros-servicios', {
    responses: {
      '200': {
        description: 'SolicitudServicio.OtrosServicios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(OtrosServicios)) where?: Where<OtrosServicios>,
  ): Promise<Count> {
    return this.solicitudServicioRepository.otrosServicios(id).delete(where);
  }
}
