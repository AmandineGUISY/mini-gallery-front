<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { type Photo } from './types/index.tsx';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCamera, faImages } from '@fortawesome/free-solid-svg-icons'

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

</script>

<template>
  <h1>Mini Gallerie</h1>
  <div v-if="images.length > 0" class="card">
    <div v-for="image in images" :key="image.id" >
      <h2 class="card-header">{{ image.title }}</h2>
      <div class="card-body">
        <img :src="`${API_BASE_URL}${image.thumbnail_url}`" :alt="image.title" />
      </div>
    </div>
  </div>
  <div v-else>
    <p>Pas d'image pour le moment !</p>
  </div>
</template>

