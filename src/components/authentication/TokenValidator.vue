<template>
    <v-container>
        <v-layout column align-center>
            <v-col xs10 sm6 class="pb-10">
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
                        v-if="messageType === 'success'"
                        color="green"
                        @click="$router.push({ name: 'Signin' })"
                    >
                        Sign in
                    </v-btn>
                </v-alert>
            </v-col>
            <v-btn
                v-if="resentToken"
                color="primary"
                @click="resentActivationLink"
            >
                Click here to get a new link
            </v-btn>

            <v-col grow v-if="isResetPassword && !isActivationCompte()">
                <v-card v-if="!successChange">
                    <v-card-text>
                        <v-form
                            ref="form"
                            v-model="valid"
                        >
                            <v-text-field
                                id="newPassword"
                                v-model="password"
                                label="Password"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'"
                                :rules="passwordRules"
                                @click:append="showPassword = !showPassword"
                                required
                            ></v-text-field>
                            <v-text-field
                                id="newPasswordConfirm"
                                v-model="passwordConfirm"
                                label="Confirm password"
                                :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword2 ? 'text' : 'password'"
                                :rules="confirmPasswordRule"
                                @click:append="showPassword2 = !showPassword2"
                                required
                            ></v-text-field>
                            <v-btn
                                width="100%"
                                :disabled="!valid"
                                color="success"
                                @click="resetPassword"
                                :loading="loading"
                            >
                                Change password
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>

        </v-layout>
    </v-container>

</template>

<script>
import Axios from 'axios'
import { passwordRule, requiredRule } from '../../modules/formValidationRules'
import { mapActions } from 'vuex'

export default {
    name: 'TokenValidator',
    data() {
        return {
            message: null,
            messageType: null,
            showMessage: false,
            resentToken: false,
            messageResentActivationLink: 'dfgfsdgd',
            valid: false,
            password: null,
            passwordConfirm: null,
            showPassword: false,
            showPassword2: false,
            passwordRules: passwordRule(),
            confirmPasswordRule: [ ],
            successChange: false,
            loading: false
        }
    },
    mounted() {
        this.clearToken()
        if (this.isActivationCompte()) {
            this.validate()
        }
    },
    methods: {
        isActivationCompte() {
            return this.$route.query.tokenType === 'CREATION_COMPTE'
        },
        isResetPassword() {
            return this.$route.query.tokenType === 'RESET_PASSWORD' || true
        },
        validate() {
            const me = this
            Axios.post(`/auth/validate/${this.$route.query.token}`, {
                email: this.email
            })
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
        resetPassword() {
            const me = this
            me.loading = true
            Axios.post(`/auth/reset-password/${this.$route.query.token}`, {
                password: me.password
            })
                .then(() => {
                    me.message = 'Your password has been changed'
                    me.messageType = 'success'
                    me.showMessage = true
                    me.successChange = true
                    me.loading = false
                })
                .catch((error) => {
                    me.loading = false
                    if (error.response.status === 404) {
                        me.message = 'Token not found'
                    } else {
                        me.message = error.response.data.message
                    }
                    me.messageType = 'error'
                    me.showMessage = true
                })
        },
        activationLinkExpires(error) {
            return this.isActivationCompte() &&
                error.response.data.message === 'Token has expired.'
        },
        resentActivationLink() {
            const me = this
            me.resentToken = false
            Axios.post(`/auth/resent-activation/${this.$route.query.token}`)
                .then(() => {
                    me.message = 'A new activation link has been sent to your address. Also please check the Spam folder in your mailbox.'
                    me.messageType = 'info'
                    me.showMessage = true
                })
                .catch(() => {
                    me.message = 'Failed to send new activation link. If the problem persist please contact us.'
                    me.messageType = 'error'
                    me.showMessage = true
                })
        },
        confirmPasswordFunction(password) {
            return value => value === password || 'Password don\'t match'
        },
        ...mapActions('authentication', ['clearToken'])
    },
    watch: {
        password(newValue) {
            this.confirmPasswordRule = [ requiredRule[0], this.confirmPasswordFunction(newValue) ]
        }
    }
}
</script>

<style scoped>

</style>
