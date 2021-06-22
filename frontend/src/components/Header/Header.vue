<template>
  <div class="relative z-40 w-screen">
    <HeaderMenu />
  </div>

  <!-- Appears after scroll -->
  <div
    v-if="view.mdAndAbove"
    class="header-secondary z-40 w-screen bg-light"
  >
    <HeaderMenu />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useBreakpoints } from '@/composables/breakpoints';
  import HeaderMenu from './HeaderMenu.vue';

  export default defineComponent({
    name: 'Header',
    components: {
      HeaderMenu,
    },
    setup() {
      const view = useBreakpoints();
      const body = document.body;
      const scrollUp = 'scroll-up';
      const scrollDown = 'scroll-down';
      let lastScroll = 0;

      window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 200) {
          body.classList.remove(scrollUp);
          return;
        }
        
        if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
          // Set down scroll class
          body.classList.remove(scrollUp);
          body.classList.add(scrollDown);
        } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
          // Set up scroll class
          body.classList.remove(scrollDown);
          body.classList.add(scrollUp);
        }
        lastScroll = currentScroll;
      });

      return {
        view,
      };
    },
  });
</script>

<style scoped>
.header-secondary {
  position: fixed;
  top: -5rem;
  left: 0;
  right: 0;
  transition: transform 0.4s;
}
.scroll-down .header-secondary {
  transform: translate3d(0, 100%, 0);
}
.scroll-up .header-secondary {
  transform: none;
}
</style>
