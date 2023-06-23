<template>
    <p>User View</p>
    <button type="submit" @click.prevent="logout">Logout</button>
    <p>{{ feedback }}</p>
    <RouterLink to="/login"><span>Crea una cuenta</span></RouterLink>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useAuth from '@/store/auth';
  import router from '@/router';

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

<style scoped>

.container {
  display: flex;
}
.central {
  width: 100%;
}

.navbar{
  width: 100%;
  background-color: #fff;
  height: 60px;
  border-bottom: 0;
  box-shadow: 0 0 2rem 0 rgba(33,37,41,.1);
}

</style>