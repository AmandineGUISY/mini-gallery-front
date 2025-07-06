<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { type Photo } from './types/index.tsx';

const API_BASE_URL = 'http://127.0.0.1:8000';

const images = ref<Photo[]>([]);
const editingImageId = ref<number | null>(null);
const newTitle = ref('');

onMounted(async () => {
    getImages();
})

const getImages = async () => {
  try {
      const response = await axios.get(`${API_BASE_URL}/photos`);
      images.value = response.data;
      console.log(images.value);

  } catch (error){
    console.error("Une erreur est survenue lors de la récupération des images", error);
  }
}

const deleteImage = async (idImage: number) => {
  try {
    await axios.delete(`${API_BASE_URL}/photos/${idImage}`);
    getImages();

  } catch(error) {
    console.error("Une erreur est survenue lors de la suppression d'une image", error);
  }
}

const startEditing = (image: Photo) => {
  editingImageId.value = image.id;
  newTitle.value = image.title;
};

const cancelEditing = () => {
  editingImageId.value = null;
  newTitle.value = '';
};

const updateTitle = async (idImage: number) => {

  try {
    await axios.patch(`${API_BASE_URL}/photos/${idImage}`, null, {
      params: { photo_update: newTitle.value }
    });
    await getImages();
    cancelEditing();
  } catch(error) {
    cancelEditing();
    console.error("Une erreur est survenue lors de la modification de l'image", error);
  }
}

</script>

<template>
  <h1>Mini Gallerie</h1>
  <div class="d-flex gap-2 flex-row align-items-center">
    <h2>Ajouter une Image</h2>
    <button class="btn btn-outline-success btn-sm square" ><font-awesome-icon icon="plus"/></button>
  </div>
  <div v-if="images.length > 0" class="card">
    <div v-for="image in images" :key="image.id" >
      <div class="card-header d-flex justify-content-between align-items-center gap-2">
        <h4 v-if="editingImageId !== image.id">{{ image.title }}</h4>
        <input v-else type="text" v-model="newTitle" class="form-control" @keyup.enter="updateTitle(image.id)" @keyup.esc="cancelEditing">
        <div class="d-flex gap-2">
          <template v-if="editingImageId === image.id">
            <button class="btn btn-outline-success btn-sm square" @click="updateTitle(image.id)"><font-awesome-icon icon="check"/></button>
            <button class="btn btn-outline-danger btn-sm square" @click="cancelEditing"><font-awesome-icon icon="xmark"/></button>
          </template>
          <template v-else>
            <button class="btn btn-outline-warning btn-sm square" @click="startEditing(image)"><font-awesome-icon icon="pen-to-square" /></button>
            <button class="btn btn-outline-danger btn-sm square" @click="deleteImage(image.id)"><font-awesome-icon icon="trash" /></button>
          </template>
        </div>
      </div>
      <div class="card-body">
        <img :src="`${API_BASE_URL}${image.thumbnail_url}`" :alt="image.title" />
      </div>
    </div>
  </div>
  <div v-else>
    <p>Pas d'image pour le moment !</p>
  </div>
</template>

<style>
.square {
  width: 32px;
  height: 32px;
}
</style>
