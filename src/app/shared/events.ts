import {Session} from './session';
import {Location} from './location';


export class ItEvent {

    id: number;
    name: string;
    category: string;
    startTime: string;
    endTime: string;
    startOfEvent: string;
    endOfEvent: string;
    price: number;
    location: Location;
    eventSessions: Session[];
    organizer: string;
    description: string;
    onlineUrl: string;


}
