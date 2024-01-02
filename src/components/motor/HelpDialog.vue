<template>
    <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
        <v-card>
            <v-card-title class="bg-blue">
                <v-row no-gutters>
                    <p>Meteor Manual</p>
                    <v-spacer></v-spacer>
                    <v-btn icon="mdi-close" @click="dialog = false"  variant="text" id="btnCloseHelp" density="compact">
                    </v-btn>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-card class="mb-5">
                        <v-toolbar>
                            <v-toolbar-title>
                                Help content
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-col>
                                <v-list variant="flat" density="compact">
                                    <v-list-item @click="showElement('hollow')" class="text-blue-darken-2">
                                        Hollow cylinder grain settings
                                    </v-list-item>
                                    <v-list-item @click="showElement('rasp')" class="text-blue-darken-2">
                                        RASP export and OpenRocket
                                    </v-list-item>
                                    <v-list-item @click="showElement('finocyl')" class="text-blue-darken-2">
                                        Finocyl grain settings
                                    </v-list-item>
                                    <v-list-item @click="showElement('star')" class="text-blue-darken-2">
                                        Star grain settings
                                    </v-list-item>
                                    <v-list-item @click="showElement('moonburner')" class="text-blue-darken-2">
                                        Moon burner grain settings
                                    </v-list-item>
                                    <v-list-item @click="showElement('rodTube')" class="text-blue-darken-2">
                                        Rod and tube grain settings
                                    </v-list-item>
                                    <v-list-item @click="showElement('cSlot')" class="text-blue-darken-2">
                                        C slot grain settings
                                    </v-list-item>
                                    <v-list-item @click="showElement('endburner')" class="text-blue-darken-2">
                                        End burner grain settings
                                    </v-list-item>
                                </v-list>
                            </v-col>
                        </v-card-text>
                    </v-card>
                <v-row wrap>
                    <v-col lg="6" md="6">
                        <v-card>
                            <v-toolbar>
                                <v-toolbar-title id="hollow">
                                    Hollow cylinder grain settings
                                </v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-layout column>
                                    <v-layout row wrap>
                                        <v-col>
                                            <v-img :src="motorImage" max-width="450px"></v-img>
                                        </v-col>
                                        <v-col>
                                            <v-img :src="grainImage" max-width="220px"></v-img>
                                        </v-col>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-col>
                                            <h4>Outer surface</h4>
                                            <v-col>
                                                <v-img :src="outerSurfaceImage" max-width="220px"></v-img>
                                            </v-col>
                                        </v-col>
                                        <v-col>
                                            <h4>End surface</h4>
                                            <v-col>
                                                <v-img :src="endSurfaceImage" max-width="220px"></v-img>
                                            </v-col>
                                        </v-col>
                                        <v-col>
                                            <h4>Core surface</h4>
                                            <v-col>
                                                <v-img :src="coreSurfaceImage" max-width="220px"></v-img>
                                            </v-col>
                                        </v-col>
                                    </v-layout>
                                </v-layout>
                                <v-divider inset></v-divider>
                                <br>
                                <p>
                                    When the surface is set to 'Exposed' it's meam that the surface is exposed to the combustion. If set to 'Inhibited' the surface will not burn.
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card>
                            <v-toolbar>
                                <v-toolbar-title id="rasp">
                                    RASP export and OpenRocket
                                </v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-col>
                                    <p>
                                        With RASP export, you can use the motor you design in other application like <a href="http://openrocket.info/" target="_blank">OpenRocket</a>.
                                        OpenRocket is a free, fully featured model rocket simulator that allows you to design and simulate your rockets before you build and flying them.
                                    </p>
                                    <p>
                                        See here to find how import RASP file in OpenRocket : <a href="http://wiki.openrocket.info/FAQ#How_do_I_add_motors_to_the_database.3F" target="_blank">http://wiki.openrocket.info/FAQ#How_do_I_add_motors_to_the_database.3F</a>
                                    </p>
                                    <p>
                                        If you want more information about RASP format : <a href="http://www.thrustcurve.org/raspformat.shtml" target="_blank">http://www.thrustcurve.org/raspformat.shtml</a>
                                    </p>
                                </v-col>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col lg="6" md="6">
                        <v-card>
                            <v-toolbar>
                                <v-toolbar-title id="finocyl">
                                    Finocyl grain settings
                                </v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-col>
                                    <v-col>
                                        <v-img :src="urlFinocylHelp" class="help-image"></v-img>
                                    </v-col>
                                    <v-col>
                                        <v-img :src="motorImage" max-width="450px"></v-img>
                                    </v-col>
                                </v-col>
                                <v-divider inset></v-divider>
                                <br>
                                <p>
                                    When the surface is set to 'Exposed' it's meam that the surface is exposed to the combustion. If set to 'Inhibited' the surface will not burn.
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col  lg="6" md="6">
                        <v-card>
                            <v-toolbar>
                                <v-toolbar-title id="star">
                                    Star grain settings
                                </v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-col>
                                    <v-col>
                                        <v-img :src="starHelpImage" class="help-image"></v-img>
                                    </v-col>
                                    <v-col>
                                        <v-img :src="motorImage" max-width="450px"></v-img>
                                    </v-col>
                                </v-col>
                                <v-divider inset></v-divider>
                                <br>
                                <p>
                                    When the surface is set to 'Exposed' it's meam that the surface is exposed to the combustion. If set to 'Inhibited' the surface will not burn.
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col  lg="6" md="6">
                        <v-card>
                            <v-toolbar>
                                <v-toolbar-title id="moonburner">
                                    Moon burner grain settings
                                </v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-col>
                                    <v-col>
                                        <img :src="moonburnerImage" class="help-image-large"/>
                                    </v-col>
                                    <v-col>
                                        <v-img :src="motorImage" max-width="450px"></v-img>
                                    </v-col>
                                </v-col>
                                <v-divider inset></v-divider>
                                <br>
                                <p>
                                    When the surface is set to 'Exposed' it's meam that the surface is exposed to the combustion. If set to 'Inhibited' the surface will not burn.
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col  lg="6" md="6">
                        <v-card>
                            <v-toolbar>
                                <v-toolbar-title id="rodTube">
                                    Rod and tube grain settings
                                </v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-col>
                                    <v-col>
                                        <v-img :src="rodTubeImage" class="help-image"></v-img>
                                    </v-col>
                                    <v-col>
                                        <v-img :src="motorImage" max-width="450px"></v-img>
                                    </v-col>
                                </v-col>
                                <v-divider inset></v-divider>
                                <br>
                                <p>
                                    When the surface is set to 'Exposed' it's meam that the surface is exposed to the combustion. If set to 'Inhibited' the surface will not burn.
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col  lg="6" md="6">
                        <v-card>
                            <v-toolbar>
                                <v-toolbar-title id="cSlot">
                                    C slot grain settings
                                </v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-col>
                                    <v-col>
                                        <v-img :src="cslotNoCoreImage" class="help-image"></v-img>
                                    </v-col>
                                    <v-col>
                                        <v-img :src="cslotImage" class="help-image"></v-img>
                                    </v-col>
                                    <v-col>
                                        <v-img :src="motorImage" max-width="450px"></v-img>
                                    </v-col>
                                </v-col>
                                <v-divider inset></v-divider>
                                <br>
                                <p>
                                    When the surface is set to 'Exposed' it's meam that the surface is exposed to the combustion. If set to 'Inhibited' the surface will not burn.
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col  lg="6" md="6">
                        <v-card>
                            <v-toolbar>
                                <v-toolbar-title id="endburner">
                                    End burner grain settings
                                </v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-col>
                                    <v-col>
                                        <v-img :src="endBurnerhelpImage" class="help-image"></v-img>
                                    </v-col>
                                </v-col>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import finocylHelp from '@/assets/help/finocyl-help.svg'
