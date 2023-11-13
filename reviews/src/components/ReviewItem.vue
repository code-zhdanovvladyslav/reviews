<script setup lang="ts">
import {Review} from "../models/review.ts";
import Card from 'primevue/card';
import Rating from 'primevue/rating';
import Divider from 'primevue/divider';

defineProps<{
  review: Review
}>()
</script>

<template>
  <Card>
    <template #title>{{ review.title }}</template>
    <template #content>
      <Rating v-model="review.rating" readonly :cancel="false" class="mb-2"/>
      <div class="mt-3 text-xl">{{ review.content }}</div>
    </template>

    <template #footer>
      <div class="flex align-items-start text-sm">
        <span>{{ review.author }}</span>

        <Divider layout="vertical" />

        <address class="flex flex-column gap-1">
          <a :href="'mailto:' + review.email">{{ review.email }}</a>
          <a :href="'tel:' + review.phone">{{ review.phone }}</a>
        </address>
      </div>
    </template>

  </Card>
</template>

<style>
.p-card-content {
  padding-top: 5px;
}
</style>
