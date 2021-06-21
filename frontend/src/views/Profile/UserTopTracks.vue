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
        <TrackView
          :src="item.album.img"
          :active="audio.data.src === item.audioPreview && !audio.data.pause"
        >
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
                <IconFlame class="h-4 w-4" />
              </div>
              <div>
                {{ item.popularity }}%
              </div>
            </div>

            <div class="flex space-x-4 items-center">
              <div>
                <IconCalendar class="h-4 w-4" />
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
  import IconFlame from '@/components/Icons/IconFlame.vue';
  import IconCalendar from '@/components/Icons/IconCalendar.vue';
  import TrackView from '@/components/TrackView.vue';

  export default defineComponent({
    name: 'UserTopTracks',
    components: {
      IconFlame,
      IconCalendar,
      TrackView,
    },
    setup() {
      const { topTracks } = useSpotify();
      const { audio, setAudioTrack, setAudioPause } = useControls();

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
        const sample = tracks.value[index].audioPreview;

        if (!sample) {
          alert('Spotify has removed the audio sample of this track 😔\nThis typically occurs when the song has low popularity.\nPlease choose another track.');
        } else if (data.src === sample && !data.pause) {
          setAudioPause();
        } else {
          setAudioTrack({
            name: tracks.value[index].name,
            src: sample || '',
            pause: false,
          });
        }
      };

      return {
        loading,
        error,
        audio,
        tracks,
        toggleAudio,
      };
    },
  });
</script>
