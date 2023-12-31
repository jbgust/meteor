<template>
    <v-container fluid align="center">
        <v-col grow xs="10" sm="6" lg="3">
            <v-card>
                <v-card-title>
                    <v-icon size="80" color="purple">mdi-rocket-launch</v-icon>
                    <h2>
                        Reset your password
                    </h2>
                </v-card-title>
                <v-card-text>
                    <v-alert
                        v-if="showMessage"
                        border="start"
                        border-color="top"
                        variant="outlined"
                        :type="messageType"
                        class="mb-5"
                    >
                        {{ message }}
                    </v-alert>
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
        </v-col>
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
            if (this.password === this.passwordConfirm) {
                this.$refs.form.validate()
                    .then(() => {
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
                    })
            }
        }
    }
}
</script>

<style scoped>

</style>
