<template>
    <v-app id="inspire">
        <!-- TODO : https://vuetifyjs.com/en/framework/icons -->
        <head>
            <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' rel="stylesheet">
        </head>
        <v-toolbar color="indigo" dark fixed app>
            <v-toolbar-items>
                <v-btn flat :to="'/home'">
                    <v-icon left>home</v-icon>
                    Home
                </v-btn>
                <v-btn flat :to="'/motorDesign'">
                    <v-icon left>build</v-icon>
                    Meteor
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <v-fade-transition mode="out-in">
                <router-view></router-view>
            </v-fade-transition>
        </v-content>
        <v-footer app inset>
            <span class="footer-app">Made with love in France by <a href="https://github.com/jordan38" target="_blank">Jordan Content</a> and <a href="https://github.com/jbgust" target="_blank">Jérôme Bise</a></span>
        </v-footer>
    </v-app>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import MotorDesignTool from './components/MotorDesignTool'
import Home from './components/Home'

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
    components: { MotorDesignTool },
    router
}
</script>

<style>
    .footer-app {
        margin-left: 10px;
    }
</style>
