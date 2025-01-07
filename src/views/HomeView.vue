<script setup lang="ts">
import { computed, ref } from 'vue';
import BibleVersions from '../components/BibleVersions.vue';
import { getBibles } from '../services/apiServices';
import type { BibleVersion } from '../types/BibleVersions';
import { useBibleStore } from '../stores/bibleStore';

let bibles = ref<BibleVersion[]>([]);
const loading = ref(true); // Loading state
const error = ref<string | null>(null); // Error state
const bibleStore = useBibleStore();
const setBibleVersions = bibleStore.setBibleVersions;
const selectedBibleVersion = ref<BibleVersion | null>(null);

// Set selectedBibleVersion if it exists in the store
if (bibleStore.selectedBible) {
  selectedBibleVersion.value = bibleStore.selectedBible;
}

// Fetch Bible versions if not already in the store
if (bibleStore.bibleVersions?.length) {
  bibles = computed(()=> bibleStore.bibleVersions) ;
  loading.value = false; // Stop loading since data is already present
} else {
  getBibles()
    .then((result) => {
      console.log(result.data);
      bibles.value = result.data.map((version: { name: any; abbreviation: any; id: any; }) => ({
        name: version.name,
        abbreviation: version.abbreviation,
        id: version.id,
      }));
      setBibleVersions(bibles.value); // Cache data in the store
    })
    .catch((err) => {
      console.error(err);
      error.value = 'Failed to load Bible versions.';
    })
    .finally(() => {
      loading.value = false; // Stop loading when done
    });
}
</script>


<template>
  <main class=" p-4">

    <p 
      class="w-max mx-auto font-semibold" 
      v-show="selectedBibleVersion">
      Selected Bible version: 
      <span class=" text-green-700">{{ selectedBibleVersion?.name }}</span></p>
    <h1 class="w-max mx-auto font-semibold uppercase">Supported Bible Versions</h1>
     <!-- Loading state -->
     <div v-if="loading" class="text-center">
        <p>Loading Bible versions...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center text-red-500">
        <p>{{ error }}</p>
      </div>

    <div v-else class=" p-2 grid grid-cols-4 w-full">
      <div v-for="bible in bibles" :key="bible.id">
        <div v-if="bible">
          <BibleVersions :bibleVersion="bible" />
        </div>
        <div v-else>
          <p>Error loading this Bible version.</p>
        </div>
      </div>
      
    </div>
    
  </main>
</template>
