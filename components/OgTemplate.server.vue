<script setup lang="ts">
  defineProps({
    title: String,
    description: String,
  })
</script>

<template>
  <div style="position: relative; width: 100%; height: 100%; display: flex; flex-direction: column; background: white; color: black; align-items: center; justify-content: center;">
    <div style="position: absolute; top: 4rem; left: 4rem;">
      <img src="https://comoonity.com/assets/img/logo-2x.png" style="height: 3rem; width: auto;" alt="Logo" />
    </div>
    <h1 style="max-width: 80%; font-size: 4.375rem; text-align: center; text-transparent; background-clip: text; background-image: linear-gradient(to right, #00ccff, #10336e); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
      {{ title }}
    </h1>
    <p style="font-size: 2rem; max-width: 50%;">{{ description }}</p>
    <div style="display: flex; align-items: center; position: absolute; bottom: 4rem; right: 4rem;">
      <img src="https://i.imgur.com/sFdtpA6.png" style="border-radius: 50%; height: 3rem; width: 3rem; margin-right: 1rem; object-fit: cover;" />
      <div>
        <p style="font-size: 1.5rem; font-weight: 600;">David Rosbotham</p>
        <p style="font-size: 1rem;">Founder</p>
      </div>
    </div>
  </div>
</template>
