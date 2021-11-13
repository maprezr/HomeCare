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
import {OtrosServicios} from '../models';
import {OtrosServiciosRepository} from '../repositories';

export class OtrosServiciosController {
  constructor(
    @repository(OtrosServiciosRepository)
    public otrosServiciosRepository : OtrosServiciosRepository,
  ) {}

  @post('/otros-servicios')
  @response(200, {
    description: 'OtrosServicios model instance',
    content: {'application/json': {schema: getModelSchemaRef(OtrosServicios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OtrosServicios, {
            title: 'NewOtrosServicios',
            exclude: ['id'],
          }),
        },
      },
    })
    otrosServicios: Omit<OtrosServicios, 'id'>,
  ): Promise<OtrosServicios> {
    return this.otrosServiciosRepository.create(otrosServicios);
  }

  @get('/otros-servicios/count')
  @response(200, {
    description: 'OtrosServicios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OtrosServicios) where?: Where<OtrosServicios>,
  ): Promise<Count> {
    return this.otrosServiciosRepository.count(where);
  }

  @get('/otros-servicios')
  @response(200, {
    description: 'Array of OtrosServicios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OtrosServicios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OtrosServicios) filter?: Filter<OtrosServicios>,
  ): Promise<OtrosServicios[]> {
    return this.otrosServiciosRepository.find(filter);
  }

  @patch('/otros-servicios')
  @response(200, {
    description: 'OtrosServicios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OtrosServicios, {partial: true}),
        },
      },
    })
    otrosServicios: OtrosServicios,
    @param.where(OtrosServicios) where?: Where<OtrosServicios>,
  ): Promise<Count> {
    return this.otrosServiciosRepository.updateAll(otrosServicios, where);
  }

  @get('/otros-servicios/{id}')
  @response(200, {
    description: 'OtrosServicios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OtrosServicios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OtrosServicios, {exclude: 'where'}) filter?: FilterExcludingWhere<OtrosServicios>
  ): Promise<OtrosServicios> {
    return this.otrosServiciosRepository.findById(id, filter);
  }

  @patch('/otros-servicios/{id}')
  @response(204, {
    description: 'OtrosServicios PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OtrosServicios, {partial: true}),
        },
      },
    })
    otrosServicios: OtrosServicios,
  ): Promise<void> {
    await this.otrosServiciosRepository.updateById(id, otrosServicios);
  }

  @put('/otros-servicios/{id}')
  @response(204, {
    description: 'OtrosServicios PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() otrosServicios: OtrosServicios,
  ): Promise<void> {
    await this.otrosServiciosRepository.replaceById(id, otrosServicios);
  }

  @del('/otros-servicios/{id}')
  @response(204, {
    description: 'OtrosServicios DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.otrosServiciosRepository.deleteById(id);
  }
}
