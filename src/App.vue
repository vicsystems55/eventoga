<template>
  <router-view />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSeoMeta, useHead } from '@unhead/vue'

const route = useRoute()

const siteName = 'EventOga'
const defaultTitle = 'EventOga | Discover Events Near You'
const defaultDescription = 'Discover trusted events, organizers, vendors and experiences near you.'
const defaultImage = 'https://yourdomain.com/seo/default-og.jpg'

const title = computed(() => route.meta.title || defaultTitle)
const description = computed(() => route.meta.description || defaultDescription)
const image = computed(() => route.meta.image || defaultImage)
const url = computed(() => `https://yourdomain.com${route.fullPath}`)

useHead({
  title: computed(() => title.value),
  titleTemplate: `%s`,
})

useSeoMeta({
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: image,
  ogUrl: url,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: image,
})
</script>