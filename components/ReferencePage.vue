<template>
    <NuxtLink
        :to="page.path"
        class="mx-20 h-40 flex flex-row border-4 border-solid border-color-[#047a55] bg-[#047a5544] no-underline">
        <img
            class="justify-center items-center"
            alt="page-logo"
            :src="(page.meta['titleImage'] as string)">
        <div class="w-full mx-10px my-4px">
            <div class="text-left font-bold text-center text-size-[1.2rem] text-[#2c3e50] no-underline mb-10px">
                {{ page["meta"].name }}
            </div>
            <div class="flex-auto h-100px text-left text-[#2c3e50] overflow-ellipsis overflow-hidden">
                {{ page["meta"].introduction }}
            </div>
        </div>
    </NuxtLink>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        pageName: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            page: this.$nuxt.$router.options.routes.find(r=>r.meta["name"] == this.pageName),
        };
    },
    methods: {
    }
});
</script>

<style lang="css"></style>
