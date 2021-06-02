<template>
  <div class="bg-light p-7 rounded-lg shadow-xl">
    <slot />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Card',
  });
</script>
