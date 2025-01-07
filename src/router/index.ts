import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/bible',
      name: 'bible',
      component: () => import('../views/BibleView.vue'),
      children: [
          {
            path: '',
            name: 'bible-index',
            component: () => import('../views/BooksPageView.vue'),
          },
          {
            path: ':bibleId/book/:bookId',
            name: 'bible-book',
            component: () => import('../views/ChaptersPageView.vue'),
            children: [
              {
                path: ':chapterid',
                name: 'bible-chapter',
                component: () => import('../views/VersesPageView.vue'),
              },
            ],
          },
        ],
    },
  ],
})

export default router
