import type { Timestamp } from "firebase/firestore";

export interface IAudit {
  updatedAt: Timestamp;
  createdAt: Timestamp;
}
