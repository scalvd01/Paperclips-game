<script setup>
import DarkModeToggle from './DarkModeToggle.vue'
import { inject } from 'vue'
import { watchOnce, useStorage } from '@vueuse/core'
import { onMounted, computed } from 'vue'

const game = inject('game')

const infoArray = [
  {
    title: 'availableFunds',
    info: 'availableFundsInfo',
    trigger: () => {
      return true
    }
  },
  {
    title: 'unsoldInventory',
    info: 'unsoldInventoryInfo',
    trigger: () => {
      return true
    }
  },
  {
    title: 'pricePerClip',
    info: 'pricePerClipInfo',
    trigger: () => {
      return true
    }
  },
  {
    title: 'publicDemand',
    info: 'publicDemandInfo',
    trigger: () => {
      return true
    }
  },
  {
    title: 'marketing',
    info: 'marketingInfo',
    trigger: () => {
      return true
    }
  },
  {
    title: 'wire',
    info: 'wireInfo',
    trigger: () => {
      return true
    }
  },

  {
    title: 'researchLevel',
    info: 'researchLevelInfo',
    trigger: () => {
      return game.value.isResearchUnlocked
    }
  },
  {
    title: 'processors',
    info: 'processorsInfo',
    trigger: () => {
      return game.value.isResearchUnlocked
    }
  },
  {
    title: 'memory',
    info: 'memoryInfo',
    trigger: () => {
      return game.value.isResearchUnlocked
    }
  },
  {
    title: 'operations',
    info: 'operationsInfo',
    trigger: () => {
      return game.value.isResearchUnlocked
    }
  },
  {
    title: 'creativity',
    info: 'creativityInfo',
    trigger: () => {
      return game.value.isCreativityUnlocked
    }
  }
]

const isInfoPingActive = useStorage('isInfoPingActive', true)

onMounted(() => {
  watchOnce(
    computed(() => game.value.isResearchUnlocked),
    () => {
      isInfoPingActive.value = true
    }
  )

  watchOnce(
    computed(() => game.value.isCreativityUnlocked),
    () => {
      isInfoPingActive.value = true
    }
  )
})
</script>

<template>
  <div>
    <button
      id="toggle-menu-button"
      data-modal-toggle="modal-menu"
      data-modal-target="modal-menu"
      type="button"
      @click="isInfoPingActive = false"
      class="relative inline-flex items-center rounded p-2 hover:bg-slate-400 dark:hover:bg-slate-700"
    >
      <svg
        class="size-5 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
      <div v-if="isInfoPingActive" class="">
        <span
          class="absolute inline-flex items-center justify-center size-3 text-xs font-bold text-white bg-green-500 rounded-full top-1 end-1 animate-ping"
        ></span>
        <span
          class="absolute inline-flex items-center justify-center size-3 text-xs font-bold text-white bg-green-500 rounded-full top-1 end-1 "
        ></span>
      </div>
    </button>

    <div
      id="modal-menu"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative w-full max-w-3xl max-h-full">
        <!-- Modal content -->
        <div
          class="relative bg-white rounded-lg shadow dark:bg-gray-700 divide-y divide-gray-300 dark:divide-gray-600"
        >
          <!-- Modal header -->
          <div class="flex items-start justify-between p-4">
            <button
              id="closeButton"
              data-modal-hide="modal-menu"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-6 py-3 space-y-6">
            <div class="flex items-center">
              <h1 class="mr-4 font-medium">{{ $t('modo') }}</h1>
              <DarkModeToggle />
            </div>

            <div class="flex items-center">
              <h1 class="mr-4 font-medium">{{ $t('idioma') }}</h1>

              <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  @click="() => ($i18n.locale = 'es')"
                  class="px-4 py-2 text-sm font-medium rounded-l-lg text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 hover:text-blue-600 dark:hover:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                  :class="{
                    'bg-blue-600 text-white dark:bg-blue-600 dark:text-white': $i18n.locale === 'es'
                  }"
                >
                  Español
                </button>

                <button
                  type="button"
                  @click="() => ($i18n.locale = 'en')"
                  class="px-4 py-2 text-sm font-medium rounded-e-lg text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 hover:text-blue-600 dark:hover:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                  :class="{
                    'bg-blue-600 text-white dark:bg-blue-600 dark:text-white': $i18n.locale === 'en'
                  }"
                >
                  English
                </button>
              </div>
            </div>
          </div>
          <!-- Modal footer/info -->

          <div class="p-3" id="accordion-collapse" data-accordion="collapse">
            <div v-for="(item, index) in infoArray" :key="index">
              <div v-show="item.trigger()">
                <h2 :id="'accordion-collapse-heading-' + index">
                  <button
                    type="button"
                    class="flex items-center justify-between w-full p-5 font-medium rtl:text-right border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 gap-3"
                    :data-accordion-target="'#accordion-collapse-body-' + index"
                    aria-expanded="false"
                    :aria-controls="'accordion-collapse-body-' + index"
                  >
                    <div class="flex items-center gap-2">
                      <svg
                        class="w-4 h-4 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        /></svg
                      ><span class="text-gray-800 dark:text-white">{{ $t(item.title) }} </span>
                    </div>

                    <svg
                      data-accordion-icon
                      class="w-3 h-3 rotate-180 shrink-0"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  :id="'accordion-collapse-body-' + index"
                  class="hidden"
                  :aria-labelledby="'accordion-collapse-heading-' + index"
                >
                  <div
                    class="p-5 border border-t-0 border-gray-200 dark:border-gray-600 dark:bg-grey-800"
                  >
                    <p class="mb-2 text-gray-700 dark:text-gray-200" v-html="$t(item.info)"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
