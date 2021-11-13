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
  Enfermero,
} from '../models';
import {SolicitudServicioRepository} from '../repositories';

export class SolicitudServicioEnfermeroController {
  constructor(
    @repository(SolicitudServicioRepository) protected solicitudServicioRepository: SolicitudServicioRepository,
  ) { }

  @get('/solicitud-servicios/{id}/enfermero', {
    responses: {
      '200': {
        description: 'SolicitudServicio has one Enfermero',
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
    return this.solicitudServicioRepository.Enfermero(id).get(filter);
  }

  @post('/solicitud-servicios/{id}/enfermero', {
    responses: {
      '200': {
        description: 'SolicitudServicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Enfermero)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof SolicitudServicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enfermero, {
            title: 'NewEnfermeroInSolicitudServicio',
            exclude: ['id'],
            optional: ['solicitudServicioId']
          }),
        },
      },
    }) enfermero: Omit<Enfermero, 'id'>,
  ): Promise<Enfermero> {
    return this.solicitudServicioRepository.Enfermero(id).create(enfermero);
  }

  @patch('/solicitud-servicios/{id}/enfermero', {
    responses: {
      '200': {
        description: 'SolicitudServicio.Enfermero PATCH success count',
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
    return this.solicitudServicioRepository.Enfermero(id).patch(enfermero, where);
  }

  @del('/solicitud-servicios/{id}/enfermero', {
    responses: {
      '200': {
        description: 'SolicitudServicio.Enfermero DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Enfermero)) where?: Where<Enfermero>,
  ): Promise<Count> {
    return this.solicitudServicioRepository.Enfermero(id).delete(where);
  }
}
