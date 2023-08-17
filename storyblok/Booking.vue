<script setup>
  import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';
  const props = defineProps({ blok: Object });
  const resolvedRichText = computed(() => renderRichText(props.blok.text));

  const agreed = ref(false);
</script>

<template>
  <section :style="{backgroundColor: blok.background_color?.color}" class="px-6 lg:px-8 py-24 sm:py-32">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 container mx-auto place-items-center">
      <div>
        <h2 class="font-semibold">{{ blok?.title || 'Book a Meeting' }}</h2>
        <div v-if="!!blok?.text" v-html="resolvedRichText" class="max-w-none prose mt-5"
        :class="{ 'prose-invert': blok.invert, 'text-center' : blok?.text_center}"></div>
      </div>
      <div class="row-span-2">
        <p class="mb-5">Please fill out the form below to book a meeting</p>
        <form action="#" method="POST" class="mx-auto max-w-xl">
          <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label for="first-name" class="block text-sm font-semibold leading-6 ">First name</label>
              <div class="mt-2.5">
                <input type="text" name="first-name" id="first-name" autocomplete="given-name" />
              </div>
            </div>
            <div>
              <label for="last-name" class="block text-sm font-semibold leading-6 ">Last name</label>
              <div class="mt-2.5">
                <input type="text" name="last-name" id="last-name" autocomplete="family-name" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="company" class="block text-sm font-semibold leading-6 ">Company</label>
              <div class="mt-2.5">
                <input type="text" name="company" id="company" autocomplete="organization" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="email" class="block text-sm font-semibold leading-6 ">Email</label>
              <div class="mt-2.5">
                <input type="email" name="email" id="email" autocomplete="email" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="phone-number" class="block text-sm font-semibold leading-6 ">Phone number</label>
              <div class="mt-2.5">
                <input type="number" name="phone-number" id="phone-number" autocomplete="tel" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="message" class="block text-sm font-semibold leading-6 ">Message</label>
              <div class="mt-2.5">
                <textarea name="message" id="message" rows="4" class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary  sm:text-sm sm:leading-6" />
              </div>
            </div>
            <SwitchGroup as="div" class="flex gap-x-4 sm:col-span-2">
              <div class="flex h-6 items-center">
                <Switch v-model="agreed" :class="[agreed ? 'bg-secondary' : 'bg-gray-200', 'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600']">
                  <span class="sr-only">Agree to policies</span>
                  <span aria-hidden="true" :class="[agreed ? 'translate-x-3.5' : 'translate-x-0', 'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out']" />
                </Switch>
              </div>
              <SwitchLabel class="text-sm leading-6 text-gray-600">
                By selecting this, you agree to our
                {{ ' ' }}
                <NuxtLink to="/privacy-policy" class="font-semibold text-secondary">privacy&nbsp;policy</NuxtLink>.
              </SwitchLabel>
            </SwitchGroup>
          </div>
          <div class="mt-10 w-full">
            <button type="submit" class="w-full btn py-2 rounded-full border-none hover:opacity-75" style="background-color: #10336e;">
              Talk with Rosbotham Finance
            </button>
          </div>
        </form>
      </div>
      <div class="hidden sm:block">
        <img src="https://a.storyblok.com/f/246531/800x540/4731e1851e/placeholder.png" alt="">
      </div>
    </div>
  </section>
</template>

<style scoped>
input{
  @apply block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary  sm:text-sm sm:leading-6
}
</style>