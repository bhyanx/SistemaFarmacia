export function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  export function validateDNI(dni) {
    return /^\d{8}$/.test(dni);
  }
  
  export function validateRequired(value) {
    return value !== null && value !== undefined && value.toString().trim() !== '';
  }