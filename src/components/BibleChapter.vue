<template>
    <div @click="goToVerse(bibleChapter)" class="group max-w-md rounded-lg shadow-lg bg-white overflow-hidden h-max cursor-pointer relative">
      <!-- Header with ID and Abbreviation -->
      <div class="bg-green-700 px-6 py-4">
        <div class="flex justify-between items-center">
          <span class="text-white font-semibold">{{ bibleChapter.number }}</span>
          <span class="bg-green-700 text-white px-3 py-1 rounded-full text-sm">
            {{ bibleChapter.id }}
          </span>
        </div>
        <slot />
      </div>    
    </div>
  </template>
  
  <script setup lang="ts">
  import { useBibleStore } from '../stores/bibleStore';
  import { useRouter } from 'vue-router';
  import { computed } from 'vue';
import type { BibleChapters } from '../types/BibleChapters';
  const router = useRouter();
  const bibleStore = useBibleStore();
  const selectedBible = computed(() => bibleStore.selectedBible);
  
  defineProps<{
    bibleChapter: BibleChapters;
  }>();
  
  // Go back to the previous page
  const goToVerse = (bibleChapter: BibleChapters) => {
    console.log('navigating to chapters',bibleChapter.bookId, bibleChapter.bibleId, selectedBible.value.id);
    
    router.push({ name: 'bible-chapter', params: { bookId: bibleChapter.bookId, bibleId: selectedBible.value.id, chapterid: bibleChapter.id } });
  };
  </script>
  