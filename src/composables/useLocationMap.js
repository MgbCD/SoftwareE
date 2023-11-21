import { ref } from 'vue'

export default function useLocationMap() {


    const zoom = ref(10)
    const center = ref([6.2443677,-75.6636143])

    function pin(e)  {
        
        console.log(e.target.getLatLng())
        const marker = e.target.getLatLng()
        center.value = [marker.lat, marker.lng]

        console.log(center.value)
    }

    return {
        zoom,
        center,
        pin
    }
}