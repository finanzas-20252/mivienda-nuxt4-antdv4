import type { Dayjs } from "dayjs";
import type {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from "firebase/firestore";
import type { ECurrency, ELoanStatus, ETipoBono, ETipoTasa } from "~/enums";

export interface ILoan {
  id: string;
  fechaSolicitud: Dayjs | Timestamp | Date;
  fechaDesembolso: Dayjs | Timestamp | Date;
  montoPrestamo: number;
  currency: ECurrency;
  tipoTasa: ETipoTasa;
  tasaNominal: number;
  tasaEfectiva: number;
  capitalizacion: string;
  plazoMeses: number;
  tipoGracia: string;
  mesesGraciaTotal: number;
  mesesGraciaParcial: number;
  van: number;
  tir: number;
  tcea: number;
  status: ELoanStatus;
  tipoBono: ETipoBono;
  montoBono: number;
  tasaSeguroDesgravamen: number;
  tasaSeguroBien: number;
  costoTasacion: number;
  costoNotarial: number;
  costoRegistral: number;
  cliente: { id: string; name: string };
  inmueble: { id: string; nameProject: string };
  entidadFinanciera: { id: string; name: string };
}

export class Loan implements ILoan {
  id: string;
  fechaSolicitud: Dayjs | Timestamp | Date;
  fechaDesembolso: Dayjs | Timestamp | Date;
  montoPrestamo: number;
  currency: ECurrency;
  tipoTasa: ETipoTasa;
  tasaNominal: number;
  tasaEfectiva: number;
  capitalizacion: string;
  plazoMeses: number;
  tipoGracia: string;
  mesesGraciaTotal: number;
  mesesGraciaParcial: number;
  van: number;
  tir: number;
  tcea: number;
  status: ELoanStatus;
  tipoBono: ETipoBono;
  montoBono: number;
  tasaSeguroDesgravamen: number;
  tasaSeguroBien: number;
  costoTasacion: number;
  costoNotarial: number;
  costoRegistral: number;
  cliente: { id: string; name: string };
  inmueble: { id: string; nameProject: string };
  entidadFinanciera: { id: string; name: string };
  creditConfigurationId: string;

  constructor(
    id: string,
    fechaSolicitud: Date,
    fechaDesembolso: Date,
    montoPrestamo: number,
    currency: ECurrency,
    tipoTasa: ETipoTasa,
    tasaNominal: number,
    tasaEfectiva: number,
    capitalizacion: string,
    plazoMeses: number,
    tipoGracia: string,
    mesesGraciaTotal: number,
    mesesGraciaParcial: number,
    van: number,
    tir: number,
    tcea: number,
    status: ELoanStatus,
    tipoBono: ETipoBono,
    montoBono: number,
    tasaSeguroDesgravamen: number,
    tasaSeguroBien: number,
    costoTasacion: number,
    costoNotarial: number,
    costoRegistral: number,
    cliente: { id: string; name: string },
    inmueble: { id: string; nameProject: string },
    entidadFinanciera: { id: string; name: string },
    creditConfigurationId: string
  ) {
    this.id = id;
    this.fechaSolicitud = fechaSolicitud;
    this.fechaDesembolso = fechaDesembolso;
    this.montoPrestamo = montoPrestamo;
    this.currency = currency;
    this.tipoTasa = tipoTasa;
    this.tasaNominal = tasaNominal;
    this.tasaEfectiva = tasaEfectiva;
    this.capitalizacion = capitalizacion;
    this.plazoMeses = plazoMeses;
    this.tipoGracia = tipoGracia;
    this.mesesGraciaTotal = mesesGraciaTotal;
    this.mesesGraciaParcial = mesesGraciaParcial;
    this.van = van;
    this.tir = tir;
    this.tcea = tcea;
    this.status = status;
    this.tipoBono = tipoBono;
    this.montoBono = montoBono;
    this.tasaSeguroDesgravamen = tasaSeguroDesgravamen;
    this.tasaSeguroBien = tasaSeguroBien;
    this.costoTasacion = costoTasacion;
    this.costoNotarial = costoNotarial;
    this.costoRegistral = costoRegistral;
    this.cliente = cliente;
    this.inmueble = inmueble;
    this.entidadFinanciera = entidadFinanciera;
    this.creditConfigurationId = creditConfigurationId;
  }
}

export const loanConverter = {
  toFirestore: (loan: ILoan) => {
    return {
      fechaSolicitud: loan.fechaSolicitud,
      fechaDesembolso: loan.fechaDesembolso,
      montoPrestamo: loan.montoPrestamo,
      currency: loan.currency,
      tipoTasa: loan.tipoTasa,
      tasaNominal: loan.tasaNominal ?? null,
      tasaEfectiva: loan.tasaEfectiva,
      capitalizacion: loan.capitalizacion,
      plazoMeses: loan.plazoMeses,
      tipoGracia: loan.tipoGracia,
      mesesGraciaTotal: loan.mesesGraciaTotal,
      mesesGraciaParcial: loan.mesesGraciaParcial,
      van: loan.van,
      tir: loan.tir,
      tcea: loan.tcea,
      status: loan.status,
      tipoBono: loan.tipoBono,
      montoBono: loan.montoBono ?? null,
      tasaSeguroDesgravamen: loan.tasaSeguroDesgravamen,
      tasaSeguroBien: loan.tasaSeguroBien,
      costoTasacion: loan.costoTasacion,
      costoNotarial: loan.costoNotarial,
      costoRegistral: loan.costoRegistral,
      cliente: loan.cliente,
      inmueble: loan.inmueble,
      entidadFinanciera: loan.entidadFinanciera,
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot<ILoan, DocumentData>,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    data.id = snapshot.id;
    data.fechaSolicitud = (data.fechaSolicitud as Timestamp)?.toDate();
    data.fechaDesembolso = (data.fechaDesembolso as Timestamp)?.toDate();
    return data;
  },
};
