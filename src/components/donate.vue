<template>
    <v-dialog v-model="sheet" width="500">
        <template v-slot:activator="{ on }" v-show="!checkMode">
            <v-btn
                id="btnDonate"
                color="purple"
                v-show="!checkMode"
                 dark
                 v-on="on"
            >
                <v-icon left size="25">mdi-handshake</v-icon>
                Donate
            </v-btn>
        </template>
        <v-card>
            <v-card-title
                class="headline purple"
                primary-title
                style="color: white"
            >
                Support Meteor with donation
            </v-card-title>
            <v-card-text>
                <v-row justify="center" align="center">
                    <v-flex shrink>
                        <v-col>
                            <div class="mb-6">
                                <h2>Meteor is totally free, without ads and registration.</h2>
                                <p class="mt-5">
                                    This application is <b>maintained and financed by only one person</b>.
                                    I spent <b>over 500 hours</b> of my free time to make METEOR. That's 3 months of full-time work.
                                </p>

                                <span><b>Your support will be use:</b></span>
                                <ul>
                                    <li>to cover server costs</li>
                                    <li>to participate in the hundreds of hours of work it took to create METEOR</li>
                                    <li>as contribution to the next developments.</li>
                                </ul>
                                <p class="mt-5">
                                    <b>Thank you for your support</b>
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
                    outlined
                    @click="sheet = false"
                >
                    Later
                </v-btn>
                <v-btn
                    id="btnDonateNow"
                    color="purple"
                    dark
                    @click="sheet = !sheet"
                    target="_blank"
                    href="https://pages.donately.com/meteor/campaign/meteor/donate"
                >
                    <v-icon left size="25"  v-on="on">mdi-handshake</v-icon>
                    Donate now
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'donate',
    props: {
        checkMode: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            sheet: false,
            on: null
        }
    },
    mounted() {
        if (this.checkMode) {
            const now = new Date()
            const nextShowDonationPage = Number(localStorage.getItem('nextShowDonationPage'))
            if (nextShowDonationPage) {
                if (new Date(nextShowDonationPage) < now) {
                    this.sheet = true
                    this.setNextShowDate()
                }
            } else {
                this.sheet = true
                this.setNextShowDate()
            }
        }
    },
    methods: {
        setNextShowDate() {
            const now = new Date()
            localStorage.setItem('nextShowDonationPage', now.setMonth(now.getMonth() + 1))
        }
    }
}
</script>

<style scoped>

</style>
