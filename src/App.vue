<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { type Photo } from './types/index.tsx';

const API_BASE_URL = 'http://127.0.0.1:8000';

const images = ref<Photo[]>([]);

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

const updateTitleImg = async (newTitle : string) => {
  try {

  } catch(error) 
}

</script>

<template>
  <h1>Mini Gallerie</h1>
  <div v-if="images.length > 0" class="card">
    <div v-for="image in images" :key="image.id" >
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2>{{ image.title }}</h2>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-success btn-sm square"><font-awesome-icon icon="check"/></button>
          <button class="btn btn-outline-danger btn-sm square"><font-awesome-icon icon="xmark"/></button>
          <button class="btn btn-outline-warning btn-sm square"><font-awesome-icon icon="pen-to-square" /></button>
          <button class="btn btn-outline-danger btn-sm square" @click="deleteImage(image.id)"><font-awesome-icon icon="trash" /></button>
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
