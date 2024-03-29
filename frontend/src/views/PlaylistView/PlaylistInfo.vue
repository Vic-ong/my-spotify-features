<template>
  <div class="p-3">
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
              <IconMusic class="h-4 w-4" />
            </div>
            <div>
              {{ data.tracks }} tracks
            </div>
          </div>

          <div class="flex space-x-4 items-center">
            <div>
              <IconUser class="h-4 w-4" />
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
          :onplay="setAudioPlay"
          :onpause="setAudioPause"
          controls
        >
          <source
            id="audio-source"
            :src="audio.data.src"
          >
        </audio>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, watchEffect } from 'vue';
  import { useSpotify } from '@/services/spotify';
  import { useControls } from '@/services/controls';
  import IconMusic from '@/components/Icons/IconMusic.vue';
  import IconUser from '@/components/Icons/IconUser.vue';

  export default defineComponent({
    name: 'PlaylistInfo',
    components: {
      IconMusic,
      IconUser,
    },
    setup() {
      const { playlist } = useSpotify();
      const { audio, getAudioElement, setAudioPlay, setAudioPause } = useControls();

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
        const { src, pause } = audio.value.data;
        const audioSrcEl = document.getElementById('audio-source') as HTMLSourceElement;
        if (el && !el.onplaying && src && !pause) {
          el.load();
          el.play();
          setAudioPlay();
        } else if (el && audioSrcEl && !el.paused && pause) {
          el.pause();
        }
      });

      return {
        data,
        audio,
        setAudioPause,
        setAudioPlay,
      };
    },
  });
</script>
