<template>

    <v-container>
        <v-row class="mt-10">
        <v-card
            class="mx-auto"
            max-width="400"
        >
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/r3zaIF-FGHU?si=8FfpwPefjiLq87wB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

            <v-card-title class="pt-4">
                The Rocketeer
            </v-card-title>

            <v-card-text>
                <div style="text-align: justify;">
                    🚀 Welcome to The Rocketeer! 🚀<br />
                    I'm Chuck, a passionate hobbyist and Tripoli Level 2 rocketeer with a love for designing, building, and launching model rockets. On this channel, you'll find a mix of DIY rocket projects, including custom designs like my latest creation, the Avenger, tutorials, experiments, and thrilling launch footage.
                </div>
            </v-card-text>

            <v-card-actions>
                <v-btn color="orange" text="Explore" href="https://www.youtube.com/@TheRocketeer"  target="_blank"></v-btn>
            </v-card-actions>
        </v-card>

        <v-card
            class="mx-auto"
            max-width="400"
        >
            <v-img :src="nakkaImage" height="315" />

            <v-card-title class="pt-4">
                Richard Nakka's Experimental Rocketry
            </v-card-title>

            <v-card-text>
                <div style="text-align: justify">
                    This web site is devoted to the exciting activity of Amateur Experimental Rocketry !<br/>
                    My goal in producing this web site is to share experiences, ideas and technical details of Amateur Experimental Rocketry with others around the world who have a similar interest. It is also my dream to help inspire a future generation of rocket engineers and scientists who will some day take us to Mars and beyond...
                </div>
            </v-card-text>
            <v-card-actions class="mb-0">
                <v-btn color="orange" text="Explore" href="https://nakka-rocketry.net/" target="_blank"></v-btn>
                <v-btn color="orange" text="Youtube" href="https://www.youtube.com/@richardnakka7434" target="_blank"></v-btn>
            </v-card-actions>
        </v-card>
        </v-row>
        </v-container>
</template>

<script>

import nakka from '@/assets/nakka.png'

export default {
    name: 'learn-rocketry',
    data() {
        return {
            nakkaImage: nakka,
        }
    }
}
</script>
