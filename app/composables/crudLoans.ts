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
import { loanConverter } from "~/models/loan";

export const useCrudLoans = () => {
  const user = useCurrentUser();
  const dbClient = useFirestore();

  const loansRef = collection(dbClient, "loans").withConverter(loanConverter);
  const { data, pending } = useCollection(loansRef, {
    ssrKey: "loans",
  });

  const addLoan = async (loan: any) => {
    if (!loan) {
      throw new Error("No loan ID has been provided.");
    }

    try {
      const loanRef = collection(dbClient, "loans").withConverter(
        loanConverter
      );
      await addDoc(loanRef, {
        ...loan,
      });
    } catch (error) {
      console.error("There was an error adding the loan", error);
      throw error;
    }
  };

  const updateLoan = async (loanId: string, loan: any) => {
    if (!loanId) {
      throw new Error("No loan ID has been provided.");
    }

    if (!loan) {
      throw new Error("No loan has been provided.");
    }
  };

  const remove = async (db: Firestore, loanId: string) => {
    if (!loanId) {
      throw new Error("No loan ID has been provided.");
    }

    const vouchersRef = collection(db, "vouchers");
    const q = query(vouchersRef, where("loan.id", "==", loanId));
    const loanRef = doc(collection(db, "loans"), loanId);

    const snapshot = await getCountFromServer(q);
    if (snapshot.data().count > 0) {
      throw new Error(
        "Antes de eliminar cliente, debe eliminar sus registros de venta."
      );
    }

    try {
      await deleteDoc(loanRef);
    } catch (error) {
      console.error("There was an error adding the distribution", error);
      throw error;
    }
  };

  return {
    addLoan,
    updateLoan,
    remove,

    loans: data,
    loansPending: pending,
  };
};
