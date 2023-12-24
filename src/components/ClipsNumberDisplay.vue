<script setup>
import { useCountersStore } from "../stores/counters";

import { storeToRefs } from "pinia";
const { paperclips } = storeToRefs(useCountersStore());
import { funciones } from "../composables/funciones.js";
const { formatWithCommas } = funciones();
</script>

<template>
  <div class="flex items-end">
    <h1 class="text-5xl font-bold dark:text-slate-50">
      {{formatWithCommas (paperclips) }}
    </h1>
    <span class="mx-3 text-gray-800 dark:text-gray-400">Paperclips</span>
  </div>
</template>
