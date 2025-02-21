<template>
  <div v-editable="blok" :style="{ backgroundColor: blok.background_color?.color }">
    <img
      v-if="blok.image?.filename"
      :src="blok.image.filename + '/m/1600x0'"
      :alt="blok.image.alt"
      class="w-full h-[360px] lg:h-[450px] object-cover"
      :class="{ 'filter brightness-50': blok?.darken}"
    />
    <div class="container mx-auto py-24 sm:py-32 px-3 w-full">
      <h1 class="text-secondary font-bold mb-4 uppercase" :style="{ color: blok.headline_teaser_color?.color }">
        {{ blok.title }}
      </h1>
      <div v-html="resolvedRichText" class="prose max-w-none" :class="{'prose-invert text-white': blok.invert}"></div>
    </div>
  </div>
</template>
   
<script setup>
  const props = defineProps({ blok: Object });
  const resolvedRichText = computed(() => renderRichText(props.blok.content));
  const image = props.blok.image?.filename;

  useHead({
    title: 'Rosbotham Finance: ' + props.blok?.title,
    meta: [
      { name: 'og:title', content: 'Rosbotham Finance: ' + props.blok?.title},
      { name: 'description', content: props.blok?.teaser},
      { name: 'og:description', content: props.blok?.teaser},
      { name: 'og:image', content: image},
      { name: 'og:image:width', content: "1200"},
      { name: 'og:image:height', content: "630"},
    ]
  });
</script>