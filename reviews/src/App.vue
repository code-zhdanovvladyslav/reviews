<script setup lang="ts">
import {onMounted, Ref, ref} from 'vue'

import Button from 'primevue/button';
import ReviewsList from './components/ReviewsList.vue'
import CreateReview from './components/CreateReview.vue'
import {Review} from "./models/review.ts";
import axios from "axios";
import Toast from "primevue/toast";

const reviews: Ref<Array<Review>> = ref([])
let isCreateReviewVisible = ref(false);

onMounted(async () => {
  const response = await axios.get(import.meta.env.VITE_APP_API_URL);

  reviews.value = response.data;
});

function toggleCreateReview(state: boolean) {
  isCreateReviewVisible.value = state;
}

function onCreateSuccess(newReview: Review): void {
  reviews.value.unshift(newReview);
}
</script>

<template>
  <Toast/>

  <div class="grid sm:col-offset-2 xl:col-offset-3">
    <div class="col-12 sm:col-10 xl:col-8">
      <ReviewsList :reviews="reviews" />
    </div>
  </div>

  <CreateReview v-model:visible="isCreateReviewVisible" @createSuccess="onCreateSuccess" />
  <Button @click="toggleCreateReview(true)" icon="pi pi-pencil" label="Add review" class="fixed bottom-0 right-0 m-4" size="small" />
</template>

<style scoped></style>
