export const validationSchema = {
    titulo(value) {
        if (value?.length >= 6) return true
        return 'El titulo de la propiedad es obligatorio o muy corto'
    },
    Precio(value) {
        /*
            ^ - Representa el inicio de la cadena.
            [0-9]+ - Representa cualquier número del 0 al 9. El + indica que debe haber al menos un dígito, pero puede haber más.
            $ - Representa el final de la cadena.
        */
        if (/^[0-9]+$/.test(value)) return true
        return 'El Precio solo deben ser números'
    },
    Habitaciones(value) {
        if (value) return true
        return 'Selecciona una Cantidad'
    },
    Baños(value) {
        if (value) return true
        return 'Selecciona una Cantidad'
    },
    Garages(value) {
        if (value) return true
        return 'Selecciona una Cantidad'
    },
    Descripcion(value) {
        if (value) return true
        return 'Agrega una Descripción'
    }
}

export const imageSchema = {
    imagen(value) {
        if (value) return true
        return 'La Imagen es Obligatoria'
    },
}