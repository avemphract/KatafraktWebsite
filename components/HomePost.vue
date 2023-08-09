<template>
    <div>
        <div class="flex min-w-full border-solid border-b-indigo-900 border-2 p-1 pb-2 m-1">
            <img
                class="h-80 w-auto m-auto"
                :src="(page.meta['titleImage'] as string)"
                alt="page-logo">
            <div class="flex flex-col grow">
                <div class="text-left font-bold ">
                    {{ page.meta["name"] }}
                </div>
                <div class="text-left pt-5 grow overflow-hidden">
                    {{ page.meta["introduction"] }}
                </div>
                <NuxtLink
                    class="nav-link self-center"
                    :to="page.path">
                    Tümünü Oku
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { RouteRecordRaw } from '.nuxt/vue-router';
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        page: {
            type: Object as PropType<RouteRecordRaw>,
            required: true
        }
    },
});
</script>

<style lang="scss" scoped>

</style>