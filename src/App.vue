<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';

interface Photo {
  id: number;
  title: string;
  category: string;
  tags: string[];
  image_url: string;
  thumbnail_url: string;
}

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
  <div v-if="images.length > 0" class="gallery">
    <div v-for="image in images" :key="image.id" class="photo-card">
      <img :src="`${API_BASE_URL}${image.thumbnail_url}`" :alt="image.title" />
      <h2>{{ image.title }}</h2>
      <p>{{ image.category }}</p>
    </div>
  </div>
  <div v-else>
    <p>Chargement des images...</p>
  </div>
</template>

<style scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.photo-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}
</style>
