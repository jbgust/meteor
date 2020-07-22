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
                            <v-progress-linear
                                color="purple"
                                height="25"
                                :value="donationProgress"
                                striped
                                class="mt-5"
                            >
                                <strong>{{ Math.floor(donationProgress) }}%</strong>
                            </v-progress-linear>
                            <div style="text-align: center">
                                <b>2020 Donation campaign progress (started in February)</b>
                            </div>
                            <div style="text-align: center; color: red">
                                <b>{{parseInt(donation)}}€ donated by {{donors}} donors</b>
                            </div>
                            <div class="mb-6 mt-5">
                                <h2 class="mb-5" style="color:purple">Meteor averages 2,500 calculations a month.</h2>
                                <h2>Meteor is totally free, without ads and registration.</h2>
                                <p class="mt-5">
                                    This application is <b>maintained and financed by only one person</b>.
                                    I spent <b>over 500 hours</b> to make METEOR. That's 3 months of full-time work.
                                </p>

                                <span><b>Your support will be use:</b></span>
                                <ul>
                                    <li>to cover server costs</li>
                                    <li>to rent a powerfullest server, for faster computations</li>
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
import Axios from 'axios'

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
            on: null,
            donationProgress: 0,
            donors: '',
            donation: 0,
            axiosDonately: Axios.create({
                baseURL: 'https://api.donately.com/v2/',
                timeout: 10000
            })
        }
    },
    created() {
        let me = this
        this.axiosDonately.defaults.headers.common['Authorization'] = null
        this.axiosDonately.get('campaigns/cmp_538c8c9886c5?account_id=act_0c5c4a8bab6f')
            .then(function(response) {
                me.donationProgress = response.data.data.percent_funded * 100
                me.donors = response.data.data.donors_count
                me.donation = response.data.data.amount_raised_in_cents / 100
            })
            .catch(function(error) {
                console.error(error)
            })
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
            localStorage.setItem('nextShowDonationPage', now.setDate(now.getDate() + 7))
        }
    }
}
</script>

<style scoped>

</style>
