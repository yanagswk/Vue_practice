<template>
    <li class="item" @mouseleave="showBtnsClose">
        <div class="user-box">
            <div class="avatar" :style="'background-image: url('+user.photoURL+')'">
            </div>
            <p class="user-name">{{user.name}}</p>
        </div>

        <div v-if="editing" class="editor">
            <textarea v-model="whisper.content" placeholder="edit whisper" @keypress.enter="updateWhisper">
            </textarea>
            <p class="message">Press Enter to Whisper</p>
        </div>

        <div v-else class="content" v-html="whisper.content"></div>

        <button v-if="currentUser && currentUser.uid == user.id" @click="showBtns = !showBtns" class="user-button">
            <fa icon="ellipsis-v" />
        </button>

        <div v-if="showBtns" class="controls">
            <li @click="editing = !editing">edit</li>
            <li @click="openModalWeindow" style="color:red">delete</li>
        </div>
    
        <!-- モーダルウィンドウ -->
        <ModalWindow v-show="showModalWindow"
                     @close-modal-event="closeModalWeindow" 
                     @delete-modal-event="deleteWhisper">
            メッセージを削除してもよろしいですか？
        </ModalWindow>

    </li>
</template>


<script>
import { db } from '../main'
import { auth } from '../main'
import ModalWindow from './ModalWindow'

export default {
    props: ['id','uid'],
    components: {
        ModalWindow
    },
    data() {
        return {
            whisper: {},
            user: {},
            currentUser: {},
            showBtns: false,
            editing: false,
            showModalWindow: false
        }
    },
    firestore() {
        return {
            whisper: db.collection('whispers').doc(this.$props.id),
            user: db.collection('users').doc(this.$props.uid)
        }
    },
    created() {
        // 現在ログインしているユーザーを取得
        auth.onAuthStateChanged(user => {
            this.currentUser = user
        })
    },
    methods: {
        deleteWhisper() {
            db.collection('whispers').doc(this.$props.id).delete()
        },
        updateWhisper() {
            const date = new Date()
            db.collection('whispers').doc(this.whisper.id).set({
                'content': this.whisper.content,
                'date': date
            }, { merge:true })
            .then(
                this.editing = false
            )
        },
        // マウスが離れたら、編集/削除ボタンをfalseにする
        showBtnsClose() {
            this.showBtns = false
        },
        // モーダルウィンドウを閉じる
        closeModalWeindow() {
            this.showModalWindow = false
        },
        // モーダルウィンドウを開く
        openModalWeindow() {
            this.showModalWindow = true
        }
    }
}
</script>



<style lang="stylus">
.item
  list-style none
  border-top 1px solid #eee
  padding 5px 15px
  display flex
  flex-wrap no-wrap
  justify-content flex-start
  position relative
  &:first-child
    border none
  &:hover
    background rgba(0,0,0,.02)
  .user-box
    margin 10px 10px 10px 0
    .avatar
      height 50px
      width 50px
      border-radius 50%
      border 1px solid #eee
      background-size cover
    .user-name
      margin 5px 0 0 0
      text-align center
      font-size .7rem
      line-height .7rem
      width 50px
  .content
    padding 10px

  .user-button
    position absolute
    top 5px
    right 0
    background transparent
    color #555
    font-size .9rem
    opacity 0
    transition .2s
    border none
    //   &:focus
    //   outline none
  .controls
    background white
    position absolute
    top 5px
    right 35px
    box-shadow 0 0 5px rgba(0,0,0,.05)
    border-radius 3px
    opacity 0
    li
      padding 5px 20px
      border-top 1px solid #eee
      cursor pointer
      &:first-child
        border none
  &:first-child
    border none
  &:hover
    background rgba(0,0,0,.02)
    .content
    .user-button
      opacity 1
    .controls
      opacity 1

  .editor
    position relative
    width 100%
    textarea
      background transparent
      resize none
      height 80px
      width 96%
      border none
      padding 10px 2%
      font-size .9rem
      font-weight lighter
      &:focus
        outline none
    .message
      opacity 0  
      position absolute
      bottom 5px
      right 10px
      transition .2s
      font-size .8rem
    &:hover
      .message
        opacity 1

#overlay{
    /*　要素を重ねた時の順番　*/
    z-index:1;

    /*　画面全体を覆う設定　*/
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5); 

    /*　画面の中央に要素を表示させる設定　*/
    display: flex;
    align-items: center;
    justify-content: center;
}

#deleteContent{
    z-index:2;
    width:50%;
    padding: 1em;
    background:#fff;
}

#close-button{
    width 70px
    height 40px
}
</style>