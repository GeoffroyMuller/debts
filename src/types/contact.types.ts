import { Operation } from "./operation.types";

export interface Contact {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    operations: Operation[];
    
}