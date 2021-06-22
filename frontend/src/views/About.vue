<template>
  <div class="flex flex-col items-center text-center space-y-12">
    <div class="mt-12 heading-2">
      About this project
    </div>

    <div class="md-above:max-w-xl flex flex-col items-center text-left px-7 space-y-7">
      <div>
        A full-stack application to showcase a conceptual design of the Spotify app. I wanted to create visuals that trigger nostalgic reminiscence of the old-school ways of listening to music, using vinyl. Functionality wise, I wanted to analyze and display top music and audio features using
        <a
          href="https://developer.spotify.com/"
          target="_blank"
        >
          Spotify API.
        </a>
      </div>

      <div>
        <div>
          <span class="font-bold">Frontend:</span>
          Vite, Vue 3, Typescript, Tailwind CSS
        </div>

        <div>
          <span class="font-bold">Backend:</span>
          NodeJS, Koa, Typescript
        </div>

        <div>
          <span class="font-bold">Cloud Services:</span>
          Firebase Hosting, Cloud Functions
        </div>
      </div>
    </div>

    <hr class="w-60 border border-dark">

    <div class="flex justify-center items-center space-x-14">
      <a
        v-for="icon in icons"
        :key="icon.link"
        :href="icon.link"
        class="flex flex-col justify-center items-center w-6 h-6 transition duration-500 ease-in-out transform hover:scale-125"
      >
        <component :is="icon.component" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import IconGithub from '@/components/Icons/IconGithub.vue';
  import IconLinkedIn from '@/components/Icons/IconLinkedIn.vue';
  import IconInstagram from '@/components/Icons/IconInstagram.vue';

  export default defineComponent({
    name: 'About',
    setup() {
      const icons = [
        {
          component: IconGithub,
          link: 'https://github.com/Vic-ong/my-spotify-features',
        },
        {
          component: IconLinkedIn,
          link: 'https://www.linkedin.com/in/vickong/',
        },
        {
          component: IconInstagram,
          link: 'https://www.instagram.com/vic_ong/',
        },
      ];

      return {
        icons,
      };
    },
  });
</script>
