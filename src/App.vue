<template>
    <v-app id="inspire">
        <!-- TODO : https://vuetifyjs.com/en/framework/icons -->
        <head>
            <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' rel="stylesheet">
        </head>
        <v-navigation-drawer
            clipped
            v-model="drawer"
            app
        >
            <v-list dense>
                <v-list-tile :to="'/home'">
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Home</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile :to="'/motorDesign'">
                    <v-list-tile-action>
                        <v-icon>whatshot</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Motor design</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="indigo" dark fixed app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-fade-transition mode="out-in">
                <router-view></router-view>
            </v-fade-transition>
        </v-content>
        <v-footer color="indigo" app inset>
            <span class="white--text">&copy; 2017</span>
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
    router,
    data: () => ({
        drawer: null
    })
}
</script>
