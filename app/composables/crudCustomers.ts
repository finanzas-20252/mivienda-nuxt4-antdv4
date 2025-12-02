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
import { customerConverter } from "~/models/customer";

export const useCrudCustomers = () => {
  const user = useCurrentUser();
  const dbClient = useFirestore();

  const customersRef = collection(dbClient, "customers").withConverter(
    customerConverter
  );
  const { data, pending } = useCollection(customersRef, {
    ssrKey: "customers",
  });

  const addCustomer = async (customer: any) => {
    if (!customer) {
      throw new Error("No customer ID has been provided.");
    }

    try {
      const customerRef = collection(dbClient, "customers").withConverter(
        customerConverter
      );
      await addDoc(customerRef, {
        ...customer,
      });
    } catch (error) {
      console.error("There was an error adding the customer", error);
      throw error;
    }
  };

  const updateCustomer = async (customerId: string, customer: any) => {
    if (!customerId) {
      throw new Error("No customer ID has been provided.");
    }

    if (!customer) {
      throw new Error("No customer has been provided.");
    }
  };

  const remove = async (db: Firestore, customerId: string) => {
    if (!customerId) {
      throw new Error("No customer ID has been provided.");
    }

    const vouchersRef = collection(db, "vouchers");
    const q = query(vouchersRef, where("customer.id", "==", customerId));
    const customerRef = doc(collection(db, "customers"), customerId);

    const snapshot = await getCountFromServer(q);
    if (snapshot.data().count > 0) {
      throw new Error(
        "Antes de eliminar cliente, debe eliminar sus registros de venta."
      );
    }

    try {
      await deleteDoc(customerRef);
    } catch (error) {
      console.error("There was an error adding the distribution", error);
      throw error;
    }
  };

  return {
    addCustomer,
    updateCustomer,
    remove,

    customers: data,
    customersPending: pending,
  };
};
