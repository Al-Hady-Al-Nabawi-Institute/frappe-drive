<template>
  <div
    class="grid bg-surface-modal border-t border-outline-gray-2 pb-[env(safe-area-inset-bottom)]"
    :style="{
      gridTemplateColumns: `repeat(${sidebarItems.length}, minmax(0, 1fr))`,
    }"
  >
    <button
      v-for="tab in sidebarItems"
      :key="tab.label"
      class="flex flex-col items-center justify-center gap-0.5 transition active:scale-95 h-14"
      @click="$router.push(tab.route)"
    >
      <component
        :is="tab.icon"
        class="size-5"
        :class="[tab.highlight() ? 'text-ink-gray-8' : 'text-ink-gray-5']"
      />
      <span
        class="text-[10px] leading-none"
        :class="[
          tab.highlight()
            ? 'text-ink-gray-8 font-medium'
            : 'text-ink-gray-5',
        ]"
      >
        {{ __(tab.label) }}
      </span>
    </button>
  </div>
</template>
<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router"

import LucideBuilding2 from "~icons/lucide/building-2"
import LucideClock from "~icons/lucide/clock"
import LucideHome from "~icons/lucide/home"
import LucideStar from "~icons/lucide/star"
import LucideUsers from "~icons/lucide/users"

const store = useStore()
const route = useRoute()

const sidebarItems = computed(() => {
  const first = store.state.breadcrumbs[0] || {}
  return [
    {
      label: "Home",
      route: "/",
      icon: LucideHome,
      highlight: () => first.name === "Home",
    },
    {
      label: "Teams",
      route: "/teams",
      icon: LucideBuilding2,
      highlight: () => route.name === "Teams",
    },
    {
      label: "Recents",
      route: "/recents",
      icon: LucideClock,
      highlight: () => first.name === "Recents",
    },
    {
      label: "Shared",
      route: "/shared",
      icon: LucideUsers,
      highlight: () => first.name === "Shared",
    },
    {
      label: "Favourites",
      route: "/favourites",
      icon: LucideStar,
      highlight: () => first.name === "Favourites",
    },
  ]
})
</script>
