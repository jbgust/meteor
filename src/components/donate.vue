<template>
    <v-dialog v-model="sheet" width="500" persistent>
        <template v-slot:activator="{ props }">
            <v-btn
                color="white"
                id="btnDonate"
                v-show="!checkMode"
                v-bind="props"
                variant="text"
                style="background-color: #9c27b0"
                width="140px"
            >
                <v-icon start size="25">mdi-handshake</v-icon>
                Donate
            </v-btn>
        </template>
        <v-card>
            <v-card-title
                class="text-h5 bg-purple"
                primary-title
                style="color: white"
            >
                Support Meteor with donation
            </v-card-title>
            <v-card-text>
                <v-row justify="center" align="center">
                    <v-col shrink>
                        <v-col>
                            <div class="mb-6 mt-5">
                                <h4 style="color:purple; margin-top: 5px">Benefits for donors:</h4>
                                <ul style="margin-bottom: 5px">
                                    <li>
                                        <b>do not see this popup anymore</b>
                                        <v-tooltip location="bottom">
                                            <template v-slot:activator="{props}">
                                                <v-icon
                                                    v-bind="props"
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
                                <p>Donations ensure the survival and future updates for Meteor. Notably by paying the server fees and the CI platform.</p>
                                <p class="mt-5">
                                    <b>Thank you for your support.</b>
                                </p>
                            </div>
                        </v-col>
                    </v-col>
                </v-row>
                <v-alert type="info" v-model="donateClicked" variant="outlined">
                    If you have made a donation, you must log out and log back in to be marked as donator.
                </v-alert>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    variant="outlined"
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
                    theme="dark"
                    @click="onDonateClick()"
                    target="_blank"
                    href="https://pages.donately.com/meteor/campaign/meteor/donate"
                >
                    <v-icon start size="25"  v-bind="props">mdi-handshake</v-icon>
                    Donate now
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
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
            closable: false,
            donateClicked: false
        }
    },
    created() {
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
            const now = new Date()
            const nextShowDonationPage = Number(localStorage.getItem('nextShowDonationPage'))
            if (!this.isDonator() && (new Date(nextShowDonationPage) < now)) {
                this.sheet = true
                this.setNextShowDate()
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
