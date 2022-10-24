import { Action } from "./action";
import { User } from "./user";

export class ActivityLog {
    id: Number;
    date: Date;
    username: string;
    action: Action;
    change: String;
    ip: String;
}