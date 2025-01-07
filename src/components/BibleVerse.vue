<script setup lang="ts">
defineProps<{
    verse:  string;
  }>();

</script>


<template>
    <div class="p-2">
      <p v-if="verse" class="">{{ verse }}</p>
    </div>
  </template>
  
  