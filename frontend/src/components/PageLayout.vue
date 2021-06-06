<template>
  <div>
    <div class="fixed z-0 inset-0 h-screen w-screen bg-gradient-to-t from-background-1 via-background-2 to-background-3" />

    <Header v-if="showHeader" />
    <div
      class="absolute z-10 w-screen"
      :class="showHeader ? 'top-20' : ''"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import Header from '@/components/Header/Header.vue';

  export default defineComponent({
    name: 'PageLayout',
    components: {
      Header,
    },
    setup() {
      const route = useRoute();

      const showHeader = computed(() => route.name !== 'auth');

      return {
        showHeader,
      };
    },
  });
</script>
