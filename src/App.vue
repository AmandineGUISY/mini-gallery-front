<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import AddImage from './components/addImage.vue';
import { type Photo } from './types/index.ts';
import useToast from 'vue-toastification'


const API_BASE_URL = 'http://127.0.0.1:8000';

const images = ref<Photo[]>([]);
const editingImageId = ref<number | null>(null);
const newTitle = ref('');
const toast = useToast()

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
    toast.success('Image supprimé avec succés !')
    getImages();

  } catch(error) {
    console.error("Une erreur est survenue lors de la suppression d'une image", error);
    toast.error("Une erreur est survenue lors de la suppression de l'image")
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
    toast.success("Image modifié avec succés !");
    cancelEditing();
  } catch(error) {
    cancelEditing();
    console.error("Une erreur est survenue lors de la modification de l'image", error);
    toast.error("Une erreur est survenue lors de la modification");
  }
}

</script>

<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
      <h1 class="mb-0">Mini Galerie</h1>
      <AddImage @image-added="getImages" class="mb-4" />
    </div>

    <div v-if="images.length > 0" class="row g-4">
      <div v-for="image in images" :key="image.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="polaroid d-flex flex-column h-100 position-relative">
          <div class="polaroid-header d-flex justify-content-between align-items-center gap-2 w-100">
            <div class="flex-grow-1 text-truncate">
              <h6 v-if="editingImageId !== image.id" class="mb-0">{{ image.title }}</h6>
              <input v-else type="text" v-model="newTitle" class="form-control form-control-sm" @keyup.enter="updateTitle(image.id)" @keyup.esc="cancelEditing">
            </div>
            <div class="d-flex gap-1 flex-shrink-0">
              <template v-if="editingImageId === image.id">
                <button class="btn btn-outline-success btn-sm square" @click="updateTitle(image.id)">
                  <font-awesome-icon icon="check"/>
                </button>
                <button class="btn btn-outline-danger btn-sm square" @click="cancelEditing">
                  <font-awesome-icon icon="xmark"/>
                </button>
              </template>
              <template v-else>
                <button class="btn btn-outline-warning btn-sm square" @click="startEditing(image)">
                  <font-awesome-icon icon="pen-to-square"/>
                </button>
                <button class="btn btn-outline-danger btn-sm square" @click="deleteImage(image.id)">
                  <font-awesome-icon icon="trash"/>
                </button>
              </template>
            </div>
          </div>

          <img :src="`${API_BASE_URL}${image.thumbnail_url}`" :alt="image.title" class="img-fluid mt-2 flex-grow-1" />
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5">
      <p class="fs-4 text-muted">Pas d'image pour le moment !</p>
    </div>
  </div>
</template>

<style>
.square {
  width: 32px;
  height: 32px;
}

.polaroid {
  background: white;
  padding: 10px;
  border: 8px solid white;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  transition: transform 0.3s;
  border-bottom-width: 60px;
}

.polaroid:hover {
  transform: rotate(-3deg) scale(1.05);
}

.polaroid-header {
  text-align: left;
}
</style>