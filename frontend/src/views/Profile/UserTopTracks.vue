<template>
  <PageContainer
    :loading="loading"
    :error="error"
  >
    <div class="grid lg-above:grid-cols-2 gap-4">
      <div
        v-for="(item, index) in tracks"
        :key="item.name"
        class="cursor-pointer"
        @click="toggleAudio(index)"
      >
        <TrackView :src="item.album.img">
          <template #title>
            <div>
              <div class="font-bold">
                {{ item.name }}
              </div>
              <div class="md-above:mt-2">
                {{ item.artist }}
              </div>
            </div>
          </template>

          <template #features>
            <div class="flex space-x-4 items-center">
              <div>
                <i class="fi-sr-flame" />
              </div>
              <div>
                {{ item.popularity }}%
              </div>
            </div>

            <div class="flex space-x-4 items-center">
              <div>
                <i class="fi-sr-calendar" />
              </div>
              <div>
                {{ item.album.releaseDate }}
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
  import dayjs from 'dayjs';
  import { useSpotify } from '@/services/spotify';
  import { useControls } from '@/services/controls';
  import TrackView from '@/components/TrackView.vue';

  export default defineComponent({
    name: 'UserTopTracks',
    components: {
      TrackView,
    },
    setup() {
      const { topTracks } = useSpotify();
      const { audio, setAudioTrack } = useControls();

      const loading = computed(() => topTracks.value.loading);
      const error = computed(() => topTracks.value.error);

      const tracks = computed(
        () => topTracks.value.data.items.map((item) => ({
          name: item.name,
          artist: item.artists[0]?.name,
          album: {
            name: item.album.name,
            img: item.album.images[0]?.url,
            releaseDate: dayjs(item.album.release_date).format('MMM YYYY'),
          },
          popularity: item.popularity,
          audioPreview: item.preview_url,
          duration: item.duration_ms,
        })),
      );

      const toggleAudio = (index: number) => {
        const { data } = audio.value;
        if (data.src === tracks.value[index].audioPreview) {
          setAudioTrack({
            name: '',
            src: '',
          });
        } else {
          setAudioTrack({
            name: tracks.value[index].name,
            src: tracks.value[index].audioPreview || '',
          });
        }
      };

      return {
        loading,
        error,
        tracks,
        toggleAudio,
      };
    },
  });
</script>
