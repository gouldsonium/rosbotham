<script setup>
  const props = defineProps({ blok: Object });
</script>

<template>
  <section class="out-box" v-editable="blok" :style="{backgroundColor: blok.background_color?.color}">
    <div class="shape-box relative">
      <NuxtImg 
        class="h-full w-full object-cover absolute brightness-50" 
        :src="blok.background_image?.filename" provider="storyblok"
        placeholder 
      />
      <div class="image-box">
        <div class="grid grid-cols-1 lg:grid-cols-3 z-10 w-full py-6 px-5 min-h-full container py-48">
          <div class="text-white flex flex-col justify-center px-16 sm:px-24 lg:col-span-2" :class="blok.text_position">
            <h1 class="font-bold mb-3 uppercase">{{ blok?.title || 'Page Title' }}</h1>
            <p class="font-light">{{ blok?.text }}</p>
            <div class="mt-10 flex" v-if="blok?.buttons">
              <StoryblokComponent
                class="text-lg"
                v-for="blok in blok.buttons"
                :key="blok._uid"
                :blok="blok"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
/* Add a style rule to control the image visibility */

.out-box{
  width: 100%;
  overflow: hidden;
}
.shape-box{
	border-bottom-left-radius: 100% 250px;
	border-bottom-right-radius: 100% 250px;
	width: calc(100% + 100px) ;
	margin-left: -50px;
  overflow: hidden;
  border-bottom: solid 20px #00ccff;
}
.image-box{
  min-height: 700px;
  width: 100%;
  display: flex;
  justify-content: center;
}

</style>

