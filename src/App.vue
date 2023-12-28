<template>
    <v-app id="inspire">
        <v-app-bar color="indigo" theme="dark">
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn variant="text" :to="'/home'">
                    <v-icon>mdi-home</v-icon>
                </v-btn>
                <v-btn variant="text" :to="'/motorDesign'">
                    <v-icon start id="btnMeteor" size="25">mdi-rocket</v-icon>
                    Meteor
                </v-btn>
                <v-btn variant="text" href="http://meteor.boards.net/">
                    <v-icon start id="btnForumMeteor" size="25">mdi-forum-outline</v-icon>
                    Forum
                </v-btn>
                <v-btn variant="text" href="mailto:meteor@open-sky.fr?subject=METEOR">
                    <v-icon start id="contactMain" size="25">mdi-email-edit-outline</v-icon>
                    Contact
                </v-btn>
                <donate></donate>
            </v-toolbar-items>
            <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer">
            </v-app-bar-nav-icon>
            <v-toolbar-title class="hidden-md-and-up">Meteor</v-toolbar-title>
            <div class="hidden-xs ml-10" style="padding: 3px; background-color: #9c27b0; border: 2px solid purple; border-radius: 10px; color: white !important;" v-show="showMessageStarGrain">
                Star grain no longer available. Any help to improve it are welcome, <a style="color: black" href="mailto:meteor@open-sky.fr?subject=METEOR star grain">contact us</a>.
            </div>
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
                <!--                TODO : vuetify 3-->
<!--                <v-list-item-group-->
                    v-model="group">
                    <!--                TODO : vuetify 3-->
<!--                    <v-list-item-group color="primary">-->
                        <v-list-item :to="'/home'">
                            <v-list-item>
                                <v-icon>mdi-home</v-icon>
                            </v-list-item>
                            <!--                TODO : vuetify 3-->
                                <v-list-item-title>Home</v-list-item-title>
                        </v-list-item>
                        <v-list-item :to="'/motorDesign'">
                            <v-list-item>
                                <v-icon>mdi-rocket</v-icon>
                            </v-list-item>
                            <!--                TODO : vuetify 3-->
                                <v-list-item-title>Meteor</v-list-item-title>
                        </v-list-item>
                        <v-list-item href="http://meteor.boards.net/">
                            <v-list-item>
                                <v-icon>mdi-forum-outline</v-icon>
                            </v-list-item>
                            <!--                TODO : vuetify 3-->
                                <v-list-item-title>Forum</v-list-item-title>

                        </v-list-item>
                        <v-list-item href="mailto:meteor@open-sky.fr?subject=METEOR">
                            <v-list-item>
                                <v-icon>mdi-email-edit-outline</v-icon>
                            </v-list-item>
                            <!--                TODO : vuetify 3-->
                                <v-list-item-title>Contact</v-list-item-title>

                        </v-list-item>
                        <v-list-item :to="'/signin'" v-if="!isLogged">
                            <v-list-item>
                                <v-icon>mdi-login</v-icon>
                            </v-list-item>
                            <!--                TODO : vuetify 3-->
                                <v-list-item-title>Sign in</v-list-item-title>

                        </v-list-item>
                        <v-list-item :to="'/signup'" v-if="!isLogged">
                            <v-list-item>
                                <v-icon>mdi-account-plus</v-icon>
                            </v-list-item>
                            <!--                TODO : vuetify 3-->
                                <v-list-item-title>Sign up</v-list-item-title>

                        </v-list-item>
                        <v-list-item v-if="isLogged" @click="signOut">
                            <v-list-item>
                                <v-icon>mdi-logout</v-icon>
                            </v-list-item>
                            <!--                TODO : vuetify 3-->
                            <v-list-item-title>Sign out</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <!--                TODO : vuetify 3-->
                                <donate></donate>
                        </v-list-item>
<!--                    </v-list-item-group>-->
<!--                </v-list-item-group>-->
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <!--                TODO : vuetify 3-->
<!--            <v-fade-transition mode="out-in">-->
                <router-view></router-view>
        </v-main>
        <v-footer app inset class="hidden-sm-and-down bg-grey-lighten-2">
            <span class="footer-app">Made with love in Lyon, France by <a href="https://github.com/jordan38" target="_blank">Jordan Content</a> and <a href="https://github.com/jbgust" target="_blank">Jérôme Bise</a></span>
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
import Donate from './components/donate'
import Axios from 'axios'
import { mapActions, mapGetters } from  'vuex'
export default {
    name: 'app',
    components: { Donate, MeteorNews },
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
        showMessageStarGrain: !localStorage.getItem('starEnabled')
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
