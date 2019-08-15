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
                    <v-icon left size="25">mdi-forum-outline</v-icon>
                    Forum
                </v-btn>
            </v-toolbar-items>
            <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer">

            </v-app-bar-nav-icon>
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
                    </v-list-item-group>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <v-content>
            <v-fade-transition mode="out-in">
                <router-view></router-view>
            </v-fade-transition>
        </v-content>
        <v-footer app inset>
            <span class="footer-app">Made with love in Lyon, France by <a href="https://github.com/jordan38" target="_blank">Jordan Content</a> and <a href="https://github.com/jbgust" target="_blank">Jérôme Bise</a></span>
        </v-footer>
    </v-app>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify/lib'
import MotorDesignTool from './components/MotorDesignTool'
import Home from './components/Home'
import { computeHash } from './modules/computationUtils'

Vue.use(Vuetify)
Vue.use(VueRouter)

let router = new VueRouter({
    routes: [
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/demo',
            name: 'Demo : Solid rocket motor design',
            component: MotorDesignTool,
            props: {
                demo: true
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

export default {
    name: 'app',
    // eslint-disable-next-line vue/no-unused-components
    components: { MotorDesignTool },
    router,
    mounted() {
        computeHash()
    },
    data: () => ({
        drawer: false,
        group: null
    }),

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
