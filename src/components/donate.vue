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
                            <div style="text-align: center; padding: 20px; margin: 20px 40px 0 40px; border: 1px solid dimgray; border-radius: 5px;">
                                <h2 style="margin-bottom: 10px;">Last 30 days donations</h2>
                                <h2 style="color: #9c27b0">{{ rollingMonthDonationsInDollars }}$</h2>
                            </div>
                            <div class="mb-6 mt-5">
                                <h4 style="color:purple; margin-top: 5px">Benefits for donors:</h4>
                                <ul style="margin-bottom: 5px">
                                    <li>
                                        <b>do not see this popup for 1 year</b>
                                    </li>
                                    <li>
                                        <b>benchmark of motors</b>
                                    </li>
                                </ul>
                                <br />
                                <p>Donations ensure the survival of METEOR.  Notably by paying the server fees and the CI platform. {{ `METEOR receives ${currentYearDonationsInDollars}$ in ${new Date().getFullYear()}`}}</p>
                                <p class="mt-5">
                                    <b>Thank you for your support.</b>
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
import { mapGetters } from 'vuex'

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
            rollingMonthDonationsInDollars: 0,
            currentYearDonationsInDollars: 0
        }
    },
    created() {
        Axios.get('/donations')
            .then((response) => {
                this.rollingMonthDonationsInDollars = response.data.rollingMonthDonationsInCent / 100
                this.currentYearDonationsInDollars = response.data.currentYearDonationsInCent / 100
            })
            .catch(function(error) {
                console.error(error)
            })
    },
    mounted() {
        if (this.checkMode && !this.isDonator()) {
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
            localStorage.setItem('nextShowDonationPage', now.setDate(now.getDate() + 1))
        },
        ...mapGetters('authentication', ['isDonator'])
    }
}
</script>

<style scoped>

</style>
