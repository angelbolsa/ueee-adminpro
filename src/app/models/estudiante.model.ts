interface _EstudianteUsuario{
    _id: string,
    nombre: string,
    img: string
}

interface _DatosMatricula{
    datosCurso: _DatosCurso
}

interface _DatosCurso{
    grado: string,
    orden: number,
    nivel: string,
    nivel_abrev: string,
    paralelo: string,
    jornada: string,
    especialidad?: string,
    _id?: string
}

export class Estudiante{
    constructor(
        public cedula: string,
        public apellidos: string,
        public nombres: string,
        public f_nac: string,
        public sexo: string,
        public datosMatricula: _DatosMatricula,
        public img?: string,
        public estado?: string,
        public usuario?: _EstudianteUsuario,
        public ciudad?: string,
        public direccion?: string,
        public celular?: string,
        public email?: string,
        public discapacidad?: string,
        public discapacidad_detalle?: string,
        public enfermedad_catastrofica?: string,
        public enfermedad_catastrofica_detalle?: string,
        public alergia?: string,
        public alergia_detalle?: string,
        public embarazo?: string,
        public embarazo_fecha?: string,
        public representante_cedula?: string,
        public representante_nombre_completo?: string,
        public representante_celular?: string,
        public representante_email?: string,
        public madre_cedula?: string,
        public madre_nombre_completo?: string,
        public madre_celular?: string,
        public madre_email?: string,
        public padre_cedula?: string,
        public padre_nombre_completo?: string,
        public padre_celular?: string,
        public padre_email?: string,
        public _id?: string
    ){}
}

