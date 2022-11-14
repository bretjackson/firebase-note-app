import { db, auth } from "../config/firebase";
import { collection, addDoc, doc, updateDoc, query, where, getDocs, deleteDoc } from "firebase/firestore";


class noteService {
  readonly collectionName: string = "users";
  readonly subCollectionName: string = "notes";
  
  async post(data: any) {
    const user = auth.currentUser;
    if (user){
      try {
        const userDocRef = doc(db, this.collectionName, user.uid);
        const colRef = collection(userDocRef, this.subCollectionName)
        const docRef = await addDoc(colRef, data);
        console.log("Document written with ID: ", docRef.id);
        return docRef;
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }

  async update(data: any, id: any) {
    const user = auth.currentUser;
    if (user){
      try {
        const userDocRef = doc(db, this.collectionName, user.uid);
        const colRef = collection(userDocRef, this.subCollectionName)
        const docRef  = doc(colRef, id);
        let result: any = await updateDoc(docRef, data);
        return result;
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    }
  }

  async get(filter: any) {
    const user = auth.currentUser;
    if (user){
      try {
        console.log("filter: ", filter);
        if(filter == null || (typeof filter == 'object' && Object.keys(filter).length === 0) ){
          // empty filter so get all the collection of notes
          const userDocRef = doc(db, this.collectionName, user.uid);
          const colRef = collection(userDocRef, this.subCollectionName)
          const querySnapshot = await getDocs(colRef);
          return querySnapshot;
        }
        else{
          const userDocRef = doc(db, this.collectionName, user.uid);
          const colRef = collection(userDocRef, this.subCollectionName)
          const q = query(colRef, where("tag", "==", filter.tag));
          const querySnapshot = await getDocs(q);
          return querySnapshot;
        }
      } catch(e){
        console.error("Error getting document: ", e);
      }
    }
  }

  async delete(id: any) {
    const user = auth.currentUser;
    if (user){
      try {
        const userDocRef = doc(db, this.collectionName, user.uid);
        const colRef = collection(userDocRef, this.subCollectionName)
        const docRef  = doc(colRef, id);
        let result: any = await deleteDoc(docRef);
        return result;
      } catch(e){
        console.error("Error deleting document: ", e);
      }
    }
  }
}

export default new noteService();
