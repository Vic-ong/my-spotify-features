<template>
  <PageContainer
    :loading="loading"
    :error="error"
  >
    <div class="px-10 grid gap-4">
      <div class="flex justify-center space-x-3">
        <PlaylistInfo />
        <PlaylistFeature :ids="trackIds" />
      </div>

      <PlaylistTracks />
    </div>
  </PageContainer>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useSpotify } from '@/services/spotify';
  import PlaylistInfo from './PlaylistInfo.vue';
  import PlaylistFeature from './PlaylistFeature.vue';
  import PlaylistTracks from './PlaylistTracks.vue';

  export default defineComponent({
    name: 'PlaylistView',
    components: {
      PlaylistInfo,
      PlaylistFeature,
      PlaylistTracks,
    },
    setup() {
      const route = useRoute();
      const { playlist, getPlaylist } = useSpotify();

      if (route.params.id) {
        getPlaylist(route.params.id as string);
      }

      const loading = computed(() => playlist.value.loading);
      const error = computed(() => !route.params.id || playlist.value.error);

      const trackIds = computed(() => {
        if (!playlist.value.data) return [];
        return playlist.value.data.tracks.items.map((item) => item.track.id);
      });

      return {
        loading,
        error,
        trackIds,
      };
    },
  });
</script>
