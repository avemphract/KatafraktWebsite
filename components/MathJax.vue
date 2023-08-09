<template>
    <div>
        <div ref="container">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    data(){
        return{
            isBusy:true,
        }
    },
    mounted() {
        Promise.resolve()
            .then(async () => await new Promise(resolve => setTimeout(resolve, 100)))
            .then(() => window.MathJax.typesetPromise([(this.$refs["container"] as HTMLElement)]))
            .then(() => this.isBusy = false)
        ;
    },
    updated() {
        if(!this.isBusy && ((this.$refs["container"] as HTMLElement).textContent.trimStart().startsWith('$$') || (this.$refs["container"] as HTMLElement).textContent.trimEnd().endsWith('$$')))
            Promise.resolve()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .then(() => this.isBusy = true)
                .then(() => (this.$refs["container"] as HTMLElement).getElementsByTagName("mjx-container")[0]?.remove())
                .then(() => window.MathJax.typesetPromise([(this.$refs["container"] as HTMLElement)]))
                .then(() => this.isBusy = false);
    }
});
</script>

<style lang="scss">
span{
    .mjx-container{
        display: inline;
    }
}
</style>