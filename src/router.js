import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Home.vue';
//import Show from './pages/Show.vue';
import Index from './pages/Index.vue';

const router = createRouter({
history: createWebHistory(),
routes:
    [
        {
        path: '/',
        name: 'home',
        component: Home
        },
        {
        path: '/perfumes',
        name: 'Index',
        component: Index
        },
        // {
        // path: '/perfumes/:id',
        // name: 'Show',
        // component: Show
        // },
    ]
});

export { router };