/* eslint-disable vue/component-definition-name-casing */
import { App } from 'vue';
import PageContainer from '@/components/PageContainer.vue';
import Card from '@/components/Card.vue';

export const registerComponents = (app: App): void => {
  app.component('PageContainer', PageContainer);
  app.component('Card', Card);
};
