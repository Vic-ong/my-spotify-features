<template>
  <router-view v-slot="{ Component }">
    <PageLayout>
      <transition
        name="fade"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </PageLayout>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { initBreakpoints } from './composables/breakpoints';
import PageLayout from '@/components/PageLayout.vue';

export default defineComponent({
  name: 'App',
  components: {
    PageLayout,
  },
  setup() {
    const view = initBreakpoints();
    const status = reactive({
      loading: false,
      error: false,
    });

    return {
      view,
      status,
    };
  },
});
</script>

<style>
  /* Fade transition */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s ease;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  /* Bounce transition */
  .pop-enter-active {
    animation: pop-in .35s;
  }
  .pop-leave-active {
    animation: pop-in .2s reverse;
  }
  @keyframes pop-in {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
