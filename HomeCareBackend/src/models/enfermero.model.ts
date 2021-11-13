import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Persona} from './persona.model';
import {SolicitudServicio} from './solicitud-servicio.model';

@model()
export class Enfermero extends Entity {
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
  targetaProfesional: string;

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

  constructor(data?: Partial<Enfermero>) {
    super(data);
  }
}

export interface EnfermeroRelations {
  // describe navigational properties here
}

export type EnfermeroWithRelations = Enfermero & EnfermeroRelations;
