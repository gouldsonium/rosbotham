export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.$fbq = window.$fbq;

  nuxtApp.head.script.push({
    hid: 'facebook-pixel',
    src: 'https://connect.facebook.net/en_US/fbevents.js',
  });
  nuxtApp.vueApp.mounted(() => {
    window.fbq('init', '896755728853427');
    window.fbq('track', 'PageView');
  });
});
