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

  const metaData = computed(() => {
    const image = props.blok.image?.filename;
    return {
      title: 'Rosbotham Finance: ' + props.blok.title,
      ogTitle: 'Rosbotham Finance: ' + props.blok.title,
      description: props.blok.teaser,
      ogDescription: props.blok.teaser,
      ogImage: image, // Use the potentially resolved image
      ogImageWidth: 1200,
      ogImageHeight: 630,
    };
  });

  useSeoMeta(metaData.value);  // Important: Use a function that returns the computed object
  useServerSeoMeta(metaData.value); // Important: Use a function that returns the computed object
</script>