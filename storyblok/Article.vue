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

  const metaData = computed(() => {
    const image = props.blok?.image?.filename ? 'https://a.storyblok.com' + props.blok.image.filename + '/m/1200x630' : null;
    return {
      title: 'Rosbotham Finance: ' + props.blok?.title,
      ogTitle: 'Rosbotham Finance: ' + props.blok?.title, // Important: og:title
      description: props.blok?.teaser,
      ogDescription: props.blok?.teaser, // Important: og:description
      ogImage: image, // Important: og:image (full URL)
      ogImageWidth: 1200, // Important: og:image:width
      ogImageHeight: 630, // Important: og:image:height
    };
  });

  watch(
    () => props.blok,
    (newBlok) => {
      if (newBlok) { // Only update if blok is defined
        useHead({
          title: metaData.value.title, // Use the values from metaData
          meta: [
            { name: 'og:title', content: metaData.value.ogTitle },
            { name: 'description', content: metaData.value.description },
            { name: 'og:description', content: metaData.value.ogDescription },
            { name: 'og:image', content: metaData.value.ogImage },
            { name: 'og:image:width', content: metaData.value.ogImageWidth },
            { name: 'og:image:height', content: metaData.value.ogImageHeight },
          ],
        });
      }
    },
    { immediate: true } // Call initially and whenever props.blok changes
  );
</script>