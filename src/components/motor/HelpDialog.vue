<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-app-bar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                    <v-icon id="btnCloseHelp">mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>
                    Meteor Manual
                </v-toolbar-title>
            </v-app-bar>
            <v-card-text>
                <v-container grid-list-md>
                <v-flex>
                    <v-card>
                        <v-toolbar>
                            <v-toolbar-title>
                                Help content
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-col>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title><a href="#finocyl">Finocyl cylinder grain settings</a></v-list-item-title>
                                        <v-list-item-title><a href="#hollow">Hollow cylinder grain settings</a></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-layout row wrap>
                    <v-flex  lg6 md6>
                        <v-card>
                            <v-toolbar>
                                <v-toolbar-title id="finocyl">
                                    Finocyl cylinder grain settings
                                </v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-col>
                                    <v-row wrap >
                                        <v-flex>
                                            <v-img :src="require('@/assets/help/motor.png')" max-width="450px"></v-img>
                                        </v-flex>
                                    </v-row>
                                </v-col>
                                <v-divider inset></v-divider>
                                <br>
                                <p>
                                    When the surface is set to 'Exposed' it's meam that the surface is exposed to the combustion. If set to 'Inhibited' the surface will not burn.
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex lg6 md6>
                        <v-card>
                            <v-toolbar>
                                <v-toolbar-title id="hollow">
                                    Hollow cylinder grain settings
                                </v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-layout column>
                                    <v-layout row wrap>
                                        <v-flex>
                                            <v-img :src="require('@/assets/help/motor.png')" max-width="450px"></v-img>
                                        </v-flex>
                                        <v-flex>
                                            <v-img :src="require('@/assets/help/grain.png')" max-width="220px"></v-img>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex>
                                            <h4>Outer surface</h4>
                                            <v-flex>
                                                <v-img :src="require('@/assets/help/outer_surface.png')" max-width="220px"></v-img>
                                            </v-flex>
                                        </v-flex>
                                        <v-flex>
                                            <h4>End surface</h4>
                                            <v-flex>
                                                <v-img :src="require('@/assets/help/end_surface.png')" max-width="220px"></v-img>
                                            </v-flex>
                                        </v-flex>
                                        <v-flex>
                                            <h4>Core surface</h4>
                                            <v-flex>
                                                <v-img :src="require('@/assets/help/core_surface.png')" max-width="220px"></v-img>
                                            </v-flex>
                                        </v-flex>
                                    </v-layout>
                                </v-layout>
                                <v-divider inset></v-divider>
                                <br>
                                <p>
                                    When the surface is set to 'Exposed' it's meam that the surface is exposed to the combustion. If set to 'Inhibited' the surface will not burn.
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'HelpDialog',
    data() {
        return {
            dialog: false
        }
    },
    methods: {
        show(showHelp = true) {
            this.dialog = showHelp
        }
    }
}
</script>

<style scoped>

</style>
