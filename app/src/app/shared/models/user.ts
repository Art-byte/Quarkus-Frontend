import { Role } from "./role";
import { Status } from "./status";

export class User{

    constructor(){}

    _id: string;
    name: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    role: Role
    password: string;
    status: string;
    profilePicture: string;
}