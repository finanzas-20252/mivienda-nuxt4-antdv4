import type {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

export interface ICustomer {
  id: string;
  identity: string;
  name: string;
  monthlyIncome: number;
}

export class Customer implements ICustomer {
  id: string;
  identity: string;
  name: string;
  monthlyIncome: number;

  constructor(
    id: string,
    identity: string,
    name: string,
    monthlyIncome: number
  ) {
    this.id = id;
    this.identity = identity;
    this.name = name;
    this.monthlyIncome = monthlyIncome;
  }
}

export const customerConverter = {
  toFirestore: (customer: ICustomer) => {
    return {
      identity: customer.identity,
      name: customer.name,
      monthlyIncome: customer.monthlyIncome,
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot<ICustomer, DocumentData>,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    data.id = snapshot.id;
    return data;
  },
};
