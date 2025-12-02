import type {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import type { ECurrency, EPropertyStatus } from "~/enums";

export interface IProperty {
  id: string;
  code: string;
  nameProject: string;
  priceReference: number;
  currency: ECurrency;
  status: EPropertyStatus;
}

export class Property implements IProperty {
  id: string;
  code: string;
  nameProject: string;
  priceReference: number;
  currency: ECurrency;
  status: EPropertyStatus;

  constructor(
    id: string,
    code: string,
    nameProject: string,
    priceReference: number,
    currency: ECurrency,
    status: EPropertyStatus
  ) {
    this.id = id;
    this.code = code;
    this.nameProject = nameProject;
    this.priceReference = priceReference;
    this.currency = currency;
    this.status = status;
  }
}

export const propertyConverter = {
  toFirestore: (property: IProperty) => {
    return {
      code: property.code,
      nameProject: property.nameProject,
      priceReference: property.priceReference,
      currency: property.currency,
      status: property.status,
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot<IProperty, DocumentData>,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    data.id = snapshot.id;
    return data;
  },
};
