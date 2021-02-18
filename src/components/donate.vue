<template>
    <v-dialog v-model="sheet" width="500" persistent>
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
                                <h2 style="color: #9c27b0">${{ rollingMonthDonationsInDollars }}</h2>
                            </div>
                            <div class="mb-6 mt-5">
                                <h4 style="color:purple; margin-top: 5px">Benefits for donors:</h4>
                                <ul style="margin-bottom: 5px">
                                    <li>
                                        <b>do not see this popup anymore</b>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon
                                                    v-bind="attrs"
                                                    v-on="on"
                                                >
                                                    mdi-information-variant
                                                </v-icon>
                                            </template>
                                            <span>The popup will be disabled for one year.</span>
                                        </v-tooltip>
                                    </li>
                                    <li>
                                        <b>access to all new features</b> (like benchmark of motors, ...)
                                    </li>
                                </ul>
                                <br />
                                <p>Donations ensure the survival and future updates for Meteor. Notably by paying the server fees and the CI platform. {{ `METEOR receives $${currentYearDonationsInDollars} in ${new Date().getFullYear()}`}}</p>
                                <p class="mt-5">
                                    <b>Thank you for your support.</b>
                                </p>
                            </div>
                        </v-col>
                    </v-flex>
                </v-row>
                <v-alert type="info" v-model="donateClicked" outlined>
                    If you have made a donation, you must log out and log back in to be marked as donator.
                </v-alert>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    outlined
                    v-if="!donateClicked"
                    @click="sheet = false"
                    :loading="!closable"
                >
                    Later
                </v-btn>
                <v-btn
                    v-if="donateClicked"
                    @click="sheet = false"
                    color="primary"
                >
                    Close
                </v-btn>
                <v-btn
                    v-else
                    id="btnDonateNow"
                    color="purple"
                    dark
                    @click="onDonateClick()"
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
            currentYearDonationsInDollars: 0,
            closable: false,
            donateClicked: false
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
    methods: {
        setNextShowDate() {
            const now = new Date()
            localStorage.setItem('nextShowDonationPage', now.setDate(now.getDate() + 1))
        },
        onDonateClick() {
            this.donateClicked = true
        },
        check() {
            if (!this.isDonator()) {
                this.sheet = true
            } else {
                this.$emit('closeDonation')
                this.sheet = false
            }
        },
        ...mapGetters('authentication', ['isDonator'])
    },
    watch: {
        sheet(newValue) {
            if (newValue && this.checkMode) {
                setTimeout(() => {
                    if (this.sheet) {
                        this.closable = true
                    }
                }, 4000)
            } else {
                this.closable = false || !this.checkMode
                this.donateClicked = false
                this.$emit('closeDonation')
            }
        }
    }
}
</script>

<style scoped>

</style>
