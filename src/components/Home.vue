<template>
        <v-layout row>
            <v-flex>
                <div class="meteor-container block1">
                    <h1>
                        DESIGN YOUR SOLID ROCKET MOTOR
                    </h1>
                    <h3>
                        Meteor is a modern and free application that helps you to design your motor
                    </h3>
                    <div class="block-text">
                        <div>
                            Why using it?
                            <ul>
                                <li>
                                    It's free, why taking a paid solution?
                                </li>
                                <li>
                                    Reliable results : Meteor uses the same calculation model as the famous <a class="block1-link" href="https://www.nakka-rocketry.net/softw.html#SRM" target="_blank">SRM Excel file</a>
                                </li>
                                <li>
                                    Compatible with any solid propellant
                                </li>
                                <li>
                                    Multiple grain configuration
                                </li>
                                <li>
                                    Easy to use
                                </li>
                                <li>
                                    Save your work
                                </li>
                                <li>
                                    Optimal nozzle design, by default Meteor computes the best nozzle expansion ratio
                                </li>
                                <li>
                                    Tweak computation model with an advanced configuration
                                </li>
                                <li>
                                    Nozzle dimensioning tool
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="block-text">
                        <div class="block-button">
                            <v-btn :to="'/demo'" outlined>
                                View demo
                                <v-icon right>mdi-play</v-icon>
                            </v-btn>
                            <v-btn :to="'/motorDesign'" outlined id="btnTryIt">Try it!</v-btn>
                            <v-btn outlined href="mailto:postmaster@pixelife.net?subject=METEOR">
                                Contact
                                <v-icon right>mdi-email-edit-outline</v-icon>
                            </v-btn>
                        </div>
                    </div>
                </div>

                <div class="meteor-container block2">
                    <h1 align="center">
                        What's new!
                    </h1>
                    <news-content/>
                    <br>
                    <h1 align="center">
                        Next features
                    </h1>
                    <div class="block-text">
                            <ul>
                                <li>
                                    New grain configurations (rod and tube, star, ...)
                                </li>
                                <li>
                                    Comparison of multiple motor configurations on one same graph
                                </li>
                                <li>
                                    Automatic optimization of the configuration (ex: finding best grain core diameter)
                                </li>
                                <li>
                                    Support of other languages (contribution needed, feel free to contact us)
                                </li>
                            </ul>
                    </div>
                    <div class="block-text">
                        <div class="block-button">
                            <v-btn outlined href="mailto:postmaster@pixelife.net?subject=New Feature METEOR">
                                Request new feature
                                <v-icon right>mdi-email-edit-outline</v-icon>
                            </v-btn>
                        </div>
                    </div>
                </div>

                <div class="meteor-container block3">
                    <h1 align="center">
                        ABOUT JSRM
                    </h1>
                    <h3>
                        Java Solid Rocket Motor
                    </h3>
                    <div class="block-text mt-6">
                        <ul>
                            <li>Meteor uses <a href="https://github.com/jbgust/jsrm" target="_blank" a>JSRM library</a> as computation model.</li>
                            <li>It works solely for cylindrical grain configurations, such as BATES.</li>
                            <li>It works with any solid propellant</li>
                            <li>JSRM is the Java implementation of SRM Excel file made By <a href="https://www.nakka-rocketry.net/author.html" target="_blank">Richard Nakka</a>.</li>
                        </ul>
                    </div>
                </div>
            </v-flex>
        </v-layout>
</template>

<script>
import { news } from '../modules/news'
import NewsContent from './news/NewsContent'

export default {
    name: 'home',
    components: { NewsContent },
    data() {
        return {
            newsToDisplay: news
        }
    }
}
</script>

<style lang="css" scoped>
    .meteor-container {
        padding: 40px 30px 40px 30px;
        min-height: 400px;
        font-size: 15px;
    }
    .meteor-container h1{
        text-align: center;
        color: black;
    }
    .meteor-container h3 {
        text-align: center;
        color: black;
    }
    .meteor-container > div {
        margin: 10px 0 10px 0;
    }
    .block1 {
        color: white;
    }

    .block1 h1 {
        color: white;
    }
    .block1 h3 {
        color: white;
    }
    .block1{
        background: #3f51b5; /* Old browsers */
        background: -moz-linear-gradient(top, #3f51b5 0%, rgb(92, 187, 246) 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top, #3f51b5 0%,rgb(92, 187, 246) 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, #3f51b5 0%,rgb(92, 187, 246) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3f51b5', endColorstr='rgb(92, 187, 246)',GradientType=0 ); /* IE6-9 */
    }

    .block1-link{
        color: rebeccapurple;
    }

    .block2 {
        background-color: #f5f5f5;
    }

    .block3 {
        background-color: white;
    }
    .block-text {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .block-button {
        width: 500px;
        display: flex;
        justify-content: space-around;
        margin-top: 40px !important;
    }
</style>
