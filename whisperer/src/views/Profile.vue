<template>
    <div id="user">
        <div class="user-title">
            <div class="avatar" :style="'background-image: url('+user.photoURL+')'"></div>
            <div class="texts">
                <h1>{{user.name}}</h1>
            </div>
        </div>

        <div class="age">年齢</div>
        <div>
            <select id="pullDownList" v-model="user.age" @change="updateButton"></select>
        </div>

        <div class="introduction">自己紹介</div>
        <div class="item">
            <div class="editor">
                <textarea v-model="user.introduction"
                          @change="changeIntroduction"
                          placeholder="自己紹介">
                </textarea>
            </div>
        </div>

        <!-- <div v-if="require">40文字以内で入力してください</div>
        <p>{{user.introduction.length}}</p> -->

        <button @click="bakPage" class="update-button">戻る</button>
        <button :disabled="updateData" @click="profileUpdate" class="update-button">更新</button>
        
    </div>
</template>


<script>
import { db } from '../main'
import { auth } from '../main'

export default {
    data () {
        return {
            user: {},
            currentUser: {},
            require: false,
            updateData: true
        }
    },
    firestore () {
        return {
            user: db.collection('users').doc(this.$route.params.uid),
        }
    },
    created() {
        // 現在ログインしているユーザーを取得
        auth.onAuthStateChanged(user => {
            this.currentUser = user
        })
    },
    mounted() {
        // 年齢のoptionタグ追加
        for (let age =18; age < 80; age++) {
            let opt = document.createElement("option");
            opt.value = age.toString();
            opt.text = age.toString();
            document.getElementById("pullDownList").appendChild(opt);
        }
    },
    methods: {
        // プロフィール更新
        profileUpdate() {
            db.collection('users').doc(this.$route.params.uid).set({
                'introduction': this.user.introduction,
                'age': this.user.age
            // merge:trueで他のフィールドが消えないようにする
            }, {merge:true})
            this.$router.push('/user/'+this.$route.params.uid)
        },

        bakPage() {
            this.$router.push('/user/'+this.$route.params.uid)
        }, 

        // 自己紹介文字制限
        changeIntroduction() {
            // let target = event.target.value
            let target = this.user.introduction.length
            if (target > 40) {
                this.require = true
            } else {
                this.require = false
            }
            this.updateButton()
        },

        // ボタンを活性化させる
        updateButton() {
            this.updateData = false
        }
    }
}
</script>


<style lang="stylus" scoped>
.user-title
  display flex
  flex-wrap nowrap
  justify-content flex-start
  margin 10px 0
  .avatar
    width 50px
    height 50px
    border-radius 5px
    background-size cover
  .texts
    margin-left 10px
    h1
      font-size 1.5rem
      margin 0
    p
      font-size .8rem
      margin 0

.introduction {
    margin-top : 50px;
}

.age {
    margin-top :20px;
}

#pullDownList {
    width: 60px;
    height 25px;
}

.update-button {
    width: 60px;
    height: 40px;
    margin-right 20px;
}

</style>