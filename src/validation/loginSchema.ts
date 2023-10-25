export const loginSchema = {
    email(value: string) {
        if (!value) {
          return 'Este campo es obligatorio';
        }
        // si es un email válido
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(value)) {
          return 'Email no válido';
        }
        return true;
    },
    password(value: any) {
        if (value) return true
        return 'El Password es Obligatorio'
    }
}