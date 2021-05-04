<template>
    <div id="user">
        <div class="user-title">
            <div class="avatar" :style="'background-image: url('+user.photoURL+')'"></div>
            <div class="texts">
                <h1 style="display:inline">{{user.name}}</h1>

                <router-link class="user-profile" :to="'/user/'+currentUser.uid+'/profile/'">
                    プロウィールを編集する
                </router-link>
              
                <p class="whispers" v-if="myWhispers.length > 1">{{myWhispers.length}} whispers</p>
                <p class="whispers" v-else>{{myWhispers.length}} whisper</p>
                <div class="age">age: {{user.age}}</div>

            </div>
        </div>

        <div class="introduction">{{user.introduction}}</div>

        <div class="list">
            <Editor :currentUser="currentUser" />
            <Item v-for="myWhisper in orderBy(myWhispers,'date',-1)"
                  :key="myWhisper.id"
                  :id="myWhisper.id"
                  :uid="myWhisper.uid"
            />
        </div>

    </div>
</template>


<script>
import { db } from '../main'
import { auth } from '../main'
import firebase from 'firebase'
import Item from '@/components/Item'
import Editor from '@/components/Editor'
import Vue2Filters from 'vue2-filters' 

export default {
    components: {
        Item,
        Editor
    },
    data() {
        return {
            user: {},
            myWhispers: [],
            currentUser: {}
        }
    },
    firestore () {
        return {
            user: db.collection('users').doc(this.$route.params.uid),
            myWhispers: db.collection('whispers').where('uid','==',this.$route.params.uid)
        }
    },
    created() {
        auth.onAuthStateChanged(user => {
            this.currentUser = user
        })
    },

    mixins: [Vue2Filters.mixin]
}
</script>


<style scoped>


.user-title {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    margin: 10px 0
}

div.user-title > div.avatar {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    background-size: cover
}

div.user-title > div.texts {
    margin-left: 10px;
}

/* div.user-title > div.avatar > div.texts > h1 {
    font-size: 1.5rem;
    margin: 0;
}

div.user-title > div.avatar > div.texts > p {
    font-size: .8rem;
    margin: 0;
} */

.user-profile {
    margin-left: 100px;
}
.user-profile:hover {
    color: darkgoldenrod;
}

.introduction {
    margin-bottom :10px;
}

.whispers{
    margin: 0;
}
</style>


