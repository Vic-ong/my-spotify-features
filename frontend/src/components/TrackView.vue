<template>
  <div class="card-container p-2 md-above:p-5 rounded-lg flex sm-below:flex-col items-center sm-below:space-y-2 md-above:space-x-14 hover:bg-gray">
    <transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="active"
        class="h-28 w-28 flex justify-center items-center"
      >
        <IconVinylDisc
          width="104"
          height="104"
          class="animate-spin-slow"
        />
      </div>
      <div
        v-else
        class="relative"
      >
        <div class="vinyl-cover relative z-10 shadow-md">
          <img
            :src="src"
            class="h-28 w-28 sm-below:h-16 sm-below:w-16 object-cover"
          >
        </div>
        <div class="vinyl absolute top-1 left-1 inset-0 sm-below:hidden">
          <IconVinylDisc
            width="104"
            height="104"
          />
        </div>
      </div>
    </transition>

    <div class="flex flex-col sm-below:items-center space-y-2 md-above:space-y-5 sm-below:text-center">
      <slot name="title" />

      <div class="flex space-x-5 md-above:space-x-12 items-center">
        <slot name="features" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import IconVinylDisc from '@/components/Icons/IconVinylDisc.vue';

  export default defineComponent({
    name: 'TrackView',
    components: {
      IconVinylDisc,
    },
    props: {
      src: {
        type: String,
        required: true,
      },
      active: {
        type: Boolean,
        default: false,
      },
    },
  });
</script>

<style scoped>
  .card-container {
    transition: background-color .5s ease-in-out;
  }
  .vinyl-cover {
    transition: transform .2s ease-out;
  }
  .vinyl {
    transition: transform .3s ease-out;
  }
  .card-container:hover .vinyl-cover {
    transform: translateX(-0.5rem);
  }
  .card-container:hover .vinyl {
    transform: translateX(2.5rem) rotate(135deg);
  }
</style>
