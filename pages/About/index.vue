<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <p>
            Merhaba Ben Emre Çatalkaya. İtü makina mühendisliği mezunuyum, yazılımla ilgileniyorum. Java, nesne tabanlı programlama ve libgdx hayranıyım. Bu
            blogda oyun geliştirirken sıklıkla kullanılan algoritmaları ve Libgdx framework'ünü interatif görsellerle anlatmaya çalışacağım. Bloglarda eksik
            gördüğünüz, eklemek istediğiniz veya sadece soru sormak için ulaşmaktan çekinmeyin.
        </p>
        <h2>Websitesinde kullandığım teknolojiler:</h2>
        <div class="flex-wrap text-center">
            <a href="https://www.typescriptlang.org/"><img
                class="tech"
                src="/symbols/ts.svg"
                alt="typescript"></a>
            <a href="https://v3.vuejs.org/"><img
                class="tech"
                src="/symbols/vue.svg"
                alt="vue 3"></a>
            <a href="https://windicss.org/"><img
                class="tech"
                src="/symbols/windi.svg"
                alt="windi"></a>
            <a href="https://vitejs.dev/"><img
                class="tech"
                src="/symbols/vite.svg"
                alt="vite"></a>
            <a href="https://sass-lang.com/"><img
                class="tech"
                src="/symbols/scss.svg"
                alt="sass"></a>
            <a href="https://highlightjs.org/"><img
                class="tech"
                src="/symbols/hljs.png"
                alt="hljs"></a>
            <a href="https://greensock.com/gsap/"><img
                class="tech"
                src="/symbols/gsap.png"
                alt="gsap"></a>
        </div>
        <h2 class="mx-100px mt-100px">
            Hesaplarım:
        </h2>
        <div class="flex flex-wrap text-left mx-15px mt-5px sm:(mx-50px mt-20px)">
            <div class="flex flex-row mt-20px mr-10px w-full sm:(w-400px)">
                <a
                    class="my-auto"
                    href="https://github.com/avemphract"><img
                        class="contract"
                        src="/symbols/github.png"
                        alt="github"> </a>
                <span class="flex flex-col flex-grow p-10px">
                    <div class="text-center h-full leading-normal font-black">Github</div>
                    <div class="text-center h-full leading-normal">
                        <a href="https://github.com/avemphract">/avemphract</a>
                    </div>
                </span>
            </div>

            <div class="flex flex-row mt-20px mr-10px w-full sm:(w-400px)">
                <a
                    class="my-auto"
                    href="https://www.linkedin.com/in/emre-catalkaya/"><img
                        class="contract"
                        src="/symbols/linkedin.png"
                        alt="linkedin">
                </a>
                <span class="flex flex-col flex-grow p-10px">
                    <div class="text-center h-full leading-normal font-black">Linkedin</div>
                    <div class="text-center h-full leading-normal">
                        <a href="https://www.linkedin.com/in/emre-catalkaya/">/emre-catalkaya</a>
                    </div>
                </span>
            </div>

            <div class="flex flex-row mt-20px mr-10px w-full sm:(w-400px)">
                <img
                    class="contract"
                    src="/symbols/mail.svg"
                    alt="mail">
                <span class="flex flex-col flex-grow p-10px">
                    <div class="text-center h-full leading-normal font-black">Mail hesabım</div>
                    <div class="text-center h-full leading-normal">emre_catal_kaya@hotmail.com</div>
                </span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: 'AboutPage',
    layout: "default"
})
</script>

<style lang="scss" scoped>
.tech {
    @apply px-2 pt-1 w-auto h-auto max-w-[8em] max-h-[8em] inline;
}
.contract {
    @apply px-2 pt-1 max-w-[10em] max-h-[10em] w-auto h-auto;
}
</style>
