import {
  collection,
  Firestore,
  addDoc,
  deleteDoc,
  doc,
  where,
  query,
  getCountFromServer,
} from "firebase/firestore";
import { bankConverter } from "~/models/bank";

export const useCrudBanks = () => {
  const user = useCurrentUser();
  const dbClient = useFirestore();

  const banksRef = collection(dbClient, "banks").withConverter(bankConverter);
  const { data, pending } = useCollection(banksRef, {
    ssrKey: "banks",
  });

  const addBank = async (bank: any) => {
    if (!bank) {
      throw new Error("No bank ID has been provided.");
    }

    try {
      const bankRef = collection(dbClient, "banks").withConverter(
        bankConverter
      );
      await addDoc(bankRef, {
        ...bank,
      });
    } catch (error) {
      console.error("There was an error adding the bank", error);
      throw error;
    }
  };

  const updateBank = async (bankId: string, bank: any) => {
    if (!bankId) {
      throw new Error("No bank ID has been provided.");
    }

    if (!bank) {
      throw new Error("No bank has been provided.");
    }
  };

  const remove = async (db: Firestore, bankId: string) => {
    if (!bankId) {
      throw new Error("No bank ID has been provided.");
    }

    const vouchersRef = collection(db, "vouchers");
    const q = query(vouchersRef, where("bank.id", "==", bankId));
    const bankRef = doc(collection(db, "banks"), bankId);

    const snapshot = await getCountFromServer(q);
    if (snapshot.data().count > 0) {
      throw new Error(
        "Antes de eliminar cliente, debe eliminar sus registros de venta."
      );
    }

    try {
      await deleteDoc(bankRef);
    } catch (error) {
      console.error("There was an error adding the distribution", error);
      throw error;
    }
  };

  return {
    addBank,
    updateBank,
    remove,

    banks: data,
    banksPending: pending,
  };
};
