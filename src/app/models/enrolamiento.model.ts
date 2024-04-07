interface _EnrolamientoUsuario{
    _id: string,
    nombre: string,
    img: string
}

interface _EnrolamientoEstudiante{
    _id: string,
    cedula: string,
    apellidos: string,
    nombres: string,
    f_nac: string,
    sexo: number
}

interface _EnrolamientoCurso{
    _id: string,
    grado: string,
    nivel: string,
    paralelo: string,
    jornada: string,
    especialidad?: string
}

export class Enrolamiento{
    constructor(
        public periodo: string,
        public estudiante: _EnrolamientoEstudiante,
        public curso: _EnrolamientoCurso,
        public usuario: _EnrolamientoUsuario,
        public estado: string,
        public _id?: string
    ){}
}

