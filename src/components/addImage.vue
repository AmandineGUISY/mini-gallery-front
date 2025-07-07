<script setup lang="ts">
import { ref, type Ref } from 'vue';
import axios from 'axios';

const emit = defineEmits(['image-added']);

const title = ref('');
const imageFile: Ref<File | null> = ref(null);
const isCreating = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const API_BASE_URL = 'http://127.0.0.1:8000';const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const closeForm = () => {
    isCreating.value = false;
    title.value = "";
    imageFile.value = null;
    if (fileInput.value) {
        fileInput.value.value = ''; // Clear the file input
    }
}

const openForm = () => {
    isCreating.value = true;
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (!target.files || target.files.length === 0) {
    imageFile.value = null;
    return;
  }

  const file = target.files[0];

  if (!ALLOWED_FILE_TYPES.includes(file.type)) { // check the type of the file
    console.log(`Format de fichier non valide. Formats autorisés : ${ALLOWED_FILE_TYPES.map(t => t.split('/')[1]).join(', ')}.`);
    imageFile.value = null;
    if (fileInput.value) fileInput.value.value = '';
    return;
  }

  if (file.size > MAX_FILE_SIZE_BYTES) { // check the size of the file
    console.log(`Le fichier est trop volumineux. La taille maximale est de ${MAX_FILE_SIZE_MB} Mo.`);
    imageFile.value = null;
    if (fileInput.value) fileInput.value.value = '';
    return;
  }

  imageFile.value = file;
};

const addImage = async () => {
  if (!title.value || !imageFile.value) {
    console.log("Le titre et l'image sont requis.");
    return;
  }

    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('file', imageFile.value);
    formData.append('category','');
    formData.append('tags', '');
    try {
        await axios.post(`${API_BASE_URL}/photos`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
        emit('image-added');
        closeForm();
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'image:", error);
    }
}

</script>

<template>
  <button class="btn btn-success" @click="openForm()">Ajouter une image +</button>
  <div v-if="isCreating" class="modal-backdrop">
    <div class="card modal-container p-4 shadow-lg">
      <div class="mb-3">
        <label class="form-label">Titre</label>
        <input v-model="title" type="text" class="form-control" placeholder="Titre de l'image" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Image</label>
        <input id="file-input" ref="fileInput" type="file" class="form-control" :accept="ALLOWED_FILE_TYPES.join(',')" @change="handleFileChange" required/>
      </div>
      <div class="d-flex gap-2 mt-2 flex-row justify-content-end">
        <button @click="addImage()" class="btn btn-success">
          <font-awesome-icon icon="check"/>
        </button>
        <button @click="closeForm()" class="btn btn-danger">
          <font-awesome-icon icon="xmark"/>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 999;
}

.modal-container {
  width: 100%;
  max-width: 500px;
  padding: 1rem;
}
</style>