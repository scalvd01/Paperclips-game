<script setup>
import { inject, computed, onMounted } from 'vue'
import allProjects from '@/composables/Projects'
import { watchOnce } from '@vueuse/core'
const game = inject('game')

const availableProjects = computed(() => {
  return allProjects.filter(
    (project) => !project.isUsed && (project.trigger() || project.isTriggered)
  )
})
function updateIsTriggered() {
  allProjects.forEach((project) => {
    if (project.trigger()) {
      project.isTriggered = true
    }
  })
}
function executeProject(projectID) {
  updateIsTriggered()
  let project = allProjects.find((element) => element.id === projectID)
  game.value.applyProjectEffect(project.effect)
  project.isUsed = true
}
onMounted(() => {
  //watchers para los proyectos de cable que tienen que llegar a una determinada longitud
  watchOnce(
    computed(
      () =>
        game.value.wireLongitude >= 1500 &&
        allProjects.find((project) => project.id === 'p10').isUsed
    ),
    () => {
      allProjects.find((project) => project.id === 'p11').isTriggered = true
    }
  )
  watchOnce(
    computed(
      () =>
        game.value.wireLongitude >= 2600 &&
        allProjects.find((project) => project.id === 'p11').isUsed
    ),
    () => {
      allProjects.find((project) => project.id === 'p13').isTriggered = true
    }
  )
  watchOnce(
    computed(
      () =>
        game.value.wireLongitude >= 5000 &&
        allProjects.find((project) => project.id === 'p13').isUsed
    ),
    () => {
      allProjects.find((project) => project.id === 'p14').isTriggered = true
    }
  )
  watchOnce(
    computed(() => game.value.wireCost >= 100),
    () => {
      allProjects.find((project) => project.id === 'p15').isTriggered = true
    }
  )
})

const numberOfCompletedProjects = computed(() => {
  return allProjects.filter((project) => project.isUsed).length
})
</script>
<template>
  <div class="p-2 rounded-md divide-y-2 dark:divide-y-2 dark:divide-neutral-700">
    <div id="upgradesTitle">
      <h1 class="font-bold text-lg pb-1">
        {{ $t('projects') }}
        <span class="pl-4 text-xs font-normal text-gray-800 dark:text-gray-400"
          >({{ numberOfCompletedProjects }}/{{ allProjects.length }} {{ $t('completed') }})</span
        >
      </h1>
    </div>
    <div class="py-2">
      <TransitionGroup name="list" tag="div">
        <div v-for="project in availableProjects" :key="project.id" class="my-2">
          <button
            type="button"
            class="flex flex-col p-2 w-full border rounded border-gray-200 dark:border-gray-600 bg-slate-300 disabled:bg-neutral-100 disabled:text-neutral-400 enabled:hover:bg-slate-400 enabled:active:scale-95 dark:enabled:hover:bg-slate-600 dark:enabled:bg-slate-700 dark:disabled:bg-slate-700/40 dark:disabled:text-slate-500"
            :disabled="!project.isPurchasable()"
            @click="() => executeProject(project.id)"
          >
            <h1 class="font-semibold pr-4">{{ $t(project.title) }}</h1>
            <h2>
              {{ project.price }}
            </h2>

            <p class="text-left">{{ $t(project.description) }}</p>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.list-move {
  animation-delay: 500ms;
}
.list-enter-active {
  transition: all 0.3s ease-out;
  animation: blink-1 0.3s both;
}

@keyframes blink-1 {
  0%,
  50%,
  100% {
    opacity: 1;
  }
  25%,
  75% {
    opacity: 0;
  }
}

.list-leave-active {
  transition: all 0.2s ease-in;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(40px);
}

.list-leave-active {
  position: absolute;
}
</style>
