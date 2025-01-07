<script setup lang="ts">
import { computed, ref } from 'vue';
import { useBibleStore } from '../stores/bibleStore';
import { useRouter } from 'vue-router';
import type { BibleBook } from '../types/BibleBook';
import { getBibleBooks } from '../services/apiServices';
import BibleBooks from '../components/BibleBooks.vue';

const router = useRouter();

// Go back to the previous page
const goBack = () => {
  router.push({ name: 'home' });
};

const loading = ref(true); // Loading state
const error = ref<string | null>(null); // Error state
const bibleStore = useBibleStore();
const setBibleBooks = bibleStore.setBibleVersionBooks;
const bibleBooks = ref<BibleBook[]>([]);
const storedBibleBooks = computed(() => bibleStore.bibleVersionBooks);

// Computed property for selectedBible
const selectedBible = computed(() => bibleStore.selectedBible);

// Default message for when no Bible is selected
const defaultMessage = ref('Please go and select a Bible version.');

const displayedName = computed(() =>
  selectedBible.value ? `${selectedBible.value.name} Bible` : defaultMessage.value
);

// Fetch Bible books only if not already stored
if (!storedBibleBooks?.value?.length) {
  getBibleBooks(selectedBible.value?.id)
    .then((data) => {
      console.log(data);
      bibleBooks.value = data.data;
      setBibleBooks(bibleBooks.value);
    })
    .catch((err) => {
      console.error(err);
      error.value = 'Failed to load Bible books.';
    })
    .finally(() => {
      loading.value = false; // Stop loading when done
    });
} else {
  bibleBooks.value = storedBibleBooks.value;
  loading.value = false;
}
</script>
<template>
    <main class="text-center">
      <!-- Display selected Bible or default message -->
      <h1 v-if="selectedBible" class="w-max mx-auto font-semibold uppercase">
        {{ displayedName }}
      </h1>
      <div v-else>
        <h1 class="text-gray-500">
          {{ defaultMessage }}
        </h1>
        <button @click="goBack" class="mt-4 px-4 py-2 bg-slate-500 text-white rounded">
          Back
        </button>
      </div>

        <!-- Loading state -->
        <div v-if="loading" class="text-center">
            <p>Loading Bible books...</p>
        </div>

        <!-- Error state -->
        <div v-if="error" class="text-center">
            <p class="text-red-500">{{ error }}</p>
        </div>
        
        <!-- Display Bible books -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            <BibleBooks v-for="bibleBook in bibleBooks" :key="bibleBook.id" :bibleBook="bibleBook" />
        </div>
    </main>
</template>