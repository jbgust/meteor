<template>
    <v-app id="inspire">
        <v-app-bar color="indigo" density="compact">
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn variant="text" :to="'/home'" icon="mdi-home">
                </v-btn>
                <v-btn variant="text" :to="'/motorDesign'">
                    <v-icon start id="btnMeteor" size="25">mdi-rocket-launch</v-icon>
                    Meteor
                </v-btn>
                <v-btn variant="text" :to="'/learn'" @click="hideBadgeFct1">
                    <v-icon start id="btnLearn" size="25">mdi-school-outline</v-icon>
                    Learn rocketry
                    <template v-slot:append v-if="highlightNewsFct1">
                        <v-badge
                            color="error"
                            inline
                            content="new"
                        />
                    </template>
                </v-btn>
                <v-btn variant="text" href="mailto:meteor@open-sky.fr?subject=METEOR">
                    <v-icon start id="contactMain" size="25">mdi-email-edit-outline</v-icon>
                    Contact
                </v-btn>
            </v-toolbar-items>
            <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer">
            </v-app-bar-nav-icon>
            <v-toolbar-title class="hidden-md-and-up">Meteor</v-toolbar-title>

            <v-dialog max-width="500" >
                <template v-slot:activator="{ props: activatorProps }">
                    <div class="hidden-xs ml-10"
                         style="padding: 3px; background-color: red; border: 2px solid purple; border-radius: 10px; color: black !important;"
                         v-show="showMessageStarGrain">
                        <b>&nbsp;End of life in December 2026</b> Wants to take over METEOR ?
                        <v-btn  v-bind="activatorProps" color="white" text="black" density="compact"><b>click here</b></v-btn>
                    </div>
                </template>

                <template v-slot:default="{ isActive }">
                    <v-card>
                        <v-card-title primary-title class="text-h5 bg-red">
                            METEOR EOL
                        </v-card-title>
                        <v-card-text>
                            <p style="text-align: justify">
                                <b>The METEOR application will be discontinued at the end of 2026.</b>
                                I would like to thank everyone
                                who has contributed to and supported the project over the years.
                            </p>

                            <br/>
                            <p style="text-align: justify;">
                                The project does not have to end here. <b>If anyone is interested
                                in taking over METEOR</b>, please do not hesitate to contact me.
                            </p>

                            <br/>
                            <p style="text-align: justify;">
                                I will be happy to help you take over the project. All the code is open source and
                                available on Github. You will still need some software development skills, particularly in Java and Vue.js.
                                Infrastructure management is fully automated, with pipelines that handle all testing and production deployments.
                                All dependency versions have been regularly updated. The frontend features are almost entirely
                                covered by E2E tests, and the same is true for the backend. The source code has been written to a
                                very high standard, which will make it much easier for one of you to take over. Here are the source code :
                            </p>
                            <ul>
                                <li><a target="_blank" href="https://github.com/jbgust/meteor">Frontend</a></li>
                                <li><a target="_blank" href="https://github.com/jbgust/rocket-motor-design">Backend</a></li>
                                <li><a target="_blank" href="https://github.com/jbgust/jsrm">JSRM (computation model)</a></li>
                            </ul>
                            <br/>
                            <h3>Please don't hesitate to contact me if you would like to take over the project.</h3>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn variant="outlined" href="mailto:meteor@open-sky.fr?subject=METEOR end of life">
                                Contact us
                                <v-icon end>mdi-email-edit-outline</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                text="Close Dialog"
                                @click="isActive.value = false"
                            ></v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
            <v-spacer></v-spacer>
            <v-btn variant="text" :to="'/signin'" v-if="!isLogged" class="hidden-sm-and-down">
                <v-icon start id="btnSignIn" size="25">mdi-login</v-icon>
                Sign in
            </v-btn>
            <v-btn variant="text" :to="'/signup'" v-if="!isLogged" class="hidden-sm-and-down">
                <v-icon start id="btnSignUp" size="25">mdi-account-plus</v-icon>
                Sign up
            </v-btn>
            <v-btn variant="text" v-if="isLogged" @click="signOut" class="hidden-sm-and-down">
                <v-icon start id="btnSignOut" size="25">mdi-logout</v-icon>
                Sign out
            </v-btn>
            <meteor-news/>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            absolute
            left
            temporary>
            <v-list nav density="compact">
                        <v-list-item :to="'/home'" prepend-icon="mdi-home">
                                Home
                        </v-list-item>
                        <v-list-item :to="'/motorDesign'" prepend-icon="mdi-rocket-launch">
                            Meteor
                        </v-list-item>
                        <v-list-item :to="'/learn'" prepend-icon="mdi-school-outline" @click="hideBadgeFct1">
                            Learn rocketry
                            <template v-slot:append v-if="highlightNewsFct1">
                                <v-badge
                                    color="error"
                                    inline
                                    content="new"
                                />
                            </template>
                        </v-list-item>
                        <v-list-item href="mailto:meteor@open-sky.fr?subject=METEOR" prepend-icon="mdi-email-edit-outline">
                            Contact
                        </v-list-item>
                        <v-list-item :to="'/signin'" v-if="!isLogged" prepend-icon="mdi-login">
                            Sign in
                        </v-list-item>
                        <v-list-item :to="'/signup'" v-if="!isLogged" prepend-icon="mdi-account-plus">
                            Sign up
                        </v-list-item>
                        <v-list-item v-if="isLogged" @click="signOut" prepend-icon="mdi-logout">
                            Sign out
                        </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <router-view></router-view>
        </v-main>
        <v-footer app inset height="20px" class="hidden-sm-and-down bg-white">
            <span class="footer-app" style="color: red; width: 100%; background-color: white; text-align: center">
                <b>METEOR EOL </b>: end of life planned for decembre 2026
            </span>
        </v-footer>

        <v-dialog
            v-model="lostConnectDialog"
            max-width="290">
            <v-card>
                <v-card-title
                    class="text-h5 bg-grey-lighten-2"
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
import MeteorNews from './components/news/meteor-news'
import Axios from 'axios'
import { mapActions, mapGetters } from  'vuex'
export default {
    name: 'app',
    components: { MeteorNews },
    created() {
        Axios.defaults.baseURL = import.meta.env.VITE_METEOR_BACKEND_BASE_URL
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
                const isOnDemoPage = me.$router.currentRoute.value.path.includes('demo')
                me.lostConnectDialog = !isOnDemoPage
                me.clearToken()
            }
            return Promise.reject(error)
        })
    },
    data: () => ({
        drawer: false,
        group: null,
        lostConnectDialog: false,
        showMessageStarGrain: !localStorage.getItem('starEnabled'),
        highlightNewsFct1 : !localStorage.getItem('newsFct1Shown')
    }),
    methods: {
        closeLostConnectionPopUp() {
            this.lostConnectDialog = false
            this.$router.push({ name: 'Signin' })
        },
        signOut() {
            this.clearToken()
            this.$router.push({ name: 'Home' }).catch(() => {})
        },
        hideBadgeFct1() {
            localStorage.setItem('newsFct1Shown', true)
            this.highlightNewsFct1 = false
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
