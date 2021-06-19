<template>
  <PageContainer
    :loading="loading"
    :error="error"
  >
    <div class="grid lg-above:grid-cols-2 gap-4">
      <div
        v-for="(item) in artists"
        :key="item.name"
      >
        <div class="group p-5 rounded-lg flex items-center space-x-14 hover:bg-gray">
          <div class="shadow-md transform duration-200 group-hover:scale-110">
            <img
              :src="item.img"
              class="h-28 w-28 object-cover"
            >
          </div>
          <div class="flex flex-col space-y-5">
            <div>
              <div class="font-bold">
                {{ item.name }}
              </div>
              <a
                :href="item.url"
                target="_blank"
              >
                See more
              </a>
            </div>

            <div class="flex space-x-12 items-center">
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
                  <IconUser class="h-4 w-4" />
                </div>
                <div>
                  {{ item.followers }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useSpotify } from '@/services/spotify';
  import { TimeRange } from '@/services/types';
  import IconFlame from '@/components/Icons/IconFlame.vue';
  import IconUser from '@/components/Icons/IconUser.vue';

  export default defineComponent({
    name: 'UserTopArtists',
    components: {
      IconFlame,
      IconUser,
    },
    props: {
      range: {
        type: String,
        default: TimeRange.FourWeeks,
      },
    },
    setup() {
      const { topArtists } = useSpotify();

      const loading = computed(() => topArtists.value.loading);
      const error = computed(() => topArtists.value.error);

      const artists = computed(
        () => topArtists.value.data.items.map((item) => ({
          name: item.name,
          popularity: item.popularity,
          followers: item.followers.total,
          img: item.images[0]?.url,
          url: item.external_urls.spotify,
        })),
      );

      return {
        loading,
        error,
        artists,
      };
    },
  });
</script>
