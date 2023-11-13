<script setup lang="ts">
import * as yup from 'yup';
import axios from 'axios';
import {toRaw, watch} from 'vue';

import Dialog from 'primevue/dialog';
import Rating from "primevue/rating";
import Textarea from "primevue/textarea";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import InputMask from "primevue/inputmask";

import {useToast} from "primevue/usetoast";
import {useForm} from 'vee-validate';

const toast = useToast();
const emit = defineEmits(['cancel', 'createSuccess', 'update:visible']);
const props = defineProps<{ visible: boolean }>();

const {values, errors, defineComponentBinds, resetForm, setErrors, handleSubmit} = useForm({
  validationSchema: yup.object({
    rating: yup.number(),
    title: yup.string().required().min(3),
    content: yup.string().required().min(10),
    author: yup.string().required().min(2),
    phone: yup.string().required(),
    email: yup.string().email().required(),
  }),
  initialValues: {
    rating: 4,
    title: '',
    content: '',
    author: '',
    phone: '',
    email: '',
  }
});

const rating = defineComponentBinds('rating');
const title = defineComponentBinds('title');
const content = defineComponentBinds('content');
const author = defineComponentBinds('author');
const email = defineComponentBinds('email');
const phone = defineComponentBinds('phone');

const addReview = handleSubmit(async () => {
  try {
    const response = await axios.post('http://localhost:8080', toRaw(values));

    emit('createSuccess', response?.data || null);
    emit('update:visible', false);

    toast.add({ severity: 'success', summary: 'Thanks!', detail: 'Review added', life: 3000 });

  } catch (err) {
    toast.add({severity: 'error', summary: 'Error', detail: 'Try later', life: 3000});
  }
});

watch(() => props.visible, (value) => {
  if (!value) {
    resetForm();
    setErrors({});
  }
});

</script>

<template>
  <Dialog
      @update:visible="$emit('update:visible')"
      :visible="visible"
      :draggable="false"
      :style="{ width: '50rem' }"
      modal header="New review"
      position="top">
    <form @submit="addReview" class="flex flex-column gap-3">
      <Rating v-bind="rating" :cancel="false"/>

      <div>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-pencil"></i>
          </InputGroupAddon>
          <InputText placeholder="Title" v-bind="title" :class="{ 'p-invalid': errors.phone }" />
        </InputGroup>
        <small v-if="errors.title" class="p-error ml-6">{{ errors.title }}</small>

      </div>

      <div>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText placeholder="Username" v-bind="author" :class="{ 'p-invalid': errors.phone }" />
        </InputGroup>
        <small v-if="errors.author" class="p-error ml-6">{{ errors.author }}</small>
      </div>

      <div>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-at"></i>
          </InputGroupAddon>
          <InputText placeholder="Email" v-bind="email" :class="{ 'p-invalid': errors.email }"/>
        </InputGroup>
        <small v-if="errors.email" class="p-error ml-6">{{ errors.email }}</small>
      </div>

      <div>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-phone"></i>
          </InputGroupAddon>
          <InputMask placeholder="Phone" mask="+99 (999) 999-9999" v-bind="phone"
                     :class="{ 'p-invalid': errors.phone }"/>
        </InputGroup>
        <small v-if="errors.phone" class="p-error ml-6">{{ errors.phone }}</small>
      </div>

      <div>
        <InputGroup>
          <InputGroupAddon class="align-items-start">
            <i class="pi pi-align-right"></i>
          </InputGroupAddon>
          <Textarea placeholder="What do you think?" v-bind="content" rows="5" :class="{ 'p-invalid': errors.phone }"/>
        </InputGroup>
        <small v-if="errors.content" class="p-error ml-6">{{ errors.content }}</small>
      </div>
    </form>

    <template #footer>
      <Button label="Add" icon="pi pi-send" size="small" @click="addReview" autofocus/>
    </template>
  </Dialog>
</template>
