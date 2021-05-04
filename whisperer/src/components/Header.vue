<template>
    <header>
        <router-link to="/">
            <h1>whisp.</h1>
        </router-link>

        <div v-if="currentUser" class="btns">

            <router-link :to="'/user/'+currentUser.uid">
                <button class="button-tmp" :style="'background-image: url('+currentUser.photoURL+')'"></button>
            </router-link>

            <button class="button-tmp">
                <fa icon="sign-out-alt" @click="signOut"/>
            </button>
        </div>
        <div v-else class="btns">
            <button class="button-tmp">
                <fa icon="user" @click="signIn"/>
            </button>
        </div>

    </header>
</template>


<script>
import firebase from 'firebase'
import { auth } from '../main'
import { db } from '../main'

export default {
    data () {
        return {
            currentUser: {}
        }
    },
    created () {
        auth.onAuthStateChanged(user => {
        this.currentUser = user
        })
    },
    methods: {
        signIn() {
            const provider = new firebase.auth.GoogleAuthProvider()
            auth.signInWithPopup(provider)
            .then((result) => {
                this.$router.push('/user/'+result.user.uid)
                alert('Hello, '+result.user.displayName+'!')
                this.createUser(result.user)
            })
        },
        signOut() {
            if (window.confirm('Are You Sure to Sign Out?')) {
                auth.signOut()
                .then(() => {
                    alert('You Safely Signed Out.')
                    this.$router.push('/'),
                    location.reload()
                })
            }
        },
        // ユーザーデータをfirebaseに保存
        createUser(user) {
            db.collection('users').doc(user.uid).set({
                'name': user.displayName,
                'photoURL': user.photoURL,
                'email':user.email
            }, { merge: true })
        },
    }
}
</script>


<style lang="stylus" scoped>
header
  position fixed
  top 0
  width 100%
  text-align center
  padding 10px
  h1
    width fit-content
    margin 0 auto
    font-size 1.4rem
  .btns
    position absolute
    top 10px
    right 30px
    cursor pointer
    img
      width 100%
</style>
