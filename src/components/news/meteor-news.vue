<template>
    <v-bottom-sheet v-model="sheet" v-if="hasNews">
        <template v-slot:activator="{ props }">
            <v-badge
                color="red"
                class="mr-5 ml-5 align-self-center"
                :content="newNews.length"
                v-show="newNews.length > 0"
            >
                <v-icon
                    id="newsMeteorBtn"
                    large
                    @click="sheet = true"
                >
                    mdi-bell-ring-outline
                </v-icon>
            </v-badge>
            <v-icon
                v-show="newNews.length==0"
                id="newsMeteorBtn2"
                class="mr-5 ml-5 align-self-center"
                large
                @click="sheet = true"
            >
                mdi-bell-ring-outline
            </v-icon>
        </template>

        <v-sheet class="pb-5">
            <h1 align="center" id="bottomPageNews" class="pt-6">
                What's new!
            </h1>
            <news-content :notReadNewsIds="newNews"/>
        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
import { getNewNewsIds, markNewsAsRead, news } from '../../modules/news'
import NewsContent from './NewsContent'

export default {
    name: 'meteor-news',
    components: { NewsContent },
    data() {
        return {
            sheet: false,
            hasNews: news.length > 0,
            newNews: getNewNewsIds()
        }
    },
    methods: {
        closeNews() {
            markNewsAsRead(this.newNews)
            this.newNews = []
            this.sheet = false
        }
    },
    watch: {
        sheet(newValue, oldValue) {
            if (!newValue) {
                this.closeNews()
            }
        }
    }
}
</script>
