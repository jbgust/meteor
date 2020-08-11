<template>
    <v-container>
        <v-layout column align-center>
            <v-flex xs10 sm6>
                <v-icon size="80">mdi-rocket</v-icon>
            </v-flex>
            <v-flex xs10 sm6 class="pb-10">
                <h1>
                    Reset your password
                </h1>
            </v-flex>
            <v-flex grow>
                <v-alert
                    v-if="showMessage"
                    border="top"
                    colored-border
                    :type="messageType"
                    elevation="2"
                    max-width="400"
                >
                    {{ message }}
                </v-alert>
                <v-card>
                    <v-card-text>
                        <v-form
                            ref="form"
                            v-model="valid"
                        >
                            <v-text-field
                                id="emailResetPassword"
                                v-model="email"
                                label="E-mail"
                                :rules="emailRules"
                                required
                            ></v-text-field>
                            <v-btn
                                width="100%"
                                :disabled="!valid"
                                color="success"
                                @click="resetPassword"
                                :loading="loading"
                            >
                                Reset
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
import Axios from 'axios'
import { emailRule } from '../../modules/formValidationRules'

export default {
    name: 'LostPassword',
    data: () => ({
        valid: true,
        email: null,
        messageType: 'info',
        message: '',
        showMessage: false,
        emailRules: emailRule(),
        loading: false
    }),
    methods: {
        resetPassword() {
            if (this.$refs.form.validate() && this.password === this.passwordConfirm) {
                const me = this
                me.loading = true
                Axios.post('/auth/reset-password', {
                    email: this.email
                })
                    .then(() => {
                        me.message = 'A reset link has been sent to your address. Also please check the Spam folder in your mailbox.'
                        me.messageType = 'info'
                        me.showMessage = true
                        me.loading = false
                    })
                    .catch((error) => {
                        me.message = 'Failed to send reset link, please double check your email. If the problem persist please contact us.'
                        me.messageType = 'error'
                        me.showMessage = true
                        me.loading = false
                        console.error(error)
                    })
            }
        }
    }
}
</script>

<style scoped>

</style>
