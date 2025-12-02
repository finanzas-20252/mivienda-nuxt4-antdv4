import type { ETipoBono } from "~/enums";
import type { IAudit } from "./audit";

export interface IBond extends IAudit {
  id: string;
  tipoBono: ETipoBono;
  montoBono: number;
  fechaAplicacion: Date;
  loanId: string;
}

export class Bond implements IBond {
  id: string;
  tipoBono: ETipoBono;
  montoBono: number;
  fechaAplicacion: Date;
  loanId: string;

  constructor(
    id: string,
    tipoBono: ETipoBono,
    montoBono: number,
    fechaAplicacion: Date,
    loanId: string
  ) {
    this.id = id;
    this.tipoBono = tipoBono;
    this.montoBono = montoBono;
    this.fechaAplicacion = fechaAplicacion;
    this.loanId = loanId;
  }
}

// export const customerConverter = {
//   toFirestore: (customer: Bond) => {
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
//     const data = snapshot.data(options) as Bond;
//     return new Bond(
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
