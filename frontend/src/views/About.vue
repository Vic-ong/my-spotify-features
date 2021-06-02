<template>
  <div class="flex flex-col items-center text-center">
    <div class="heading-2">
      About this project
    </div>

    <div class="mt-12 max-w-xl flex flex-col space-y-7">
      <div class="heading-3">
        I wanted to be familiarized with the
        <a
          href="https://developer.spotify.com/"
          target="_blank"
        >
          Spotify API.
        </a>
        The goal is to utilize the API to provide interesting
        insights about a user's playlists and implement the
        <a
          href="https://developer.spotify.com/documentation/general/guides/authorization-guide/"
          target="_blank"
        >
          Spotify authentication flow.
        </a>
      </div>

      <div>
        <span class="heading-3">Frontend:</span>
        Vite, Vue 3, Typescript, Tailwind CSS
      </div>

      <div>
        <span class="heading-3">Backend:</span>
        NodeJS, Koa, Typescript
      </div>

      <div>
        <span class="heading-3">Cloud Services:</span>
        Firebase Hosting, Cloud Functions
      </div>
    </div>

    <hr class="w-60 my-12 border border-dark">

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
          link: 'https://github.com/Vic-ong',
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
