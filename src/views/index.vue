<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useDark, useToggle } from "@vueuse/core";
onMounted(() => {});
const isDark = useDark();
</script>

<template>
  <section class="text-white bg-gray-900">
    <div
      class="max-w-screen-xl px-4 py-32 mx-auto lg:flex lg:h-screen lg:items-center"
    >
      <div class="max-w-3xl mx-auto text-center">
        <h1
          class="text-3xl font-extrabold text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text sm:text-5xl"
        >
          Understand User Flow.

          <span class="sm:block"> Increase Conversion. </span>
        </h1>

        <p class="max-w-xl mx-auto mt-4 sm:text-xl sm:leading-relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
          illo tenetur fuga ducimus numquam ea!
        </p>

        <div class="flex flex-wrap justify-center gap-4 mt-8">
          <a
            class="block w-full px-12 py-3 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded cursor-pointer focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          >
            Get Started
          </a>

          <a
            class="block w-full px-12 py-3 text-sm font-medium text-white border border-blue-600 rounded cursor-pointer focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="less"></style>
