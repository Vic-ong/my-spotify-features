<template>
  <div
    v-if="view.mdAndAbove"
    class="h-20 px-10 flex items-center justify-between"
  >
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

  <div v-else>
    <transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="menu"
        class="fixed z-50 inset h-screen w-screen bg-light"
      >
        <div
          class="flex justify-end p-5 cursor-pointer"
          @click="setMenu(false)"
        >
          Close
        </div>
        <div class="h-1/2 flex flex-col items-center justify-center space-y-10 heading-2">
          <div
            v-for="item in items"
            :key="item.key"
            @click="mobileRouteTo(item.key)"
          >
            <div class="text-dark">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="h-16 px-7 flex items-center justify-between">
      <div class="heading-2">
        {{ getPageTitle() }}
      </div>
      <div @click="setMenu(!menu)">
        <IconMenu class="h-5 w-5" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useBreakpoints } from '@/composables/breakpoints';
  import { logout } from '@/services/auth';
  import IconMenu from '../Icons/IconMenu.vue';
  import IconVinyl from '@/components/Icons/IconVinyl.vue';

  export default defineComponent({
    name: 'HeaderMenu',
    components: {
      IconMenu,
      IconVinyl,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const view = useBreakpoints();
      const menu = ref(false);

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

      const setMenu = (status: boolean) => {
        menu.value = status;
      };
      
      const mobileRouteTo = (routeName: string) => {
        setTimeout(() => setMenu(false), 200);
        router.push({ name: routeName });
      };

      const getPageTitle = () => {
        const item = items.find((x) => x.key === route.name);
        return item ? item.name : '';
      };

      const logoutHandler = () => {
        logout();
        router.replace({ name: 'auth' });
      };

      return {
        route,
        view,
        items,
        menu,
        setMenu,
        mobileRouteTo,
        getPageTitle,
        logoutHandler,
      };
    },
  });
</script>
