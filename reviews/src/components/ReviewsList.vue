<script setup lang="ts">

import ReviewItem from './ReviewItem.vue'
import {Review} from "../models/review.ts";

defineProps<{
  reviews: Array<Review>
}>()
</script>

<template>
  <div class="grid">
    <div class="col-12" v-if="!reviews.length">
      <div class="p-3 bg-white border-round font-bold text-xl text-gray-600">
        No reviews yet! Click on "Add Review" button for creation 🙂
      </div>
    </div>

    <div class="col-12" :key="review.id" v-for="review in reviews">
      <ReviewItem :review="review"/>
    </div>
  </div>
</template>
