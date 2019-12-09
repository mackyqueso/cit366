import { Injectable } from "@angular/core";


@Injectable()
export class Event {
    constructor(
        public id: string,
        public name: string,
        public date: Date,
        public description: string
    ) {}
}