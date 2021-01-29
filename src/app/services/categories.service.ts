import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    getCategories() {
        return CATEGORIES;
    }

}

const CATEGORIES = {
    eventsCategories: [
        'infrastructure',
        'computing',
        'software',
        'Apis',
        'Networks',
        'Data Storage',
        'Date Synchronization',
        'Databases',
        'Data',
        'Analytics',
        'Content Management',
        'Content Delivery',
        'Transaction Processing',
        'Workflow',
        'Process Automation',
        'Event Processing',
        'Monitoring',
        'Information Security',
        'mobile',
        'Mobile Platforms',
        'Search',
        'Communications',
        'Games',
        'Development Environments',
        'Business Automation',
        'Robotics',
        'Internet of Things',
        'Artificial Intelligence'],

    sessionCategories: [
        'Beginner',
        'Intermediate',
        'Advanced'
    ]
};
