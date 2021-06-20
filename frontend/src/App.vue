<template>
  <router-view v-slot="{ Component }">
    <transition
      name="fade"
      mode="out-in"
    >
      <div v-if="status.loading">
        loading...
      </div>
      <div v-else-if="status.error">
        error!
      </div>

      <PageLayout v-else>
        <transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </PageLayout>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import PageLayout from '@/components/PageLayout.vue';

export default defineComponent({
  name: 'App',
  components: {
    PageLayout,
  },
  setup() {
    const status = reactive({
      loading: false,
      error: false,
    });

    return {
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
