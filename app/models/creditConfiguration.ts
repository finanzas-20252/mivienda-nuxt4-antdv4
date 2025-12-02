import type { ECurrency, ETipoBono, ETipoTasa } from "~/enums";
import type { IAudit } from "./audit";
import type { IBank } from "./bank";
import type {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

export interface ICreditConfiguration {
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
  // bank: IBank;
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
  // bank: IBank;

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
    costoRegistral: number
    // bank: IBank
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
    // this.bank = bank;
  }
}

export const creditConfigurationConverter = {
  toFirestore: (creditConfiguration: ICreditConfiguration) => {
    return {
      currency: creditConfiguration.currency,
      tipoTasa: creditConfiguration.tipoTasa,
      valorTasa: creditConfiguration.valorTasa,
      capitalizacion: creditConfiguration.capitalizacion,
      plazoMinimo: creditConfiguration.plazoMinimo,
      plazoMaximo: creditConfiguration.plazoMaximo,
      plazoGraciaTotal: creditConfiguration.plazoGraciaTotal,
      plazoGraciaParcial: creditConfiguration.plazoGraciaParcial,
      aplicaBono: creditConfiguration.aplicaBono,
      tipoBono: creditConfiguration.tipoBono,
      montoBonoMax: creditConfiguration.montoBonoMax,
      tasaSeguroDesgravamen: creditConfiguration.tasaSeguroDesgravamen,
      tasaSeguroBien: creditConfiguration.tasaSeguroBien,
      costoTasacion: creditConfiguration.costoTasacion,
      costoNotarial: creditConfiguration.costoNotarial,
      costoRegistral: creditConfiguration.costoRegistral,
      // bank: creditConfiguration.bank,
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot<ICreditConfiguration, DocumentData>,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    data.id = snapshot.id;
    return data;
  },
};
