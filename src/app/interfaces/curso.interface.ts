import { Curso } from "../models/curso.model";

export interface CargarCurso{
    total: number;
    cursos: Curso[];
}