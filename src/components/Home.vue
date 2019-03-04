<template>
    <v-container fluid grid-list-md fill-height>
        <v-layout row wrap>
            <v-flex d-flex>
                <v-card>
                    <v-card-title class="headline grey lighten-2"
                                  primary-title>
                        TODO : Home pag
                    </v-card-title>
                    <v-card-text>
                        <v-btn :to="'/demo'">Demo</v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'home'
}
</script>

<style scoped>

</style>
