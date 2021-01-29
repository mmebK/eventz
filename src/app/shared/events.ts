import {Session} from './session';
import {Location} from './location';


export class ItEvent {

    id: number;
    name: string;
    startTime: Date;
    endTime: Date;
    startOfEvent: Date;
    endOfEvent: Date;
    price: number;
    location: Location;
    eventSessions: Session[];
    organizer: string;
    description: string;
    onlineUrl: string;


}
