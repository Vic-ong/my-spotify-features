<template>
  <PageContainer
    :loading="loading"
    :error="error"
  >
    <div class="grid grid-cols-3 gap-4 px-10">
      <div
        v-for="item in items"
        :key="item.id"
        class="flex space-x-4"
      >
        <TrackView
          :src="item.img"
          class="cursor-pointer"
          @click="routeTo(item.id)"
        >
          <template #title>
            <div>
              <div class="font-bold">
                {{ item.name }}
              </div>
            </div>
          </template>

          <template #features>
            <div class="flex space-x-4 items-center">
              <div>
                <IconMusic class="h-4 w-4" />
              </div>
              <div>
                {{ item.tracks.total }} tracks
              </div>
            </div>
          </template>
        </TrackView>
      </div>
    </div>
  </PageContainer>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useSpotify } from '@/services/spotify';
  import IconMusic from '@/components/Icons/IconMusic.vue';
  import TrackView from '@/components/TrackView.vue';

  export default defineComponent({
    name: 'Home',
    components: {
      IconMusic,
      TrackView,
    },
    setup() {
      const router = useRouter();
      const { playlists, getPlaylists } = useSpotify();

      if (!playlists.value.data) getPlaylists();

      const dataset = [playlists];

      const loading = computed(() => dataset.some((x) => x.value.loading === true));
      const error = computed(() => dataset.some((x) => x.value.error === true));

      const items = computed(() => playlists.value.data.items.map((item) => ({
        id: item.id,
        name: item.name,
        tracks: item.tracks,
        img: item.images[0]?.url,
      })));

      const routeTo = (id: string) => {
        router.push({ name: 'playlist', params: { id } });
      };

      return {
        loading,
        error,
        items,
        routeTo,
      };
    },
  });
</script>
