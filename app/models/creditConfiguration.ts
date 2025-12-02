import type { ECurrency, ETipoBono, ETipoTasa } from "~/enums";
import type { IAudit } from "./audit";
import type { IBank } from "./bank";

export interface ICreditConfiguration extends IAudit {
  id: string;
  currency: ECurrency;
  tipoTasa: ETipoTasa;
  valorTasa: number;
  capitalizacion: string;
  plazoMinimo: number;
  plazoMaximo: number;
  plazoGraciaTotal: number;
  plazoGraciaParcial: number;
  aplicaBono: boolean;
  tipoBono: ETipoBono;
  montoBonoMax: number;
  tasaSeguroDesgravamen: number;
  tasaSeguroBien: number;
  costoTasacion: number;
  costoNotarial: number;
  costoRegistral: number;
  bank: IBank;
}

export class CreditConfiguration implements ICreditConfiguration {
  id: string;
  currency: ECurrency;
  tipoTasa: ETipoTasa;
  valorTasa: number;
  capitalizacion: string;
  plazoMinimo: number;
  plazoMaximo: number;
  plazoGraciaTotal: number;
  plazoGraciaParcial: number;
  aplicaBono: boolean;
  tipoBono: ETipoBono;
  montoBonoMax: number;
  tasaSeguroDesgravamen: number;
  tasaSeguroBien: number;
  costoTasacion: number;
  costoNotarial: number;
  costoRegistral: number;
  bank: IBank;

  constructor(
    id: string,
    currency: ECurrency,
    tipoTasa: ETipoTasa,
    valorTasa: number,
    capitalizacion: string,
    plazoMinimo: number,
    plazoMaximo: number,
    plazoGraciaTotal: number,
    plazoGraciaParcial: number,
    aplicaBono: boolean,
    tipoBono: ETipoBono,
    montoBonoMax: number,
    tasaSeguroDesgravamen: number,
    tasaSeguroBien: number,
    costoTasacion: number,
    costoNotarial: number,
    costoRegistral: number,
    bank: IBank
  ) {
    this.id = id;
    this.currency = currency;
    this.tipoTasa = tipoTasa;
    this.valorTasa = valorTasa;
    this.capitalizacion = capitalizacion;
    this.plazoMinimo = plazoMinimo;
    this.plazoMaximo = plazoMaximo;
    this.plazoGraciaTotal = plazoGraciaTotal;
    this.plazoGraciaParcial = plazoGraciaParcial;
    this.aplicaBono = aplicaBono;
    this.tipoBono = tipoBono;
    this.montoBonoMax = montoBonoMax;
    this.tasaSeguroDesgravamen = tasaSeguroDesgravamen;
    this.tasaSeguroBien = tasaSeguroBien;
    this.costoTasacion = costoTasacion;
    this.costoNotarial = costoNotarial;
    this.costoRegistral = costoRegistral;
    this.bank = bank;
  }
}

// export const customerConverter = {
//   toFirestore: (customer: CreditConfiguration) => {
//     return {
//       type: customer.type,
//       identity: customer.identity,
//       name: customer.name,
//       monthlyIncome: customer.monthlyIncome,
//     };
//   },

//   fromFirestore: (
//     snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
//     options: SnapshotOptions
//   ) => {
//     const data = snapshot.data(options) as CreditConfiguration;
//     return new CreditConfiguration(
//       snapshot.id,
//       data.type,
//       data.identity,
//       data.name,
//       data.phone,
//       data.city,
//       data.district,
//       data.address,
//       data.reference,
//       data.coordenada,
//       data.debt,
//       data.zone,
//       data.lastCall,
//       data.lastSale,
//       data.envases,
//       data.totalSale,
//       data.image,
//       data.category,
//       data.createdAt ?? null,
//       data.updatedAt ?? null,

//       data.slug ?? null,
//       data.owner ?? null,
//       data.licensePlate ?? null,
//       data.priceReference ?? null
//     );
//   },
// };
