<script setup lang="ts">
import { defineComponent } from 'vue'
defineComponent({
  name: 'Header'
})
</script>
<template >
    <nav class="flex justify-center gap-2">
        <RouterLink to="/" class=" font-semibold text-lg border rounded-md uppercase p-4">Home</RouterLink>
        <RouterLink to="/bible" class=" font-semibold text-lg border rounded-md uppercase p-4">Bible</RouterLink>
        <RouterLink to="/about" class=" font-semibold text-lg border rounded-md uppercase p-4">About</RouterLink>
    </nav>
</template>