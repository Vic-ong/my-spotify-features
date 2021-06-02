<template>
  <Card>
    <div class="flex flex-col items-center text-center space-y-7">
      <div>
        <img
          :src="data.img"
          class="h-28 w-28 object-cover shadow-md"
        >
      </div>

      <div class="flex flex-col sm-below:items-center space-y-2 md-above:space-y-5 sm-below:text-center">
        <div>
          <div class="font-bold">
            {{ data.name }}
          </div>
          <a :href="data.url">
            See more
          </a>
        </div>
              
        <div class="flex space-x-5 md-above:space-x-12 items-center">
          <div class="flex space-x-4 items-center">
            <div>
              <i class="fi-sr-music-alt" />
            </div>
            <div>
              {{ data.tracks }} tracks
            </div>
          </div>

          <div class="flex space-x-4 items-center">
            <div>
              <i class="fi-sr-users" />
            </div>
            <div>
              {{ data.followers }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <audio
          id="audio-controls"
          controls
        >
          <source
            id="audio-source"
            :src="audio.data.src"
          >
        </audio>
      </div>
    </div>
  </Card>
</template>

<script lang="ts">
  import { defineComponent, computed, watchEffect } from 'vue';
  import { useSpotify } from '@/services/spotify';
  import { useControls } from '@/services/controls';

  export default defineComponent({
    name: 'PlaylistInfo',
    setup() {
      const { playlist } = useSpotify();
      const { audio, getAudioElement } = useControls();

      const data = computed(() => {
        const { data } = playlist.value;
        return {
          name: data.name,
          followers: data.followers.total,
          tracks: data.tracks.total,
          img: data.images[0]?.url,
          url: data.external_urls.spotify,
        };
      });

      watchEffect(() => {
        const el = getAudioElement('audio-controls');
        const audioSrcEl = document.getElementById('audio-source') as HTMLSourceElement;
        const audioSrc = audio.value.data.src;
        if (el && !el.onplaying && audioSrc) {
          el.load();
          el.play();
        } else if (el && audioSrcEl && !el.paused && audioSrc === '') {
          el.pause();
        }
      });

      return {
        data,
        audio,
      };
    },
  });
</script>
