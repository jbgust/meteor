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
            showMessage: false
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
                    me.messageType = 'info'
                    me.showMessage = true
                })
                .catch((error) => {
                    me.message = `Error : ${error.response.message}`
                    me.messageType = 'error'
                    me.showMessage = true
                })
        }
    }
}
</script>

<style scoped>

</style>
