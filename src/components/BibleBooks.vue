<template>
  <div class="group max-w-md rounded-lg shadow-lg bg-white overflow-hidden h-64 cursor-pointer relative">
    <!-- Header with ID and Abbreviation -->
    <div class="bg-green-700 px-6 py-4">
      <div class="flex justify-between items-center">
        <span class="text-white font-semibold">{{ bibleBook.abbreviation }}</span>
        <span class="bg-green-700 text-white px-3 py-1 rounded-full text-sm">
          ID: {{ bibleBook.id }}
        </span>
      </div>
    </div>

    <!-- Main Content -->
    <div class="p-6">
      <!-- Book Name -->
      <h2 class="text-2xl font-bold text-gray-800 mb-2">
        {{ bibleBook.name }}
      </h2>

      <!-- Long Name -->
      <div class="mt-4">
        <p class="text-gray-800 text-ellipsis w-full text-sm">
          {{ bibleBook.nameLong }}
        </p>
      </div>
    </div>

    <!-- Button (Initially hidden, shows on hover) -->
    <button 
      @click="goToChapter(bibleBook)"
      class="hidden group-hover:block mx-auto bg-green-700 text-white px-4 py-2 rounded-lg">
      Chapters
    </button>
  </div>
</template>

<script setup lang="ts">
import { useBibleStore } from '../stores/bibleStore';
import type { BibleBook } from '../types/BibleBook';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
const router = useRouter();
const bibleStore = useBibleStore();
const selectedBible = computed(() => bibleStore.selectedBible);

defineProps<{
  bibleBook: BibleBook;
}>();

// Go back to the previous page
const goToChapter = (bibleBook: BibleBook) => {
  console.log('navigating to chapters',bibleBook.name, bibleBook.id, selectedBible.value.id);
  
  router.push({ name: 'bible-book', params: { bookId: bibleBook.id, bibleId: selectedBible.value.id } });
};
</script>
