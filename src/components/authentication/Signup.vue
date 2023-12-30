<template>
    <v-container fluid align="center">
        <v-col grow xs="10" sm="6" lg="3">
            <v-alert
                v-show="showMessage"
                border="start"
                border-color="top"
                :type="messageType"
                variant="outlined"
                class="mb-5"
            >
                {{ message }}
            </v-alert>
            <v-card v-if="!emailSent">
                <v-card-title>
                    <v-icon size="80">mdi-rocket</v-icon>
                    <h2>
                        Create an account
                    </h2>
                </v-card-title>
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
                            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            :rules="passwordRules"
                            @click:append-inner="showPassword = !showPassword"
                            required
                        ></v-text-field>
                        <v-text-field
                            id="signupPasswordConfirm"
                            v-model="passwordConfirm"
                            label="Confirm password"
                            :append-inner-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword2 ? 'text' : 'password'"
                            :rules="confirmPasswordRule"
                            @click:append-inner="showPassword2 = !showPassword2"
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
            if (this.password === this.passwordConfirm) {
                this.$refs.form.validate()
                    .then(() => {
                        this.loading = true
                        this.clearToken()
                        Axios.post('/auth/signup', {
                            email: this.email,
                            password: this.password
                        })
                            .then((response) => {
                                console.error(response)
                                this.message = 'An activation link has been sent to your address. Also please check the Spam folder in your mailbox.'
                                this.messageType = 'success'
                                this.showMessage = true
                                this.emailSent = true
                                this.loading = false
                            })
                            .catch((error) => {
                                this.message = error.response.data.message
                                this.messageType = 'error'
                                this.showMessage = true
                                this.loading = false
                                console.error(error)
                            })
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
