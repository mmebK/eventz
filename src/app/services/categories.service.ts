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
        'Infrastructure',
        'Computing',
        'Software',
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
        'Mobile',
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
    ],
    keyWords: [
        'Internet of Things',
        'Artificial Intelligence',
        'Infrastructure',
        'Computing',
        'Software',
        'Analytics'
    ]
};
