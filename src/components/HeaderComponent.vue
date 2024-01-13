<script setup>
import PaperclipLogo from '@/components/PaperclipLogo.vue'
import ClipsNumberDisplay from '@/components/ClipsNumberDisplay.vue'
import MenuComponent from '@/components/MenuComponent.vue'
</script>

<template>
  <header class="mx-2 sm:mt-6 sm:mx-8 grid grid-cols-2 md:grid-cols-3 m-4 mt-6 text-ellipsis overflow-hidden">
    <PaperclipLogo class="order-1" />

    <ClipsNumberDisplay
      class="order-3 md:order-2 justify-center content-center col-span-2 md:col-auto"
    />

    <MenuComponent class="order-2 flex justify-end my-1 md:order-3" />
  </header>
</template>
