<template>
  <div v-editable="blok">
    <StoryblokComponent v-for="blok in blok.body" :key="blok._uid" :blok="blok" />
  </div>
</template>
   
<script setup>
  const props = defineProps({ blok: Object });

  useSeoMeta({
    title: () => props.blok?.meta_title || 'Rosbotham Finance',
    ogTitle: () => props.blok?.meta_title || 'Rosbotham Finance',
    description: () =>  props.blok?.meta_description || "Great financial planning is not about fancy investment or hot tips. It's about who you are, what sort of life you live and what you want out of life",
    ogDescription: () =>  props.blok?.meta_description || "Great financial planning is not about fancy investment or hot tips. It's about who you are, what sort of life you live and what you want out of life",
  });

  useServerSeoMeta({
    title: () => props.blok?.meta_title || 'Rosbotham Finance',
    ogTitle: () => props.blok?.meta_title || 'Rosbotham Finance',
    description: () => props.blok?.meta_description || "Great financial planning is not about fancy investment or hot tips. It's about who you are, what sort of life you live and what you want out of life",
    ogDescription: () =>  props.blok?.meta_description || "Great financial planning is not about fancy investment or hot tips. It's about who you are, what sort of life you live and what you want out of life",
  });
</script>