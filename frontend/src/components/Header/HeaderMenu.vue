<template>
  <div class="h-20 px-10 flex items-center justify-between">
    <div class="hover-pop">
      <router-link :to="{ name: 'home' }">
        <IconVinyl
          height="24"
          width="24"
        />
      </router-link>
    </div>

    <div class="flex items-center space-x-10 heading-2">
      <router-link
        v-for="item in items"
        :key="item.key"
        :to="{ name: item.key }"
        class="hover-pop"
      >
        <div :class="route.name === item.key ? 'text-primary' : 'text-dark'">
          {{ item.name }}
        </div>
      </router-link>
    </div>

    <div
      class="hover-pop cursor-pointer heading-2"
      @click="logoutHandler"
    >
      Logout
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { logout } from '@/services/auth';
  import IconVinyl from '@/components/Icons/IconVinyl.vue';

  export default defineComponent({
    name: 'HeaderMenu',
    components: {
      IconVinyl,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();

      const items = [
        {
          key: 'about',
          name: 'About',
        },
        {
          key: 'home',
          name: 'Playlists',
        },
        {
          key: 'profile',
          name: 'Profile',
        },
      ];

      const logoutHandler = () => {
        logout();
        router.replace({ name: 'auth' });
      };

      return {
        route,
        items,
        logoutHandler,
      };
    },
  });
</script>
