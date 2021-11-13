import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Persona} from './persona.model';
import {SolicitudServicio} from './solicitud-servicio.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  contactoFamiliar: string;

  @property({
    type: 'string',
  })
  personaId?: string;

  @hasOne(() => Persona)
  persona: Persona;

  @property({
    type: 'string',
  })
  facturaId?: string;

  @property({
    type: 'string',
  })
  solicitudServicioId?: string;

  @hasMany(() => SolicitudServicio)
  solicitudServicios: SolicitudServicio[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
