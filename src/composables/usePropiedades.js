import { collection, doc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { computed } from 'vue'
import { useFirestore, useCollection, useDatabase, useFirebaseStorage } from 'vuefire'


export default function usePropiedades() {


    const storage = useFirebaseStorage()
    const db = useFirestore()
    const propiedadesCollection = useCollection(collection(db, 'propiedades'))

    const price = computed(() => {
        return (price) =>
            Number(price).toLocaleString('en-US', {
                style: 'currency',
                currency: 'COP'
            })

    })

    async function deleteItem(id, urlImage) {
        if (confirm('¿Seguro de eliminar esta propiedad?')) {
            const docRef = doc(db, 'propiedades', id)
            const imageRef = storageRef(storage, urlImage)

            await Promise.all([
                deleteDoc(docRef),
                deleteObject(imageRef)])

        }

    }


    return {
        propiedadesCollection,
        price,
        deleteItem
    }
}