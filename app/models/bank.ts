import type { EBankType, ECurrency } from "~/enums";
import type { IAudit } from "./audit";

export interface IBank extends IAudit {
  id: string;
  ruc: string;
  name: string;
  type: EBankType;
}

export class Bank implements IBank {
  id: string;
  ruc: string;
  name: string;
  type: EBankType;

  constructor(id: string, ruc: string, name: string, type: EBankType) {
    this.id = id;
    this.ruc = ruc;
    this.name = name;
    this.type = type;
  }
}

// export const customerConverter = {
//   toFirestore: (customer: Customer) => {
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
//     const data = snapshot.data(options) as Customer;
//     return new Customer(
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
