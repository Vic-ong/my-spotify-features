<template>
  <div>
    <PageContainer
      :loading="loading"
      :error="error"
      container
      class="h-full w-full text-center"
    >
      <div>
        <div class="font-bold">
          Playlist Audio Features
        </div>
        <div class="flex justify-center">
          <Chart
            type="radar"
            :options="chartOptions"
            :data="chartData"
            class="h-72 w-72 md-above:h-80 md-above:w-80"
          />
        </div>
      </div>
    </PageContainer>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useSpotify } from '@/services/spotify';
  import { SpotifyTrackFeature } from '@/services/types';
  import Chart from '@/components/Chart.vue';

  export default defineComponent({
    name: 'PlaylistFeature',
    components: {
      Chart,
    },
    props: {
      ids: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      const { tracksFeatures, getTracksFeatures } = useSpotify();
      getTracksFeatures({ ids: props.ids as string[] });

      const dataset = computed(() => {
        const borderColor = 'rgb(33, 150, 243)';
        const backgroundColor = 'rgba(33, 150, 243, 0.3)';
        const data = [
          0, // 0 acousticness
          0, // 1 danceability
          0, // 2 energy
          0, // 3 instrumentalness
          0, // 4 liveness
          0, // 5 speechiness
          0, // 6 valence
        ];
        if (!tracksFeatures.data) {
          return { data: null, borderColor, backgroundColor };
        }

        const calcAvg = (sum: number) => Math.round((sum / tracksFeatures.data.audio_features.length) * 100) / 100;
        const reducer = (acc: typeof data, curr: SpotifyTrackFeature) => {
          acc[0] += curr.acousticness;
          acc[1] += curr.danceability;
          acc[2] += curr.energy;
          acc[3] += curr.instrumentalness;
          acc[4] += curr.liveness;
          acc[5] += curr.speechiness;
          acc[6] += curr.valence;
          return acc;
        };

        return {
          data: tracksFeatures.data.audio_features.reduce(reducer, data).map((x) => calcAvg(x)),
          borderColor,
          backgroundColor,
        };
      });

      const chartData = computed(() => ({
        labels: [
          'Acousticness',
          'Danceability',
          'Energy',
          'Instrumentalness',
          'Liveness',
          'Speechiness',
          'Valence',
        ],
        datasets: [
          dataset.value,
        ],
      }));
      const chartOptions = {
        responsive: true,
        scale: {
          min: 0,
          max: 1,
          stepSize: 0.2,
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label({ raw }: { raw: number }) {
                return `${(raw * 100).toFixed(0)}%`;
              },
            },
          },
        },
      };

      const loading = computed(() => tracksFeatures.loading || !dataset.value.data);
      const error = computed(() => tracksFeatures.error || !dataset.value.data);

      return {
        loading,
        error,
        dataset,
        chartData,
        chartOptions,
      };
    },
  });
</script>
