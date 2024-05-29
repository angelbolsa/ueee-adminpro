interface _DatosCurso{
    _id: string,
    grado: string,
    nivel: string,
    paralelo: string,
    jornada: string
    especialidad?: string,
}

export class Matricula{
    constructor(
        public _id: string,
        public datosCurso: _DatosCurso,
    ){}
}