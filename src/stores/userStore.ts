import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = ref({})
  function setUser(user) {
    this.user = user
  }

  return { user, setUser, persist : true }
})
