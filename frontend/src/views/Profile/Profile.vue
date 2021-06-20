<template>
  <PageContainer
    :loading="loading"
    :error="error"
  >
    <div class="px-10 space-y-4">
      <div>
        <UserSummary />
      </div>
      
      <Card>
        <div class="flex justify-center items-center space-x-3">
          <div class="heading-3">
            Top
          </div>

          <div class="inline-block relative">
            <div
              class="py-1 flex items-center space-x-2 border-b-2 cursor-pointer"
              @click="toggleTypeMenu"
            >
              <div class="heading-3">
                {{ currentType }}
              </div>
              <IconCaretDown class="h-4 w-4" />
            </div>

            <transition
              name="pop"
              mode="out-in"
            >
              <div
                v-if="typeMenu"
                class="absolute z-50 pt-1"
              >
                <div
                  class="bg-light shadow-md"
                  style="min-width: 8rem"
                >
                  <div
                    v-for="item in typeItems"
                    :key="item.key"
                    class="flex flex-col items-center py-3 px-5 cursor-pointer hover:bg-gray"
                    @click="onSelectType(item.key)"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <div class="heading-3">
            in the past
          </div>

          <div class="inline-block relative">
            <div
              class="py-1 flex items-center space-x-2 border-b-2 cursor-pointer"
              @click="toggleTimeRangeMenu"
            >
              <div class="heading-3">
                {{ currentTimeRange }}
              </div>
              <IconCaretDown class="h-4 w-4" />
            </div>

            <transition
              name="pop"
              mode="out-in"
            >
              <div
                v-if="timeRangeMenu"
                class="absolute z-50 pt-1"
              >
                <div
                  class="bg-light shadow-md" 
                  style="min-width: 8rem"
                >
                  <div
                    v-for="item in timeRangeItems"
                    :key="item.key"
                    class="flex flex-col items-center py-3 px-5 cursor-pointer hover:bg-gray"
                    @click="onSelectTimeRange(item.key)"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <transition
          name="fade"
          mode="out-in"
        >
          <component
            :is="topComponent"
            class="mt-5"
          />
        </transition>
      </Card>
    </div>
  </PageContainer>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, reactive } from 'vue';
  import { useSpotify } from '@/services/spotify';
  import { TimeRange } from '@/services/types';
  import IconCaretDown from '@/components/Icons/IconCaretDown.vue';
  import UserSummary from './UserSummary.vue';
  import UserTopTracks from './UserTopTracks.vue';
  import UserTopArtists from './UserTopArtists.vue';

  enum Type {
    Tracks = 'tracks',
    Artists = 'artists'
  }

  export default defineComponent({
    name: 'Profile',
    components: {
      IconCaretDown,
      UserSummary,
    },
    setup() {
      const {
        profile,
        playlists,
        topTracks,
        getProfile,
        getPlaylists,
        getTopTracks,
        getTopArtists,
      } = useSpotify();

      const selection = reactive({
        timeRange: TimeRange.FourWeeks,
        type: Type.Tracks,
      });
      const typeMenu = ref(false);
      const timeRangeMenu = ref(false);

      if (!profile.value.data) getProfile();
      if (!playlists.value.data) getPlaylists();
      if (!topTracks.value.data) getTopTracks({ timeRange: selection.timeRange });

      const dataset = [profile, playlists];
      const loading = computed(() => dataset.some((x) => x.value.loading === true));
      const error = computed(() => dataset.some((x) => x.value.error === true));

      const timeRangeItems = [
        {
          key: TimeRange.FourWeeks,
          name: '4 Weeks',
        },
        {
          key: TimeRange.SixMonths,
          name: '6 Months',
        },
        {
          key: TimeRange.AllTime,
          name: 'All time',
        },
      ];
      const toggleTimeRangeMenu = () => timeRangeMenu.value = !timeRangeMenu.value;
      const onSelectTimeRange = (range: TimeRange) => {
        timeRangeMenu.value = false;
        if (selection.timeRange !== range) {
          selection.timeRange = range;
          if (selection.type === Type.Tracks) {
            getTopTracks({ timeRange: selection.timeRange });
          } else {
            getTopArtists({ timeRange: selection.timeRange });
          }
        }
      };
      const currentTimeRange = computed(() => {
        return timeRangeItems.find((x) => x.key === selection.timeRange)?.name;
      });

      const typeItems = [
        {
          key: Type.Tracks,
          name: 'Tracks',
        },
        {
          key: Type.Artists,
          name: 'Artists',
        },
      ];
      const toggleTypeMenu = () => typeMenu.value = !typeMenu.value;
      const onSelectType = (type: Type) => {
        typeMenu.value = false;
        if (selection.type !== type) {
          selection.type = type;
          if (selection.type === Type.Tracks) {
            getTopTracks({ timeRange: selection.timeRange });
          } else {
            getTopArtists({ timeRange: selection.timeRange });
          }
        }
      };
      const currentType = computed(() => {
        return typeItems.find((x) => x.key === selection.type)?.name;
      });

      const topComponent = computed(() => {
        return selection.type === Type.Tracks ? UserTopTracks : UserTopArtists;
      });

      return {
        loading,
        error,
        topComponent,
        // time range
        timeRangeMenu,
        timeRangeItems,
        toggleTimeRangeMenu,
        onSelectTimeRange,
        currentTimeRange,
        // type
        typeMenu,
        typeItems,
        toggleTypeMenu,
        onSelectType,
        currentType,
      };
    },
  });
</script>
