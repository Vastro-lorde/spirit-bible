import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { BibleVersion } from '@/types/BibleVersions'
import type { BibleBook } from '@/types/BibleBook';
import type { BibleChapters } from '@/types/BibleChapters';
import { getBookChaptersHelper } from '@/services/apiServices';

export const useBibleStore = defineStore('BibleStore', {
  state: () => ({
    selectedBible: null as BibleVersion | null,
    bibleVersions: null as BibleVersion[] | null,
    bibleVersionBooks: null as BibleBook[] | null,
    bibleChapters: null as { string: BibleChapters[]} | null,

  }),
  actions: {
    setSelectedBible(bible: BibleVersion) {
      this.selectedBible = bible;
      this.bibleVersionBooks = null;
    },
    setBibleVersions(bibles : BibleVersion[]){
      this.bibleVersions = bibles;
    },
    async setBibleVersionBooks(books : BibleBook[]){
      this.bibleVersionBooks = books;
      getBookChaptersHelper(this.selectedBible!.id, books.map(book => book.id))
      .then(chapters => {
        this.bibleChapters = chapters;
      })
      .catch(error => console.error('Error fetching Bible Chapters:', error)); 
    },
  },
  persist: true
})