import starHelp from '@/assets/help/star-help.svg'
import moonburner from '@/assets/help/moon-burner.png'
import rodTube from '@/assets/help/rod-tube.png'
import cslotNoCore from '@/assets/help/c-slot_no-core.png'
import cslot from '@/assets/help/c-slot.png'
import motor from '@/assets/help/motor.png'
import grain from '@/assets/help/grain.png'
import outerSurface from '@/assets/help/outer_surface.png'
import endSurface from '@/assets/help/end_surface.png'
import coreSurface from '@/assets/help/core_surface.png'
import endBurnerhelp from '@/assets/help/end-burner-help.png'
import { scrollToElement } from '@/modules/utils.mjs'
export default {
    name: 'HelpDialog',
    data() {
        return {
            dialog: false,
            urlFinocylHelp: finocylHelp,
            starHelpImage: starHelp,
            moonburnerImage: moonburner,
            rodTubeImage: rodTube,
            cslotNoCoreImage: cslotNoCore,
            cslotImage: cslot,
            motorImage: motor,
            grainImage: grain,
            outerSurfaceImage: outerSurface,
            endSurfaceImage: endSurface,
            coreSurfaceImage: coreSurface,
            endBurnerhelpImage: endBurnerhelp
        }
    },
    methods: {
        show(showHelp = true) {
            this.dialog = showHelp
        },
        showElement(elementId) {
            scrollToElement(elementId)
        }
    }
}
</script>

<style scoped>
.help-image-large {
    max-width: 300px
}

.help-image {
    max-width: 450px
}
</style>
