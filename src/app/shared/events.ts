import {Session} from './session';
import {Location} from './location';


export class ItEvent {

    id: number;
    name: string;
    time: string;
    date: Date;
    price: number;
    online_Url: string;
    location: Location;
    sessions: Session[];


}
