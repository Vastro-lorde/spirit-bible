<script setup lang="ts">
import type { BibleVersion } from '../types/BibleVersions';
import { defineProps } from 'vue';
import { useBibleStore } from '../stores/bibleStore';
import { useRouter } from 'vue-router';

const router = useRouter();

// Go back to the previous page
const goToBible = () => {
  router.push('/bible');
};

const bibleStore = useBibleStore();
const setSelectedBible = bibleStore.setSelectedBible;
const saveSelectedBible = (bibleVersion: BibleVersion) => {
    setSelectedBible(bibleVersion)
    goToBible();
}

defineProps<{
    bibleVersion: BibleVersion;
}>();
</script>
<template>
    <div @click="saveSelectedBible(bibleVersion)" class=" w-48 m-4 mx-auto border border-slate-600 p-2 rounded-md hover:bg-slate-600 hover:text-white cursor-pointer">
        <p class=" text-lg font-semibold uppercase">{{ bibleVersion.abbreviation }}</p>
        <p class=" text-sm text-ellipsis">{{ bibleVersion.name }}</p>
    </div>
</template>