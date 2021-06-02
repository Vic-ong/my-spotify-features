<template>
  <router-view v-slot="{ Component }">
    <transition
      name="transition-fade"
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
          name="transition-fade"
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
