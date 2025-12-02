import type { EBankType, ECurrency } from "~/enums";
import type { IAudit } from "./audit";
import type {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

export interface IBank {
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

export const bankConverter = {
  toFirestore: (bank: IBank) => {
    return {
      ruc: bank.ruc,
      name: bank.name,
      type: bank.type,
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot<IBank, DocumentData>,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    data.id = snapshot.id;
    return data;
  },
};
