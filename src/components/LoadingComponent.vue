<template>
  <div id="capaFondo" :style="{ visibility: isVisible ? 'visible' : 'hidden' }">
    <div class="lds-facebook">
      <span class="text-carga">{{text}}</span>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">

const { isVisible, text } = defineProps(['isVisible', 'text']);

</script>

<style scoped>

.lds-facebook {
    display: inline-block;
    position: relative;
    width: 200px;
    height: 80px;
    left: 50%;
    top: 50%;
  }

  .lds-facebook div {
    display: inline-block;
    position: absolute;
    left: 28px;
    width: 12px;
    background: white;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }

  .lds-facebook div:nth-child(1) {
    left: 28px;
    animation-delay: -0.24s;
  }

  .lds-facebook div:nth-child(2) {
    left: 52px;
    animation-delay: -0.12s;
  }

  .lds-facebook div:nth-child(3) {
    left: 76px;
    animation-delay: 0;
  }

  @keyframes lds-facebook {
    0% {
      top: 8px;
      height: 64px;
    }
    50%, 100% {
      top: 24px;
      height: 32px;
    }
  }

#capaFondo{
    visibility:hidden;
    position:absolute;
    padding:0px;
    left:0px;
    top:0px;
    right:0px;
    bottom:0px;
    background-color: #706e6e7a;
    background-repeat:repeat;
    width:100%;
    height:100%;
    z-index:10000;
  }

  .text-carga {
    position: absolute;
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
    width: 200px;
    top: -20px;
    left: -30px;
  }

</style>
