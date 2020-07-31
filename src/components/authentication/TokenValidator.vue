<template>
    <v-container>
        <v-layout column align-center>
            <v-flex xs10 sm6 class="pb-10">
                <v-alert
                    v-if="showMessage"
                    border="top"
                    colored-border
                    :type="messageType"
                    elevation="2"
                    max-width="400"
                >
                    <p>{{ message }}</p>
                    <v-btn
                        v-if="messageType === 'info'"
                        color="green"
                        @click="$router.push({ name: 'Signin' })"
                    >
                        Sign in
                    </v-btn>
                </v-alert>
            </v-flex>
            <v-btn
                v-if="resentToken"
                color="primary"
                @click="resentActivationLink"
            >
                Click here to get a new link
            </v-btn>
        </v-layout>
    </v-container>

</template>

<script>
import Axios from 'axios'

export default {
    name: 'TokenValidator',
    data() {
        return {
            message: null,
            messageType: null,
            showMessage: false,
            resentToken: false,
            messageResentActivationLink: 'dfgfsdgd'
        }
    },
    mounted() {
        this.validate()
    },
    methods: {
        validate() {
            const me = this
            Axios.post(`/auth/validate/${this.$route.query.token}`, {}, { data: {
                email: this.email
            } })
                .then(() => {
                    me.message = 'Your account has been validated'
                    me.messageType = 'success'
                    me.showMessage = true
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        me.message = 'Token not found'
                    } else {
                        me.message = error.response.data.message
                    }
                    me.messageType = 'error'
                    me.showMessage = true

                    if (this.activationLinkExpires(error)) {
                        me.resentToken = true
                    }
                })
        },
        activationLinkExpires(error) {
            return this.$route.query.tokenType === 'CREATION_COMPTE' &&
                error.response.data.message === 'Token has expired.'
        },
        resentActivationLink() {
            const me = this
            me.resentToken = false
            Axios.post(`/auth/resent-activation/${this.$route.query.token}`)
                .then(() => {
                    me.message = 'A new activation link has been sent to your address.'
                    me.messageType = 'success'
                    me.showMessage = true
                })
                .catch(() => {
                    me.message = 'Failed to send new activation link. If the problem persist please contact us.'
                    me.messageType = 'error'
                    me.showMessage = true
                })
        }
    }
}
</script>

<style scoped>

</style>
