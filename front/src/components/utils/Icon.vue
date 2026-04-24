<script setup>
const props = defineProps({
  icon: {
    type: [Object, Function],
    required: true
  }
});

const isFa = props.icon?.iconName !== undefined;
</script>

<template>
  <font-awesome-icon 
    v-if="isFa" 
    :icon="icon" 
  />

  <component 
    v-else 
    :is="icon" 
  />
</template>