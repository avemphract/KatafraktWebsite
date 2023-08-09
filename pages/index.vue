<template>
    <div class="box-border">
        <img
            class="w-full h-60 block align-middle"
            src="/svgs/main-icon.svg">
        <h1 class="text-center">
            Katafrakt Oyun ve Algoritma
        </h1>
        <p class="">
            Merhaba bu sitede oyunlarda kullanılan matematiği, tasarım kalıplarını ve algoritmaları anlatıyor olacağım. Yazılarda anlatılan konularla alakalı
            interaktif görseller, çeşitli dillerden örnek kodlarla kullandım. İyi okumalar.
        </p>
        <h3 class="ml-10 mt-10 font-bold text-left">
            Son gönderiler:
        </h3>
        <div class="grid grid-col gap-4">
            <div
                v-for="post in postPages"
                :key="post.name"
                class="max-h-[600px] min-w-full">
                <HomePost
                    class="min-w-full flex"
                    :page="post" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import HomePost from "~/components/HomePost.vue";


definePageMeta({
    layout: "post-layout",
    type: "MainPage"
});

export default defineComponent({
    name: 'IndexPage',
    meta:{
        "type":"MainPage"
    },
    components:{HomePost},
    data(){
        return{
            postPages: this.$nuxt.$router.options.routes.filter(r=>r.meta["type"] == "Post").sort(r => r.meta["order"] as number).reverse(),
        };
    },
    created(){
        console.log("asdas");
        console.log(this.$data.postPages);
    }
});
</script>
