<template>
    <button @click="goBack" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all ease-in-out duration-300">
      Back
    </button>
  </template>
  
  <script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router';
  import { onMounted } from 'vue';
  
  // Use `useRouter` and `useRoute` for navigation
  const router = useRouter();
  const route = useRoute();
  
  // Function to handle back navigation
  const goBack = () => {
    if (window.history.length > 1) {
      router.back(); // Navigate to the previous route
    } else {
      router.push('/'); // Fallback to home or default route
    }
  };
  
  onMounted(() => {
    console.log('Current route:', route.name);
  });
</script>
  