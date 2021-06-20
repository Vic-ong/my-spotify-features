<template>
  <div class="min-h-screen-3/4 w-screen flex justify-center items-center text-center">
    <div v-if="status.loading">
      <Loader />
    </div>

    <div
      v-else-if="status.error"
      class="flex flex-col items-center space-y-3 bg-gray rounded-md p-7 shadow-md"
    >
      <IconWarning class="h-5 w-5 fill-current text-error" />
      <div class="heading-3">
        Failed To Authenticate!
      </div>
      <div>
        Please contact
        <a href="mailto:vickyocc53@gmail.com">
          vickyocc53@gmail.com
        </a>
        to raise this issue.
      </div>
    </div>

    <div v-else>
      <div class="flex flex-col items-center space-y-10 text-center">
        <div class="flex space-x-3">
          <div>
            <IconVinyl
              height="48"
              width="48"
            />
          </div>
          <div class="heading">
            My Spotify Features
          </div>
        </div>

        <div>
          <button
            class="button-style bg-primary"
            @click="login"
          >
            Sign in to Spotify
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import dayjs from 'dayjs';
  import { login } from '@/services/auth';
  import Loader from '@/components/Loader.vue';
  import IconWarning from '@/components/Icons/IconWarning.vue';
  import IconVinyl from '@/components/Icons/IconVinyl.vue';

  export default defineComponent({
    name: 'Auth',
    components: {
      Loader,
      IconWarning,
      IconVinyl,
    },
    setup() {
      const router = useRouter();
      const route = useRoute();

      const status = reactive({
        loading: false,
        error: false,
      });

      onMounted(() => {
        const { state, error, access_token, refresh_token, expires_in } = route.query;
        
        if (state) {
          status.loading = true;

          if (!error && access_token && refresh_token && expires_in) {
            // access granted
            const expireDateTime = dayjs().add(parseInt(expires_in.toString()), 'second').toString();

            localStorage.setItem('access_token', access_token.toString());
            localStorage.setItem('refresh_token', refresh_token.toString());
            localStorage.setItem('expires_in', expireDateTime);

            router.replace({ name: 'home' });
          } else if (error) {
            if (error.toString() === 'access_denied') {
              // access denied
              console.error('User denied access.');
            } else {
              // internal error
              console.error('Unable to login. Please check backend service log.');
            }
            status.loading = false;
            status.error = true;
          }
        }
      });

      return {
        login,
        status,
      };
    },
  });
</script>
