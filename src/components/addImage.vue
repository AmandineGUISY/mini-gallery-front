<script setup>
import { ref } from 'vue';
import axios from 'axios';

const emit = defineEmits(['image-added']);

const title = ref('');
const imageFile = ref<File | null>(null);
const isCreating = ref(false);

const closeForm = () => {
    isCreating.value = false;
    title.value = "";
    imageFile.value = null;
}

const openForm = () => {
    isCreating.value = true;
}


</script>

<template>
<button class="btn btn-success" @click="openForm()">Ajouter une image +</button>
  <div v-if="isCreating" class="card p-3">
    <div class="mb-3">
      <label class="form-label">Titre</label>
      <input v-model="title" type="text" class="form-control" placeholder="Titre de l'image" />
    </div>
    <div class="mb-3">
      <label class="form-label">Image</label>
      <input type="file" class="form-control" accept="image/*"/>
    </div>
    <div class="d-flex gap-2 mt-2 flex-row justify-content-end">
      <button @click="" class="btn btn-success">
        <font-awesome-icon icon="check"/>
      </button>
      <button @click="closeForm()" class="btn btn-danger">
        <font-awesome-icon icon="xmark"/>
      </button>
    </div>
  </div>
</template>