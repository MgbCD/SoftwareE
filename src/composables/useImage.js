import { computed } from 'vue'
import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { uid } from 'uid'

export default function useImage() {
    const storage = useFirebaseStorage()
    const storageRefPath = storageRef(storage, `/propiedades/${uid()}.jpg`)

    const {
        url, //recuperar url de la imagen una vez hospedada en el servidor
        upload
    } = useStorageFile(storageRefPath)

    async function uploadImage(e) {
        const data = e.target.files[0]
        if (data) {
            upload(data);
            /*try {
                await upload(data);
                console.log('Carga exitosa');
                // Realiza acciones adicionales si es necesario
            } catch (error) {
                console.error('Error al cargar el archivo:', error);
                // Muestra un mensaje de error al usuario o toma medidas adicionales
            }*/
        }
    }

    const image = computed(()=>{
        return url.value ? url.value : null
    }
    )

    return {
        url,
        uploadImage,
        image
    }
}