import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Enfermero} from './enfermero.model';
import {OtrosServicios} from './otros-servicios.model';
import {Factura} from './factura.model';

@model()
export class SolicitudServicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  numeroServicio: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcionServicio: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreSolicitante: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaInicio: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaFinal: string;

  @hasOne(() => Cliente)
  cliente: Cliente;

  @hasOne(() => Enfermero)
  Enfermero: Enfermero;

  @hasMany(() => OtrosServicios)
  otrosServicios: OtrosServicios[];

  @property({
    type: 'string',
  })
  enfermeroId?: string;

  @property({
    type: 'string',
  })
  clienteId?: string;

  @property({
    type: 'string',
  })
  facturaId?: string;

  @hasOne(() => Factura)
  factura: Factura;

  constructor(data?: Partial<SolicitudServicio>) {
    super(data);
  }
}

export interface SolicitudServicioRelations {
  // describe navigational properties here
}

export type SolicitudServicioWithRelations = SolicitudServicio & SolicitudServicioRelations;
