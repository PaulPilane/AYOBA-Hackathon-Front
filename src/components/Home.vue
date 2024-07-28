<template>
    <v-navigation-drawer permanent>
        <v-list>
            <v-list-item v-for="(business, index) in businesses" :key="index" @click="onClick(business)">
                <v-list-item-title>{{ business.name }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-container>
        <v-card v-for="m in messages" v-if="messages.length > 0">
            <v-card-title v-if="m.message.text">{{ m.message.text }}</v-card-title>
        </v-card>
        <v-card color="grey" width="50%" class="mb-2" v-for="message in messagesMock">
            <v-card-title>{{ message.message }}</v-card-title>
            <v-card-text  class="d-flex justify-end text-subtitle-2">
                {{ message.user }}  
            </v-card-text>
        </v-card>  
    </v-container>
    <v-container>
        <v-app-bar v-if="selectedUser">
            <v-app-bar-title>{{ selectedUser?.name ?? 'asd' }}</v-app-bar-title>
        </v-app-bar>
        <div>

        </div>
        <v-bottom-navigation class="mb-2">
            <v-text-field placeholder="Enter Message" v-model="text" variant="outlined" append-icon="mdi-send"
                @click:append="sendMessage" class="rounded-lg"></v-text-field>
        </v-bottom-navigation>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBusinessStore } from '../store/business';
import Info from '../service/Info';
import { storeToRefs } from 'pinia';

const selectedUser = ref<any>(null)

const businessStore = useBusinessStore();
const {messages, businesses} = storeToRefs(businessStore);
const sentMessage = ref(false);
const messagesMock = ref<{user: string, message: string}[]>([]);

const text = ref('');
const users = ref([
  { name: 'John Doe', message: 'Hey there!' },
  { name: 'Jane Smith', message: 'Can we meet tomorrow?' },
  { name: 'Alice Johnson', message: 'I will send the report by EOD.' },
  { name: 'Bob Brown', message: "Let's catch up over coffee." }
]);

const onClick = (user: any) => {
  selectedUser.value = user;
};

const sendMessage = async () => {
  if (!text.value) {
    Info.showToastObject({ message: 'Please enter a message', type: 'warning' });
    return;
  }

  const message = {
    msisdns: ['+27720479826'],
    message: {
      type: 'text',
      text: text.value,
    },
  };
    sentMessage.value = true;
    await businessStore.sendTextMessage(message);
    messagesMock.value.push({ user: '+2772047982', message: text.value})
    text.value = ''; // Clear the text field after sending the message
    sentMessage.value = true;
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
