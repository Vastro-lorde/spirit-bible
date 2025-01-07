<template>
    <h1 class=" font-bold text-2xl text-green-600">Book of {{ selectedBook?.name }}</h1>
    <div class="">
        <div class="p-4">
            <GoBack />
        </div>
        
        <div>
            <p v-if="!chapters.length">No chapters found.</p>   
        </div>
        <div v-show="!isVersesRoute" class="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
            <BibleChapter v-for="chapter in chapters" :key="chapter.id" :bibleChapter="chapter"> 
                
            </BibleChapter>
           
        </div>
        <div v-show="isVersesRoute" class="p-4 h-max">
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { BibleChapters } from '../types/BibleChapters';
import { useBibleStore } from '../stores/bibleStore';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getChapters } from '../services/apiServices';
import type { BibleBook } from '../types/BibleBook';
import BibleChapter from '../components/BibleChapter.vue';
import GoBack from '../components/GoBack.vue';

// useBackButton();
const route = useRoute();
const bookId = ref('');
const bibleId = ref('');
const bibleStore = useBibleStore();
const chapters = ref<BibleChapters[]>([]);
const bibleChapters = computed<Record<string, BibleChapters[]>>(() => bibleStore.bibleChapters);
const selectedBook = ref<BibleBook>();
const books = computed<BibleBook[]>(() => bibleStore.bibleVersionBooks);
const isVersesRoute = computed(() => {
    return route.name === 'bible-chapter'; 
});

console.log(bibleChapters.value);



onMounted(() => {
    bookId.value = Array.isArray(route.params.bookId) ? route.params.bookId[0] : route.params.bookId;
    bibleId.value = Array.isArray(route.params.bibleId) ? route.params.bibleId[0] : route.params.bibleId;
    selectedBook.value = books.value.find((book) => book.id === bookId.value);

    if (!bibleChapters.value[bookId.value]) {
        getChapters(bibleId.value, bookId.value)
            .then((data) => {
                console.log(data);
                chapters.value = data.data;
            })
            .catch((err) => {
                console.error(err);
            });
        
    }else {
        chapters.value = bibleChapters.value[bookId.value];
    }
});
</script>