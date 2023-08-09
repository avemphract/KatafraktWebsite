<template>
    <div class="top-0 mx-5 code-block text-[0]">
        <div class="flex justify-start text-base">
            <span
                v-for="pair in (filled ? codeMap.languages: [])"
                :id="pair.language"
                :key="pair.language"
                class="pb-0 mb-0"
                :class="
                    (filled && currentLanguage.language == pair.language
                        ? ' bg-[#1e1e1e] text-[#dcdcdc]  hljs'
                        : ' bg-blue-gray-400 text-[#1e1e1e]')
                "
                style="flex-basis: 15%; font-family: monospace"
                @click="tabFunc(pair)">
                {{ pair.language }}
            </span>
        </div>
        <pre class="m-0 p-0 inline-grid w-full text-base">
            <code
            ref="hljscode"
            class="text-left my-0 p-4 w-full max-h-[20em] min-h-[20em] overflow-auto leading-snug"
            :class="'language-'+(filled ? currentLanguage.language : 'java')">{{ filled ? currentLanguage.files[index].code.trim() : '' }}</code>
        </pre>
    </div>
</template>

<script lang="ts">
import { CodeContainer, LanguageContainer } from "@/utils/others/CodeMapIndex";
import { defineComponent, ref } from "vue";
import type { Ref } from "vue";
import hljs from 'highlight.js';


export default defineComponent({
    props: {
        codeMapPath: {
            type: String,
            required:true,
        },
        index: {
            type: Number,
            default: 0,
            required: false,
        }
    },
    setup(){
        const hljscode = ref<HTMLElement|null>()
        return {
            hljscode:hljscode
        };
    },
    data() {
        return {
            codeMap: ref(CodeContainer.EMPTY),
            currentLanguage: ref(null) as Ref<LanguageContainer>,
            filled: false,
        };
    },
    async created() {
        const map = await CodeContainer.FetchCodeContainer(this.codeMapPath);
        this.codeMap = map;
        this.currentLanguage = map.languages[0];
        this.filled = true;
        await this.$nextTick();
        hljs.highlightElement(this.hljscode);
    },
    methods: {
        async tabFunc(languageContainer: LanguageContainer) {
            this.currentLanguage = languageContainer;
            await this.$nextTick();
            hljs.highlightElement(this.hljscode);
        }
    },
});
</script>

<style lang="scss" scoped>
.code-block {
    code::-webkit-scrollbar {
        width: 12px;
        height: 12px;
        scroll-padding-right: 5px;
    }

    code::-webkit-scrollbar-track {
        background: transparent; /* color of the tracking area */
    }

    code::-webkit-scrollbar-thumb {
        background-color: #dcdcdc; /* color of the scroll thumb */
        border-radius: 4px; /* roundness of the scroll thumb */
        border: 4px solid rgba(0, 0, 0, 0);
        background-clip: padding-box;
    }
}
</style>
