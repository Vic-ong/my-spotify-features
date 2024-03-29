<template>
  <div class="flex flex-col space-y-7">
    <div class="flex justify-center">
      <a
        :href="profileUrl"
        target="_blank"
      >
        <img
          :src="profilePicture"
          class="h-20 w-20 rounded-full object-cover hover-pop"
        >
      </a>
    </div>

    <div class="flex justify-center space-x-7">
      <div
        v-for="item in profileSummary"
        :key="item.name"
        class="flex flex-col items-center"
      >
        <div class="font-bold">
          {{ item.name }}
        </div>
        <div>{{ item.value }}</div>
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
</template>

<script lang="ts">
  import { defineComponent, computed, watchEffect } from 'vue';
  import { useSpotify } from '@/services/spotify';
  import { useControls } from '@/services/controls';

  export default defineComponent({
    name: 'UserSummary',
    setup() {
      const { profile, playlists } = useSpotify();
      const { audio, getAudioElement, setAudioPlay, setAudioPause } = useControls();

      const profileUrl = computed(() => profile.value.data.external_urls.spotify);
      const profilePicture = computed(() => profile.value.data.images[0].url);
      const profileSummary = computed(() => [
        {
          name: 'Followers',
          value: profile.value.data.followers.total,
        },
        {
          name: 'Playlists',
          value: playlists.value.data?.total,
        },
        {
          name: 'Subscription',
          value: profile.value.data.product,
        },
      ]);

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
        profileUrl,
        profilePicture,
        profileSummary,
        audio,
        setAudioPlay,
        setAudioPause,
      };
    },
  });
</script>
