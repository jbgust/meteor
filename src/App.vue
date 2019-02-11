<template>
    <v-app id="inspire">
        <!-- TODO : https://vuetifyjs.com/en/framework/icons -->
        <head>
            <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' rel="stylesheet">
        </head>
        <v-navigation-drawer
            fixed
            v-model="drawer"
            app
        >
            <v-list dense>
                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Home</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>contact_mail</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Contact</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="indigo" dark fixed app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-toolbar>
        <v-content>

                        <motor-design-tool/>
        </v-content>
        <v-footer color="indigo" app inset>
            <span class="white--text">&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import MotorDesignTool from './components/MotorDesignTool'

Vue.use(Vuetify)

export default {
    name: 'app',
    components: { MotorDesignTool },
    data: () => ({
        drawer: null
    })
}
</script>
