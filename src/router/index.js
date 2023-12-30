// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Signin from '@/components/authentication/Signin.vue'
import Signup from '@/components/authentication/Signup.vue'
import LostPassword from '@/components/authentication/LostPassword.vue'
import TokenValidator from '@/components/authentication/TokenValidator.vue'
import Home from '@/components/Home.vue'
import MotorDesignTool from '@/components/MotorDesignTool.vue'
import { TOKEN_STORAGE_KEY } from '@/store/modules/authentication'
import { isTokenValid } from '@/modules/utils.mjs'

const routes = [
    {
        path: '/signin',
        name: 'Signin',
        component: Signin,
        meta: {
            publicAccess: true
        }
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
        meta: {
            publicAccess: true
        }
    },
    {
        path: '/lost-password',
        name: 'LostPassword',
        component: LostPassword,
        meta: {
            publicAccess: true
        }
    },
    {
        path: '/validate',
        name: 'TokenValidator',
        component: TokenValidator,
        meta: {
            publicAccess: true
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            publicAccess: true
        }
    },
    {
        path: '/demo',
        name: 'Demo : Solid rocket motor design',
        component: MotorDesignTool,
        props: {
            demo: true
        },
        meta: {
            publicAccess: true
        }
    },
    {
        path: '/motorDesign',
        name: 'Solid rocket motor design',
        component: MotorDesignTool,
        props: {
            demo: false
        }
    },
    { path: '/:pathMatch(.*)*', redirect: '/home' },
    // if you omit the last `*`, the `/` character in params will be encoded when resolving or pushing
    { path: '/:pathMatch(.*)', redirect: '/home' },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        console.error("arg to", to)
        if (savedPosition) {
            console.error("saved")
            return savedPosition;
        }
        if (to.hash) {
            console.error("#", to.hash)
            return { el: to.hash, behavior: 'smooth' };
        }
        console.error("no  scrolll")
        return { x: 0, y: 0 };
    }
})

router.beforeEach((to, from, next) => {
    const isLogged = isTokenValid(localStorage.getItem(TOKEN_STORAGE_KEY))
    if (!to.meta.publicAccess && !isLogged) next({ name: 'Signin' })
    else next()
})


export default router
