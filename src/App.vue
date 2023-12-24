<script setup>
import DarkModeToggle from "./components/DarkModeToggle.vue";
import AchievementsTextArea from "./components/AchievementsTextArea.vue";
import ClipNumberDisplay from "./components/ClipsNumberDisplay.vue";
import Logo from "./components/Logo.vue";
import MakePaperclipButton from "./components/MakePaperclipButton.vue";
import CardBusiness from "./components/CardBusiness.vue";
import CardManufacturing from "./components/CardManufacturing.vue";
import { Toaster, toast } from "vue-sonner";

import { useIntervalFn } from "@vueuse/core";
import { funciones } from "./composables/funciones.js";
const { slowLoopFunction, mainLoopFunction, saveLoadFunction } = funciones();

//MAIN LOOP
const { pauseMainLoop, resumeMainLoop, isActiveMainLoop } = useIntervalFn(
  () => {
    mainLoopFunction();
  },
  10
);

// SLOW LOOP
const { pauseSlowLoop, resumeSlowLoop, isActiveSlowLoop } = useIntervalFn(
  () => {
    slowLoopFunction();
  },
  100
);

// SAVE LOOP
const { pauseSaveLoop, resumeSaveLoop, isActiveSaveLoop } = useIntervalFn(
  () => {
    saveLoadFunction("save");
  },
  1000
);
saveLoadFunction("load");
</script>

<template>
  <Toaster position="top-right" />
  <header
    class="flex flex-col md:flex-row md:justify-between md:items-end md:h-10 md:m-4 md:mt-12 text-ellipsis overflow-hidden"
  >
    <Logo class="order-1 flex justify-center my-1" />

    <ClipNumberDisplay class="order-3 grow justify-center" />

    <DarkModeToggle class="order-2 flex justify-center my-1 md:order-3" />
  </header>

  <main class="mb-auto mx-8 mt-6">
    <div class="flex justify-center"><MakePaperclipButton /></div>
    <div
      class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
    >
      <CardBusiness />
      <CardManufacturing />
    </div>
  </main>
  <!-- <footer id="footer" class=" m-4 mb-4"><AchievementsTextArea /></footer> -->
</template>

<style scoped></style>
