interface _CursoUsuario{
    _id: string,
    nombre: string,
    img: string
}

export class Curso{
    constructor(
        public grado: ['8VO GRADO', '9NO GRADO', '10MO GRADO', '1ER CURSO', '2DO CURSO', '3ER CURSO'],
        public grado_abrev: ['8VO', '9NO', '10MO', '1ER BACH.', '2DO BACH.', '3ER BACH.'],
        public orden: number,
        public nivel: ['INICIAL', 'EGB ELEMENTAL', 'EGB MEDIA', 'EGB SUPERIOR', 'BACHILLERATO GENERAL UNIFICADO', 'BACHILLERATO TECNICO'],
        public nivel_abrev: ['INI', 'EGB ELEM.', 'EGB MED.', 'EGB SUP.', 'BGU', 'BT'],
        public paralelo: string,
        public jornada: ['MATUTINA', 'VESPERTINA', 'NOCTURNA'],
        public usuario: _CursoUsuario,
        public estado: string,
        public especialidad?: ['CONTABILIDAD', 'INFORMATICA', 'ELECTROMECANICA'],
        public _id?: string        
    ){}
}

