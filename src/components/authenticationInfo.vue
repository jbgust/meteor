<template>
    <v-dialog v-model="sheet" persistent width="500">
        <v-card>
            <v-card-title
                class="headline purple"
                primary-title
                style="color: white"
            >
                Registration
            </v-card-title>
            <v-card-text>
                <v-row justify="center" align="center">
                    <v-flex shrink>
                        <v-col>
                            <div class="mb-6 mt-5">
                                <p class="mt-5 text--primary">
                                    To prepare for the next features each user will now have to register to use METEOR.
                                    Of course METEOR will remain free.
                                </p>
                                <p class="mt-5 text--primary">
                                    By the end of the year, user registration will
                                    allow you to save your motor online, no more need to export/import them.
                                    Other features should follow in 2021.
                                </p>
                            </div>
                        </v-col>
                    </v-flex>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    @click="markAsRead"
                >
                    OK
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    name: 'authentication-info',
    props: {
    },
    data() {
        return {
            sheet: !this.hasRead()
        }
    },
    mounted() {
        if (!this.hasRead()) {
            this.sheet = true
        }
    },
    methods: {
        markAsRead() {
            this.sheet = false
            localStorage.setItem('authenticationInfoRead', '1')
        },
        hasRead() {
            return localStorage.getItem('authenticationInfoRead') === '1'
        }
    }
}
</script>

<style scoped>

</style>
