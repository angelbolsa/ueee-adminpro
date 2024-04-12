interface _EnrolamientoEstudiante{
    cedula: string,
    apellidos: string,
    nombres: string
}

interface _TitulacionEnrolamiento{
    estudiante: _EnrolamientoEstudiante
}

export class Titulacion{
    constructor(
        public dataEstudiante: _TitulacionEnrolamiento,
        public nota_grado: string,
        public acta_public_id: string,
        public acta_secure_url: string,
        public titulo_public_id: string,
        public titulo_secure_url: string,
        public estado: string,
        public _id?: string
    ){}
}

