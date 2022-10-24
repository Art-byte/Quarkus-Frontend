export class ActionConstants{
 
  /**
   * Estas constantes son las que nos ayudan a registrar cada evento que ocurre
   * sobre el sistema en la bitacora
   */
    public static ACTIVO: string = "ACTIVO";
    public static INACTIVO: string = "INACTIVO";
    public static BLOQUEO_POR_EXPIRACIÓN: string = "BLOQUEO POR EXPIRACIÓN";
    public static BLOQUEO_POR_INACTIVIDAD: string = "BLOQUEO POR INACTIVIDAD";
    public static BLOQUEO_POR_INTENTOS_FALLIDOS: string = "BLOQUEO POR INTENTOS FALLIDOS";
    public static BORRO_REGISTRO: string = "BORRO REGISTRO";
    public static CAMBIO_DE_CONTRASEÑA: string = "CAMBIO DE CONTRASEÑA";
    public static CONSULTO_MODULO: string = "CONSULTO MODULO";
    public static EDITO_REGISTRO: string = "EDITO REGISTRO";
    public static FIN_DE_SESIÓN: string = "FIN DE SESIÓN";
    public static INICIO_DE_SESION: string = "INICIO DE SESIÓN";
    public static NUEVO_REGISTRO: string = "NUEVO REGISTRO";
    public static PRIMER_ACCESO: string = "PRIMER ACCESO";
    public static RECUPERAR_CONTRASEÑA: string = "RECUPERA CONTRASEÑA";
    public static RESTAURA_CONTRASEÑA_CADUCA: string = "RESTAURA CONTRASEÑA CADUCA";
    public static SESIÓN_EDITO_USUARIO: string = "SESIÓN EDITO USUARIO";
    public static SOLICITA_RECUPERAR_CONTRASEÑA: string = "SOLICITA RECUPERAR CONTRASEÑA";

    public static inactiveStatus = "624c90f9b9b30b3181e3b94b";

}

export const nombreSpinner = 'spinner';

export class Constants {
  public static patternTEXT = /^\w+([a-zñ A-ZÑ0-9zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ.-_\"\´\-\s\,]+)?$/;
  public static pattertPassword = "^(?=.*[0-9])"
  + "(?=.*[a-z])(?=.*[A-Z])"
  + "(?=.*[@#$%^&+=])"
  + "(?=\\S+$).{8,15}$";
}




    
