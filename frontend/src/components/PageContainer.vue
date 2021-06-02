<template>
  <div>
    <transition
      name="transition-fade"
      mode="out-in"
    >
      <div
        v-if="loading"
        class="flex justify-center items-center"
        :class="container ? 'h-full' : 'min-h-screen-1/2'"
      >
        <Loader />
      </div>

      <div
        v-else-if="error"
        class="flex justify-center items-center text-center"
        :class="container ? 'h-full' : 'min-h-screen-1/2'"
      >
        <slot name="error">
          <!-- Default error content -->
          <div class="max-w-md flex flex-col space-y-3">
            <div class="flex justify-center space-x-3">
              <i class="fi-sr-exclamation text-xl text-error" />
              <span class="heading-2">
                Internal Error
              </span>
            </div>
            <div>
              <div>
                Apologies for the unexpected error 😰
              </div>
              <div>
                Please contact
                <a href="mailto:vickyocc53@gmail.com">
                  vickyocc53@gmail.com
                </a>
                for assistance.
              </div>
            </div>
          </div>
        </slot>
      </div>

      <slot v-else />
    </transition>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Loader from '@/components/Loader.vue';

  export default defineComponent({
    name: 'PageContainer',
    components: {
      Loader,
    },
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
      error: {
        type: Boolean,
        default: false,
      },
      container: {
        type: Boolean,
        default: false,
      },
    },
  });
</script>
