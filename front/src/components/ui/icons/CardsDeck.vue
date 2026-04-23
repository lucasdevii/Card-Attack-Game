<template>
<svg width="120" height="100" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">

  <defs>
    <!-- máscara da carta do meio -->
    <mask id="mask-middle">
      <rect width="100%" height="100%" fill="white"/>
      <!-- recorte levemente maior -->
      <rect x="28" y="8" width="64" height="84" rx="10" fill="black"/>
    </mask>

    <!-- máscara da carta da frente -->
    <mask id="mask-front">
      <rect width="100%" height="100%" fill="white"/>
      <!-- recorte levemente maior -->
      <rect x="18" y="13" width="64" height="84" rx="10" fill="black"/>
    </mask>
  </defs>

  <!-- Carta de trás (não sofre máscara) -->
  <rect x="30" y="10" width="60" height="80" rx="8" fill="white"/>

  <!-- Carta do meio -->
  <g mask="url(#mask-middle)">
    <rect x="20" y="15" width="60" height="80" rx="8" fill="white"/>
  </g>

  <!-- Carta da frente -->
  <g mask="url(#mask-front)">
    <rect x="10" y="20" width="60" height="80" rx="8" fill="white"/>
  </g>

</svg>

</template>