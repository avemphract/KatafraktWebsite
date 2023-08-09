<template>
    <div
        id="navbar"
        ref="roof"
        class="fixed flex left-0 top-0 h-10 bg-slate-100 w-full justify-start items-center gap-3"
        style="width: 100%">
        <NuxtLink
            class="nav-link"
            to="/">
            Katafrakt
        </NuxtLink>
        <NuxtLink
            class="nav-link"
            to="/about">
            Hakkımda
        </NuxtLink>
        <NuxtLink
            class="nav-link"
            to="/posts">
            Gönderiler
        </NuxtLink>
        <!--<input @keyup.enter="textareaSubmit" @keydown="textareaKeyDown" class="search-area" placeholder="Ara" />-->
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
    methods: {}
});
</script>

<style lang="scss" scoped>
#navbar {
    .nav-link {
        @apply mr-2 p-4 flex-1 text-gray-500 font-bold no-underline pt-2 pb-2 text-center;
        &.router-link-exact-active {
            @apply text-green-400;
        }
    }
    .search-area {
        margin-left: auto;
        margin-right: 50px;
        height: 30px;

        padding: 5px;
        box-sizing: border-box;

        outline: none;
        resize: none;
    }
}
</style>
