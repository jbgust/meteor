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
                <v-layout row wrap>
                    <v-flex lg6 md6>
                        <v-card>
                            <v-toolbar>
                                <v-toolbar-title>
                                    Which form field's refer to?
                                </v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-layout column>
                                    <v-flex>
                                        <v-img :src="require('@/assets/help/motor.png')" max-width="550px"></v-img>
                                    </v-flex>
                                    <v-flex>
                                        <v-img :src="require('@/assets/help/grain.png')" max-width="320px"></v-img>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex lg6 md6>
                        <v-card>
                            <v-toolbar>
                                <v-toolbar-title>
                                    What grain surface refer to?
                                </v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-layout row wrap justify-space-around>
                                    <v-flex shrink>
                                        <h3 align="center">Outer surface</h3>
                                        <v-img :src="require('@/assets/help/outer_surface.png')"></v-img>
                                    </v-flex>
                                    <v-flex shrink>
                                        <h3 align="center">End surface</h3>
                                        <v-img :src="require('@/assets/help/end_surface.png')"></v-img>
                                    </v-flex>
                                    <v-flex shrink>
                                        <h3 align="center">Core surface</h3>
                                        <v-img :src="require('@/assets/help/core_surface.png')"></v-img>
                                    </v-flex>
                                </v-layout>
                                <v-divider></v-divider>
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
