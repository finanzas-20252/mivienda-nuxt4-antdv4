import type { ECurrency, EPropertyStatus } from "~/enums";
import type { IAudit } from "./audit";

export interface IProperty extends IAudit {
  id: string;
  code: string;
  NameProject: string;
  priceReference: number;
  currency: ECurrency;
  status: EPropertyStatus;
}

export class Property implements IProperty {
  id: string;
  code: string;
  NameProject: string;
  priceReference: number;
  currency: ECurrency;
  status: EPropertyStatus;

  constructor(
    id: string,
    code: string,
    NameProject: string,
    priceReference: number,
    currency: ECurrency,
    status: EPropertyStatus
  ) {
    this.id = id;
    this.code = code;
    this.NameProject = NameProject;
    this.priceReference = priceReference;
    this.currency = currency;
    this.status = status;
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
