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
      const backgroundImg = computed(() => {
        const width = document.body.clientWidth;
        return `https://images.unsplash.com/photo-1541667816405-e38aca4ca38d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=${width}&q=80`;
      });

      return {
        showHeader,
        backgroundImg,
      };
    },
  });
</script>
