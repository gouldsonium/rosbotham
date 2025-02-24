<script setup>
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';
import axios from 'axios';

const props = defineProps({ blok: Object });
const resolvedRichText = computed(() => renderRichText(props.blok.text));

const agreed = ref(false);

const first_name = ref('');
const last_name = ref('');
const email = ref('');
const phone = ref('');
const country = ref('');
const selectedAreas = ref([]);
const call = ref('');
const message = ref('');

const areasOfInterest = [
  "Financial_planning",
  "Retirement_planning",
  "Investment_advice",
  "Repatriation_planning",
  "Wills",
  "Pension_insurance",
  "Tax"
];

const createLabel = (area) => {
  if(area == 'Pension_insurance'){
    return 'Pension planning';
  }
  const arr = area.split('_')
  return arr.join(' ')
}

const resetForm = () => {
  first_name.value = '';
  last_name.value = '';
  country.value = '';
  phone.value = '';
  email.value = '';
  message.value = '';
  call.value = '';
  selectedAreas.value = []
}

const submitForm = async () => {
  if(agreed.value == false){
    window.alert("Please agree to our privacy policy");
    return;
  }

  let leadSource;
  if (process.client) {
    leadSource = localStorage.getItem('source');
  }

  const API = process.env.NODE_ENV == 'development' ? 'http://localhost:3001' : 'https://ugilrn1h2k.execute-api.eu-west-2.amazonaws.com/dev';

  const body = {
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
    phone: phone.value,
    country: country.value,
    areas: selectedAreas.value,
    call: call.value,
    description: message.value,
    lead_source: leadSource,
  };

  try {
    const res = await axios.post(API + '/book', body);
    console.log(res.data);
    resetForm()
    await navigateTo({ path: '/success'});
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};
</script>

<template>
  <section :style="{ backgroundColor: blok.background_color?.color }" class="px-6 lg:px-8 py-24 sm:py-32 relative">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 container mx-auto place-items-center">
      <div class="text-center sm:text-left">
        <h2 class="font-semibold uppercase">{{ blok?.title || 'Book a Meeting' }}</h2>
        <div v-if="!!blok?.text" v-html="resolvedRichText" class="max-w-none prose mt-5"
          :class="{ 'prose-invert text-white': blok.invert, 'text-center': blok?.text_center }"></div>
          <div class="hidden sm:block">
            <img src="https://a.storyblok.com/f/247081/940x887/82f70cfab3/rosbotham-icon.png" alt="logo-circle" class="my-10"
              style="max-height: 350px;">
          </div>
      </div>
      <div class="row-span-2">
        <p class="mb-5 text-center sm:text-center">Please fill out the form below to book a meeting</p>
        <form @submit.prevent="submitForm" method="POST" action="/success" class="mx-auto max-w-xl">
          <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label for="first-name" class="block text-sm font-semibold leading-6">First name</label>
              <div class="mt-2.5">
                <input required type="text" name="first-name" id="first-name" autocomplete="given-name" v-model="first_name"
                  class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label for="last-name" class="block text-sm font-semibold leading-6">Last name</label>
              <div class="mt-2.5">
                <input required type="text" name="last-name" id="last-name" autocomplete="family-name" v-model="last_name"
                  class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="email" class="block text-sm font-semibold leading-6">Email</label>
              <div class="mt-2.5">
                <input required type="email" name="email" id="email" autocomplete="email" v-model="email"
                  class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="phone-number" class="block text-sm font-semibold leading-6">Phone number</label>
              <div class="mt-2.5">
                <input required type="text" name="phone-number" id="phone-number" autocomplete="tel" v-model="phone"
                  class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="country" class="block text-sm font-semibold leading-6">Country</label>
              <div class="mt-2.5">
                <input required type="text" name="country" id="country" autocomplete="organization" v-model="country"
                  class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-semibold leading-6">Areas of Interest</label>
                <div class="mt-2.5 grid grid-cols-1 lg:grid-cols-2 gap-x-3">
                  <div class="space-y-2" v-for="area in areasOfInterest" :key="area">
                    <label class="mr-3">
                      <input type="checkbox" v-model="selectedAreas" :value="area" class="rounded text-secondary shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-100" />
                      {{ createLabel(area) }}
                    </label>
                  </div>
                </div>
              </div>
            <div class="sm:col-span-2">
              <label for="call" class="block text-sm font-semibold leading-6">Best time to call</label>
              <div class="mt-2.5">
                <select required type="text" name="call" id="call" autocomplete="organization" v-model="call"
                  class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6">
                  <option :value="''" selected hidden disabled></option>
                  <option value="Before 9:00 (CET)">Before 9:00 (CET)</option>
                  <option value="Midday (CET)">Midday (CET)</option>
                  <option value="After 17:00 (CET)">After 17:00 (CET)</option>
                </select>
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="message" class="block text-sm font-semibold leading-6">Message</label>
              <div class="mt-2.5">
                <textarea name="message" id="message" rows="4" v-model="message"
                  class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary  sm:text-sm sm:leading-6" />
              </div>
            </div>
            <SwitchGroup as="div" class="flex gap-x-4 sm:col-span-2">
              <div class="flex h-6 items-center">
                <Switch v-model="agreed"
                  :class="[agreed ? 'bg-secondary' : 'bg-gray-200', 'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600']">
                  <span class="sr-only">Agree to policies</span>
                  <span aria-hidden="true"
                    :class="[agreed ? 'translate-x-3.5' : 'translate-x-0', 'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out']" />
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
            <button type="submit" class="w-full btn py-2 rounded-full border-none hover:opacity-75"
              style="background-color: #10336e;">
              Talk with Rosbotham Finance
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>