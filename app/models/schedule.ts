import type { IAudit } from "./audit";

export interface ISchedule extends IAudit {
  id: string;
  numeroCuotas: number;
  fechaPago: Date;
  saldoInicial: number;
  cuotaFrancesa: number;
  interes: number;
  amortizacion: number;
  seguroDesgravamen: number;
  seguroBien: number;
  itf: number;
  cuotaTotal: number;
  saldoFinal: number;
  tipoPeriodo: string;
  pagado: boolean;
  fechaPagoReal: Date;
  loanId: string;
}

export class Schedule implements ISchedule {
  id: string;
  numeroCuotas: number;
  fechaPago: Date;
  saldoInicial: number;
  cuotaFrancesa: number;
  interes: number;
  amortizacion: number;
  seguroDesgravamen: number;
  seguroBien: number;
  itf: number;
  cuotaTotal: number;
  saldoFinal: number;
  tipoPeriodo: string;
  pagado: boolean;
  fechaPagoReal: Date;
  loanId: string;

  constructor(
    id: string,
    numeroCuotas: number,
    fechaPago: Date,
    saldoInicial: number,
    cuotaFrancesa: number,
    interes: number,
    amortizacion: number,
    seguroDesgravamen: number,
    seguroBien: number,
    itf: number,
    cuotaTotal: number,
    saldoFinal: number,
    tipoPeriodo: string,
    pagado: boolean,
    fechaPagoReal: Date,
    loanId: string
  ) {
    this.id = id;
    this.numeroCuotas = numeroCuotas;
    this.fechaPago = fechaPago;
    this.saldoInicial = saldoInicial;
    this.cuotaFrancesa = cuotaFrancesa;
    this.interes = interes;
    this.amortizacion = amortizacion;
    this.seguroDesgravamen = seguroDesgravamen;
    this.seguroBien = seguroBien;
    this.itf = itf;
    this.cuotaTotal = cuotaTotal;
    this.saldoFinal = saldoFinal;
    this.tipoPeriodo = tipoPeriodo;
    this.pagado = pagado;
    this.fechaPagoReal = fechaPagoReal;
    this.loanId = loanId;
  }
}

// export const customerConverter = {
//   toFirestore: (customer: Schedule) => {
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
//     const data = snapshot.data(options) as Schedule;
//     return new Schedule(
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
