import { Estudiante } from "../models/estudiante.model";

export interface CargarEstudiante{
    total: number;
    estudiantes: Estudiante[];
}