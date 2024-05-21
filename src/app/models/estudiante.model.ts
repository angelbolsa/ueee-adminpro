interface _EstudianteUsuario{
    _id: string,
    nombre: string,
    img: string
}

export class Estudiante{
    constructor(
        public cedula: string,
        public apellidos: string,
        public nombres: string,
        public f_nac: string,
        public sexo: string,
        public ciudad: string,
        public direccion: string,
        public celular: string,
        public email: string,
        public img: string,
        public estado: string,
        public usuario?: _EstudianteUsuario,
        public _id?: string
    ){}
}

