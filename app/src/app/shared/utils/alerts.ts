import Swal from 'sweetalert2';

// ========================== ALERTAS ERRORES DE AUTENTICACION ======================================

//Alerta al superar numero de intentos de sesion
export const LimitToLogin = () => {
  return Swal.fire({
    icon: 'error',
    text: 'Has superado el limite de intentos de inicio de sesion, por lo cual la cuenta ha sido bloqueada por seguridad',
    confirmButtonColor: '#3f51b5',
  });
};

//Alerta cuando el usuario se encuentra bloqueado
export const UserBlocked = () => {
  return Swal.fire({
    icon: 'error',
    text: 'Usuario bloqueado, favor de comunicarse con el administrador',
    confirmButtonColor: '#3f51b5',
  });
};

//Alerta de credenciales incorrectas
export const ErrorUser = () => {
  return Swal.fire({
    icon: 'error',
    text: 'username o password incorrecto',
    confirmButtonColor: '#3f51b5',
  });
};

//Alerta de credenciales incorrectas
export const ErrorUserAuthorization = () => {
  return Swal.fire({
    icon: 'error',
    text: 'Acceso sin authorizacion',
    confirmButtonColor: '#3f51b5',
  });
};

// ========================== ALERTAS DE ERRORES DEL SISTEMA ======================================

// Alertas de Errores
export const ErrorServerAlert = () => {
  return Swal.fire({
    icon: 'error',
    text: 'Error, servidor desconectado',
    confirmButtonColor: '#3f51b5',
  });
};

export const ErrorAlert = (title: string) => {
  Swal.fire({
    icon: 'error',
    text: title,
    confirmButtonColor: '#3f51b5',
  });
};

// ========================== ALERTAS DE CONTROL DE SESION ======================================

//Alerta de expiracion de sesion
export const ExpiredSession = () => {
  return Swal.fire({
    icon: 'error',
    text: 'Lo sentimos, pero la sesión ha caducado. Por favor inicia sesión de nuevo',
    confirmButtonColor: '#3f51b5',
  });
};

//alerta de informes
export const CloseSession = (title: string, text: string) => {
  Swal.fire({
    icon: 'info',
    title: title,
    text: text,
    confirmButtonColor: '#3f51b5',
  });
};

// ========================== ALERTAS ERRORES DE CREACION DE DATOS ======================================
export const ErrorCreate = (msg: string) => {
  return Swal.fire({
    icon: 'error',
    text: msg,
    confirmButtonColor: '#3f51b5',
  });
};

export const ErrorCreatePassword = () => {
  return Swal.fire({
    icon: 'error',
    text: 'Los passwords no coinciden',
    confirmButtonColor: '#3f51b5',
  });
};

// ========================== ALERTAS ERRORES DE ACTUALIZACION DE DATOS ======================================

//Alerta de credenciales incorrectas
export const ErrorUpdatePassword = () => {
  return Swal.fire({
    icon: 'error',
    text: 'No ha podido actualizarse el password',
    confirmButtonColor: '#3f51b5',
  });
};

export const ErrorUpdate = (msg: string) => {
  return Swal.fire({
    icon: 'error',
    text: msg,
    confirmButtonColor: '#3f51b5',
  });
};

export const PasswordRepetido = () => {
  return Swal.fire({
    icon: 'error',
    text: 'El password no cumple con las caracteristicas o puede que ya haya sido utilizado antes, favor de elegir otro',
    confirmButtonColor: '#3f51b5',
  });
};

// ========================== ALERTAS CONFIRMACION DE CREACION DE DATOS ======================================
// Para cuando guardamos algo
export const savedConfirmation = () => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Se ha guardado extiosamente el registro',
    showConfirmButton: false,
    timer: 1500,
  });
};

// ========================== ALERTAS CONFIRMACION DE ACTUALIZACION DE DATOS ======================================
// Password actualizaddo
export const changeConfirmation = () => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Registro actualizado correctamente',
    showConfirmButton: false,
    timer: 1500,
  });
};

export const changeProdfilePhotoConfirmation = () => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Registro actualizado correctamente',
    showConfirmButton: false,
    timer: 1500,
  });
};

// Password actualizaddo
export const updatedProfile = () => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Tu perfil se ha actualizado correctamente',
    showConfirmButton: false,
    timer: 1500,
  });
};

// Password actualizaddo
export const updatedConfirmation = () => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Tu password se ha actualizado correctamente',
    showConfirmButton: false,
    timer: 1500,
  });
};

// Password actualizaddo
export const Welcome = () => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Tu perfil se ha actualizado correctamente',
    showConfirmButton: false,
    timer: 1500,
  });
};

// ========================== ALERTAS INFORMACION  ======================================

//alerta de informes
export const InformationAlert = (title: string, text: string) => {
  Swal.fire({
    icon: 'info',
    title: title,
    text: text,
    confirmButtonColor: '#3f51b5',
  });
};

export const sendingEmailAlerts = () => {
  Swal.fire({
    icon: 'info',
    title: 'Se han enviado las instrucciones al correo ingresado',
    showConfirmButton: false,
    timer: 3000,
  });
};

export const ErrorNetworkAlert = () => {
  return Swal.fire({
    icon: 'error',
    text: 'Error de red, verifique su conexión a internet',
    confirmButtonColor: '#3f51b5',
    timer: 2000,
  });
};

export const InternetSuccess = () => {
  Swal.fire({
    icon: 'success',
    text: '¡Conexión a internet restablecida!',
    confirmButtonColor: '#3f51b5',
    timer: 2000,
  });
};

const ToastWelcome = Swal.mixin({
  toast: true,
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export const WelcomeAlert = (title: string) => {
  return ToastWelcome.fire({
    position: 'top-end',
    icon: 'success',
    width: '300px',
    title: '<span style="color:#3f51b5"> Hola ' + title + ' bienvenido</span>',
  });
};

export const alerPasswordChange = () => {
  return ToastWelcome.fire({
    position: 'top-end',
    icon: 'success',
    width: '300px',
    title: '<span style="color:#3f51b5"> Tu password se ha actualizado</span>',
  });
};


export const quitarBackground = (elemento: string) => {
  const dialog = document.getElementById(elemento);
  dialog.classList.add('dialog-style');
};