<template>
    <div id="overlay">
        <div id="deleteContent">
            <p><slot></slot></p>
            <button class="close-button" @click="closeModalEvent">close</button>
            <button class="delete-button" @click="deleteModalEvent">delete</button>
        </div>
    </div>
</template>


<script>
export default {
    methods: {
        closeModalEvent() {
            this.$emit('close-modal-event')
        },
        deleteModalEvent() {
            this.$emit('delete-modal-event')
        }
    }
    
}
</script>


<style scoped>

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

.close-button{
    width: 70px;
    height: 40px;
    margin-right: 20px
}
.delete-button{
    width: 70px;
    height: 40px;
    color: red 
}

</style>