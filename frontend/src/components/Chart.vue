<template>
  <div>
    <vue3-chart-js
      :type="type"
      :options="options"
      :data="data"
    />
  </div>
</template>

<script>
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs';

export default {
  name: 'App',
  components: {
    Vue3ChartJs,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
