<template>
    <div class="foot-bar flex p-2px bg-[#1c5745]">
        <div class="flex-auto">
            <RouterLink
                class="leading-tight text-light-500 text-white"
                to="/about">
                Hakkımda
            </RouterLink>
        </div>
        <div class="flex-auto">
            <a
                class="flex leading-tight text-light-500 justify-center text-white"
                href="https://www.linkedin.com/in/emre-catalkaya/">
                <img
                    class="icon mr-5px"
                    src="/symbols/linkedin.png"
                    alt="linkedin">linkedin</a>
        </div>
        <div class="flex-auto">
            <a
                class="flex leading-tight text-light-500 justify-center text-white"
                href="https://github.com/avemphract">
                <img
                    class="icon mr-5px"
                    src="/symbols/github.png"
                    alt="github">github
            </a>
        </div>
        <div class="flex flex-auto leading-tight w-20% text-light-500 justify-center text-white">
            Copyright © 2022
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.icon {
    @apply w-auto max-h-5 filter brightness-0 invert;
}
.footbar {
    * {
        font-size: small;
    }
}
</style>
