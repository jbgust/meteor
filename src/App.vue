<template>
    <v-app id="inspire">
        <v-app-bar color="indigo" dark fixed app>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn text :to="'/home'">
                    <v-icon>mdi-home</v-icon>
                </v-btn>
                <v-btn text :to="'/motorDesign'">
                    <v-icon left id="btnMeteor" size="25">mdi-rocket</v-icon>
                    Meteor
                </v-btn>
                <v-btn text href="http://meteor.boards.net/">
                    <v-icon left id="btnForumMeteor" size="25">mdi-forum-outline</v-icon>
                    Forum
                </v-btn>
                <v-btn text href="mailto:meteor@open-sky.fr?subject=METEOR">
                    <v-icon left id="contactMain" size="25">mdi-email-edit-outline</v-icon>
                    Contact
                </v-btn>
                <donate></donate>
            </v-toolbar-items>
            <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer">
            </v-app-bar-nav-icon>
            <v-toolbar-title class="hidden-md-and-up">Meteor</v-toolbar-title>
            <div class="hidden-xs-only ml-10" style="padding: 3px; background-color: #9c27b0; border: 2px solid purple; border-radius: 10px; color: white !important;">
                Star grain no longer available. Any help to improve it are welcome, <a style="color: black" href="mailto:meteor@open-sky.fr?subject=METEOR star grain">contact us</a>.
            </div>
            <v-spacer></v-spacer>
            <v-btn text :to="'/signin'" v-if="!isLogged" class="hidden-sm-and-down">
                <v-icon left id="btnSignIn" size="25">mdi-login</v-icon>
                Sign in
            </v-btn>
            <v-btn text :to="'/signup'" v-if="!isLogged" class="hidden-sm-and-down">
                <v-icon left id="btnSignUp" size="25">mdi-account-plus</v-icon>
                Sign up
            </v-btn>
            <v-btn text v-if="isLogged" @click="signOut" class="hidden-sm-and-down">
                <v-icon left id="btnSignOut" size="25">mdi-logout</v-icon>
                Sign out
            </v-btn>
            <meteor-news/>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            absolute
            left
            temporary>
            <v-list
                nav
                dense>
                <v-list-item-group
                    v-model="group">
                    <v-list-item-group color="primary">
                        <v-list-item :to="'/home'">
                            <v-list-item-icon>
                                <v-icon>mdi-home</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Home</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item :to="'/motorDesign'">
                            <v-list-item-icon>
                                <v-icon>mdi-rocket</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Meteor</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item href="http://meteor.boards.net/">
                            <v-list-item-icon>
                                <v-icon>mdi-forum-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Forum</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item href="mailto:meteor@open-sky.fr?subject=METEOR">
                            <v-list-item-icon>
                                <v-icon>mdi-email-edit-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Contact</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item :to="'/signin'" v-if="!isLogged">
                            <v-list-item-icon>
                                <v-icon>mdi-login</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Sign in</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item :to="'/signup'" v-if="!isLogged">
                            <v-list-item-icon>
                                <v-icon>mdi-account-plus</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Sign up</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item v-if="isLogged" @click="signOut">
                            <v-list-item-icon>
                                <v-icon>mdi-logout</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Sign out</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <donate></donate>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <v-content>
            <v-fade-transition mode="out-in">
                <router-view></router-view>
            </v-fade-transition>
        </v-content>
        <v-footer app inset class="hidden-sm-and-down">
            <span class="footer-app">Made with love in Lyon, France by <a href="https://github.com/jordan38" target="_blank">Jordan Content</a> and <a href="https://github.com/jbgust" target="_blank">Jérôme Bise</a></span>
        </v-footer>

        <v-dialog
            v-model="lostConnectDialog"
            max-width="290">
            <v-card>
                <v-card-title
                    class="headline grey lighten-2"
                    primary-title>
                    Token expired</v-card-title>
                <v-card-text>
                    <div class="mt-5 text--primary" style="font-size: large">
                        To continue using METEOR, please sign in.
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green"
                        @click="closeLostConnectionPopUp"
                    >
                        Sign in
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify/lib'
import MotorDesignTool from './components/MotorDesignTool'
import Home from './components/Home'
import MeteorNews from './components/news/meteor-news'
import Donate from './components/donate'
import Signin from './components/authentication/Signin'
import Signup from './components/authentication/Signup'
import Axios from 'axios'
import LostPassword from './components/authentication/LostPassword'
import TokenValidator from './components/authentication/TokenValidator'
import { mapActions, mapGetters } from 'vuex'
import { TOKEN_STORAGE_KEY } from '@/store/modules/authentication'

Vue.use(Vuetify)
Vue.use(VueRouter)

let router = new VueRouter({
    routes: [
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
        { path: '*', redirect: '/home' }
    ]
})

router.beforeEach((to, from, next) => {
    const isLogged = !!localStorage.getItem(TOKEN_STORAGE_KEY)
    if (!to.meta.publicAccess && !isLogged) next({ name: 'Signin' })
    else next()
})

export default {
    name: 'app',
    components: { Donate, MeteorNews },
    router,
    created() {
        this.loadToken()
        let me = this
        Axios.interceptors.response.use(function(response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response
        }, function(error) {
            // Don't show lost connection dialog when calling auth endpoint
            if (error.response && error.response.status === 401 &&
                !(error.response.data && error.response.data.path && error.response.data.path.match(/\/auth\//))) {
                const isOnDemoPage = me.$router.currentRoute.path.includes('demo')
                me.lostConnectDialog = !isOnDemoPage
                me.clearToken()
            }
            return Promise.reject(error)
        })
    },
    data: () => ({
        drawer: false,
        group: null,
        lostConnectDialog: false
    }),
    methods: {
        closeLostConnectionPopUp() {
            this.lostConnectDialog = false
            router.push({ name: 'Signin' })
        },
        signOut() {
            this.clearToken()
            this.$router.push({ name: 'Home' }).catch(() => {})
        },
        ...mapActions('authentication', ['loadToken', 'clearToken'])
    },
    computed: {
        ...mapGetters('authentication', ['isLogged'])
    },
    watch: {
        group() {
            this.drawer = false
        }
    }
}
</script>

<style>
    .footer-app {
        margin-left: 10px;
    }
    body {
        background-color: #fafafa;
    }
</style>
