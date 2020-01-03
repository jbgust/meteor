<template>
    <v-bottom-sheet v-model="sheet">
        <template v-slot:activator="{ on }">
            <v-btn
                color="purple"
                 dark
                 v-on="on"
            >
                <v-icon left size="25">mdi-handshake</v-icon>
                Donate
            </v-btn>
        </template>
        <v-sheet>
            <v-row justify="center" align="center">
                <v-flex shrink>
                    <v-col>
                        <v-btn
                            class="mt-6 mb-6"
                            color="purple"
                            dark
                            @click="sheet = !sheet"
                            target="_blank"
                            href="https://pages.donately.com/meteor/campaign/meteor/donate"
                        >
                            <v-icon left size="25"  v-on="on">mdi-handshake</v-icon>
                            Donate now
                        </v-btn>
                        <div class="mb-6">
                            <h3>Meteor is a free web application maintains by only one person.</h3>
                            <span>Your support will be use:</span>
                            <ul>
                                <li>to cover server costs</li>
                                <li>to participate in the hundreds of hours of work it took to create METEOR</li>
                                <li>as contribute to the next developments.</li>
                            </ul>
                        </div>
                    </v-col>
                </v-flex>
            </v-row>
        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
export default {
    name: 'donate',
    data() {
        return {
            sheet: false,
            on: null
        }
    }
}
</script>

<style scoped>

</style>
