<template>
    <div class="box-border">
        <img
            class="w-full h-60 block align-middle"
            src="/svgs/main-icon.svg">
        <h1 class="">
            Katafrakt Oyun ve Algoritma
        </h1>
        <h3 class="">
            Merhaba bu sitede oyunlarda kullanılan matematiği, tasarım kalıplarını ve algoritmaları anlatıyor olacağım. Yazılarda anlatılan konularla alakalı
            interaktif görseller, çeşitli dillerden örnek kodlarla kullandım. İyi okumalar.
        </h3>
        <h3 class="ml-10 mt-10 font-bold text-left">
            Son gönderiler:
        </h3>
        <div class="grid grid-cols-4 gap-4">
            <div
                v-for="post in postPages"
                :key="post.name">
                <HomePost />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import HomePost from "~/components/HomePost.vue";


export default defineComponent({
    name: 'IndexPage',
    meta: {
        "type":"AllPostsPage"
    },
    components:{HomePost},
    data(){
        return{
            postPages: this.$nuxt.$router.options.routes.filter(r=>r.meta["type"] == "Post"),
            tst: this.$router.getRoutes()
        };
    },
    mounted() {
        //
    },
    created(){
        console.log(this.tst);
    }
});
</script>
