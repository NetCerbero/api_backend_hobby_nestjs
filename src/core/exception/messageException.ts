export const MessageException = {
    DUPLICATE:"El :atributo ya se encuentra en uso.",
    NOT_FOUND:"No se ha encontrado el registro.",
    NOT_SAVE:"No se ha podido guardar el registro.",
    NOT_GET:"No se ha podido recuperar el registro.",
    NOT_UPDATE:"No se ha podido actualizar el registro.",
    NOT_DELETE:"No se ha podido eliminar el registro.",
    NO_ACTION:"Acción no permitida.",
    NOT_FOUND_DATA:"No se ha encontrado coincidencias.",
    INVALID_CREDENTIALS:"Credenciales inválidas.",
    NOT_FOUND_TOKEN:"Acceso denegado, sin token de acceso.",
    NOT_FOUND_USER:"Usuario no encontrado.",
    TOKEN_INVALID:"Token inválido.",
    USE_DATA:":atributo ya se encuentra en uso."
}
export function MessageExceptionTransform(exceptionMessage:string, message:string){
    return "¡Ups!. " + exceptionMessage.replace(':atributo',message);
}