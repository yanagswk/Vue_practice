import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '@/views/User.vue'
import Profile from '@/views/Profile.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/user/:uid',
        name: 'user',
        component: User,
        // children: [
        //     {
        //         path: 'profile',
        //         name: 'profile',
        //         component: Profile
        //     }
        // ]
    },
    {
        path: '/user/:uid/profile',
        name: 'profile',
        component: Profile
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
