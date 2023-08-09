<template>
    <div>
        <NavbarElement />
        <div class="w-full h-full min-h-screen table box-border">
            <div class="background border-l-1px" />
            <div class="table-cell w-auto p-1 pt-10 content-center bg-slate-50">
                <slot class="m-8 mb-20" />
            </div>
            <div class="background border-l-1px" />
        </div>
        <FooterLine />
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import NavbarElement from '~/components/NavbarElement.vue';
import FooterLine from '~/components/FooterLine.vue';

export default defineComponent({
    components: { NavbarElement, FooterLine }
});
</script>

<style lang="scss">
.background {
    @apply table-cell bg-repeat border-solid border-spacing-0 bg-slate-500 w-[10%];

    background-image: url("/images/rhombus_ul.png"), url("/images/rhombus_ul.png");
    background-position: 0 0, 16px 16px;
}
</style>