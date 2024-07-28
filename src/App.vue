<template>
  <v-app>
    <v-app-bar color="primary">
      <div class="">
        <img :src="image" class="rounded-lg" cover alt="logo" style="max-height: 50px;">
      </div>
      <v-toolbar-title>Ayoba</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="loggedIn" @click="logout">Logout</v-btn>
      <v-btn @click.stop>
        <v-icon size="large">mdi-cog</v-icon>
        <v-menu activator="parent">
          <v-list>
            <v-list-item prepend-icon="mdi-brain" :to="{name: `analytics`}">Analytics</v-list-item>
            <v-list-item prepend-icon="mdi-logout">Logout</v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-progress-circular v-if="loading" class="d-flex justify-space-between" color="primary" size="64"
        indeterminate></v-progress-circular>
      <router-view v-if="!loading"></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { AyobaAPI } from './service/AyobaAPI';
import { useAuthStore } from './store/auth';
import { useBusinessStore } from './store/business';


const router = useRouter();
const authStore = useAuthStore(); 
const businessStore = useBusinessStore();
const loggedIn = ref(false)
const image = ref('/ayoba_logo.png');
const loading = ref(true)

const logout = async() => {
    authStore.logout();
    loggedIn.value = false
    router.push({ name: 'login' });
}

onMounted(async () => {

  const expiredTime = localStorage.getItem('expire');
  if (!expiredTime || new Date(expiredTime).getUTCMilliseconds() > new Date().getUTCMilliseconds()) {
    localStorage.clear();
     router.push({ name: 'login' });
  }
  const accessToken = localStorage.getItem('accessToken');
    console.log("We made it here", accessToken)
  if (accessToken){
    AyobaAPI.headers = {
      Authorization: `${accessToken}`
    };
    await businessStore.getTextMessages();
    await businessStore.getAllBusinesses();
    await businessStore.getAllMessages()
  }
  else {
    router.push({ name: 'login' })
  }


  loading.value = false;
})
</script>
<style scoped></style>
