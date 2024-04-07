import { Enrolamiento } from "../models/enrolamiento.model";

export interface CargarEnrolamiento{
    total: number;
    enrolamientos: Enrolamiento[];
}