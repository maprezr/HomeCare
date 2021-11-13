import {Entity, model, property} from '@loopback/repository';

@model()
export class OtrosServicios extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  acompanamiento: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  servicioEnCasa: boolean;

  @property({
    type: 'string',
    required: true,
  })
  otros: string;

  @property({
    type: 'string',
  })
  facturaId?: string;

  @property({
    type: 'string',
  })
  solicitudServicioId?: string;

  constructor(data?: Partial<OtrosServicios>) {
    super(data);
  }
}

export interface OtrosServiciosRelations {
  // describe navigational properties here
}

export type OtrosServiciosWithRelations = OtrosServicios & OtrosServiciosRelations;
