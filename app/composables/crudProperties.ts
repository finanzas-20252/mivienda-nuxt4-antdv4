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
import { propertyConverter } from "~/models/property";

export const useCrudProperties = () => {
  const user = useCurrentUser();
  const dbClient = useFirestore();

  const propertiesRef = collection(dbClient, "properties").withConverter(
    propertyConverter
  );
  const { data, pending } = useCollection(propertiesRef, {
    ssrKey: "properties",
  });

  const addProperty = async (property: any) => {
    if (!property) {
      throw new Error("No property ID has been provided.");
    }

    try {
      const propertyRef = collection(dbClient, "properties").withConverter(
        propertyConverter
      );
      await addDoc(propertyRef, {
        ...property,
      });
    } catch (error) {
      console.error("There was an error adding the property", error);
      throw error;
    }
  };

  const updateProperty = async (propertyId: string, property: any) => {
    if (!propertyId) {
      throw new Error("No property ID has been provided.");
    }

    if (!property) {
      throw new Error("No property has been provided.");
    }
  };

  const remove = async (db: Firestore, propertyId: string) => {
    if (!propertyId) {
      throw new Error("No property ID has been provided.");
    }

    const vouchersRef = collection(db, "vouchers");
    const q = query(vouchersRef, where("property.id", "==", propertyId));
    const propertyRef = doc(collection(db, "properties"), propertyId);

    const snapshot = await getCountFromServer(q);
    if (snapshot.data().count > 0) {
      throw new Error(
        "Antes de eliminar cliente, debe eliminar sus registros de venta."
      );
    }

    try {
      await deleteDoc(propertyRef);
    } catch (error) {
      console.error("There was an error adding the distribution", error);
      throw error;
    }
  };

  return {
    addProperty,
    updateProperty,
    remove,

    properties: data,
    propertiesPending: pending,
  };
};
