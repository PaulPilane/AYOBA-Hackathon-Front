<template>
    <v-container>

        <v-card>
            <v-card-title class="justify-center">Login</v-card-title>
            <div>
                <div>
                    <v-img :src="image" cover></v-img>
                </div>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card-text>
                        <v-text-field variant="outlined" :rules="usernameRules" v-model="username" label="Username" required></v-text-field>
                        <v-text-field variant="outlined" :rules="passwordRules" v-model="password" label="Password" type="password"
                            required></v-text-field>
                    </v-card-text>
                </v-form>
            </div>
            <v-card-actions>
                <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
                    Login
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';



const authStore = useAuthStore();
const route = useRouter();
const valid = ref(true);
const username = ref('');
const password = ref('');
const image = ref('/ayoba_logo.png')
const usernameRules = [
    (v: any) => !!v || 'Username is required',
    (v: any) => (v && v.length > 3) || 'Username must be more than 3 characters',
];
const passwordRules = [
    (v: any) => !!v || 'Password is required',
    (v: any) => (v && v.length >= 8) || 'Password must be at least 8 characters',
];

const login = async () => {
    if (username.value === '' || password.value === '') {       
        alert('Please fill in all fields');
        return;
    }
    try {
        await authStore.login({ username: username.value, password: password.value });
        route.push({name: 'home'});
    } catch (error) {
        console.error(error);
    }
};
</script>