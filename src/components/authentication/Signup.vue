<template>
    <v-container>
        <v-layout column align-center>
            <v-col xs10 sm6>
                <v-icon size="80">mdi-rocket</v-icon>
            </v-col>
            <v-col xs10 sm6 >
                <h1>
                    Create an account
                </h1>
            </v-col>
            <v-col grow>
                <v-alert
                    v-if="showMessage"
                    border="top"
                    border-color="top"
                    :type="messageType"
                    elevation="2"
                    max-width="400"
                >
                    {{ message }}
                </v-alert>
                <v-card v-if="!emailSent">
                    <v-card-text class="mt-5">
                        <v-form
                            ref="form"
                            v-model="valid"
                        >
                            <v-text-field
                                id="signupEmail"
                                v-model="email"
                                label="E-mail"
                                :rules="emailRules"
                                required
                            ></v-text-field>
                            <v-text-field
                                id="signupPassword"
                                v-model="password"
                                label="Password"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'"
                                :rules="passwordRules"
                                @click:append="showPassword = !showPassword"
                                required
                            ></v-text-field>
                            <v-text-field
                                id="signupPasswordConfirm"
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
                                @click="signup"
                                :loading="loading"
                            >
                                Create account
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
import { emailRule, passwordRule, requiredRule } from '../../modules/formValidationRules'
import { mapActions } from 'vuex'

export default {
    name: 'Signup',
    data: () => ({
        valid: true,
        email: null,
        password: null,
        passwordConfirm: null,
        showPassword: false,
        showPassword2: false,
        messageType: 'info',
        message: '',
        showMessage: false,
        emailRules: emailRule(),
        passwordRules: passwordRule(),
        confirmPasswordRule: [ ],
        emailSent: false,
        loading: false
    }),
    methods: {
        confirmPasswordFunction(password) {
            return value => value === password || 'Password don\'t match'
        },
        signup() {
            if (this.$refs.form.validate() && this.password === this.passwordConfirm) {
                const me = this
                me.loading = true
                me.clearToken()
                Axios.post('/auth/signup', {
                    email: this.email,
                    password: this.password
                })
                    .then(function() {
                        me.message = 'An activation link has been sent to your address. Also please check the Spam folder in your mailbox.'
                        me.messageType = 'success'
                        me.showMessage = true
                        me.emailSent = true
                        me.loading = false
                    })
                    .catch(function(error) {
                        me.message = error.response.data.message
                        me.messageType = 'error'
                        me.showMessage = true
                        me.loading = false
                        console.error(error)
                    })
            }
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
