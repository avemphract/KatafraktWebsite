<template>
    <div class="flex flex-row ml-10 mb-12 p-2">
        <img
            class="w-50 mr-10"
            :src="imgsrc"
            alt="">
        <h1 class="flex-auto flex self-center text-slate-50 p-5 bg-[#047a55ff] border-solid border-1 border-[#2c3e50]">
            <slot />
        </h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        imgsrc: {
            type: String,
            required: true
        }
    }
});
</script>
