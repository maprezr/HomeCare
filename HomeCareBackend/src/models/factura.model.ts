import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Enfermero} from './enfermero.model';
import {OtrosServicios} from './otros-servicios.model';
import {SolicitudServicio} from './solicitud-servicio.model';

@model()
export class Factura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @hasOne(() => SolicitudServicio)
  solicitudServicio: SolicitudServicio;

  @property({
    type: 'string',
  })
  solicitudServicioId?: string;

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
