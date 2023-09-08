<script setup lang="ts">
  import { ref } from 'vue';
  import { RouterLink, RouterView } from 'vue-router'
  import MenuComponent from './components/MenuComponent.vue';
  import { useRoute } from 'vue-router'
  import useAuth from '@/store/auth';
  import router from '@/router';

  const route = useRoute()

  const store = useAuth();
  const feedback = ref('')
  
  const logout= async() => {
    const response = await store.logout();
    if (response==false) {
      feedback.value='error en el logout'
    }else {
      router.push({name: 'login'})
    }
  }

</script>

<template>
  <div class="container">
    <div class="menu">
      <MenuComponent v-if="route.path != '/login' && route.path != '/register'"/>
    </div>
    <div class="central">
      <div class="navbar"></div>
      <div class="navbar-central">
        <!-- /<RouterView /> -->
      </div>
    </div>
    </div>
</template>

<style scoped>

.container {
  display: flex;
}
.central {
  width: 100%;
}

.navbar-central {
  margin: 30px;
  padding: 20px 40px;
  background-color: #fff;
}

.navbar{
  width: 100%;
  background-color: #fff;
  height: 60px;
  border-bottom: 0;
  box-shadow: 0 0 2rem 0 rgba(33,37,41,.1);
}
</style>
