<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
<template>
  <button type="button" @click="toggleDark()">
    <div v-if="isDark" class="p-1 rounded-md dark:hover:bg-slate-700">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-sun-high"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z"></path>
        <path
          d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z"
          color="#fef9c3"
        ></path>
        <path color="#fcd34d" d="M6.343 17.657l-1.414 1.414"></path>
        <path color="#fcd34d" d="M6.343 6.343l-1.414 -1.414"></path>
        <path color="#fcd34d" d="M17.657 6.343l1.414 -1.414"></path>
        <path color="#fcd34d" d="M17.657 17.657l1.414 1.414"></path>
        <path color="#fcd34d" d="M4 12h-2"></path>
        <path color="#fcd34d" d="M12 4v-2"></path>
        <path color="#fcd34d" d="M20 12h2"></path>
        <path color="#fcd34d" d="M12 20v2"></path>
      </svg>
    </div>
    <div v-else class="p-1 rounded-md hover:bg-slate-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-moon-stars"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path
          color="#0284c7"
          d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"
        ></path>
        <path
          color="#fde047"
          d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"
        ></path>
        <path color="#fde047" d="M19 11h2m-1 -1v2"></path>
      </svg>
    </div>
  </button>
</template>

<style></style>
