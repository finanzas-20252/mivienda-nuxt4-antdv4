import type { ECurrency, ELoanStatus, ETipoTasa } from "~/enums";
import type { IAudit } from "./audit";

export interface ILoan extends IAudit {
  id: string;
  fechaSolicitud: Date;
  fechaDesembolso: Date;
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
  customerId: string;
  propertyId: string;
  bankId: string;
  creditConfigurationId: string;
}

export class Loan implements ILoan {
  id: string;
  fechaSolicitud: Date;
  fechaDesembolso: Date;
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
  customerId: string;
  propertyId: string;
  bankId: string;
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
    customerId: string,
    propertyId: string,
    bankId: string,
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
    this.customerId = customerId;
    this.propertyId = propertyId;
    this.bankId = bankId;
    this.creditConfigurationId = creditConfigurationId;
  }
}

// export const customerConverter = {
//   toFirestore: (customer: Loan) => {
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
//     const data = snapshot.data(options) as Loan;
//     return new Loan(
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
