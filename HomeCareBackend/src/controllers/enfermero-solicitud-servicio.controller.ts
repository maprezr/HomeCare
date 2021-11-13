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
  SolicitudServicio,
} from '../models';
import {EnfermeroRepository} from '../repositories';

export class EnfermeroSolicitudServicioController {
  constructor(
    @repository(EnfermeroRepository) protected enfermeroRepository: EnfermeroRepository,
  ) { }

  @get('/enfermeros/{id}/solicitud-servicios', {
    responses: {
      '200': {
        description: 'Array of Enfermero has many SolicitudServicio',
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
    return this.enfermeroRepository.solicitudServicios(id).find(filter);
  }

  @post('/enfermeros/{id}/solicitud-servicios', {
    responses: {
      '200': {
        description: 'Enfermero model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Enfermero.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudServicio, {
            title: 'NewSolicitudServicioInEnfermero',
            exclude: ['id'],
            optional: ['enfermeroId']
          }),
        },
      },
    }) solicitudServicio: Omit<SolicitudServicio, 'id'>,
  ): Promise<SolicitudServicio> {
    return this.enfermeroRepository.solicitudServicios(id).create(solicitudServicio);
  }

  @patch('/enfermeros/{id}/solicitud-servicios', {
    responses: {
      '200': {
        description: 'Enfermero.SolicitudServicio PATCH success count',
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
    return this.enfermeroRepository.solicitudServicios(id).patch(solicitudServicio, where);
  }

  @del('/enfermeros/{id}/solicitud-servicios', {
    responses: {
      '200': {
        description: 'Enfermero.SolicitudServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudServicio)) where?: Where<SolicitudServicio>,
  ): Promise<Count> {
    return this.enfermeroRepository.solicitudServicios(id).delete(where);
  }
}
