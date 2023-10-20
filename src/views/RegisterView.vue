<template>
   <div class="container-loguin">
    <div class="imagen-loguin"></div>
    <div class="form-loguin">
      <div class="container-loguin_form">
  <form action="">
    <label for="user">Usuario</label>
    <input type="text" class="inputj" name="" id="" v-model="user">
    <label for="email">Correo Electrónico</label>
    <input type="text" class="inputj" name="" id="" v-model="email">
    <label for="password">Contraseña</label>
    <input type="password" class="inputj" name="" id="" v-model="password">
    <button type="submit" class="btnj btnj-one" @click.prevent="register">Register</button>
    <button class="btnj btnj-border"><router-link to="/login" class="router-button">Tengo Usuario</router-link></button>
  </form>
  <p>{{ feedback }}</p>
</div>
      
    </div>
  
</div>
</template>

<script lang="ts" setup>

  import { ref } from 'vue';
  import useAuth from '@/store/auth';
  import router from '@/router';

  const store = useAuth();
  const user = ref('');
  const email = ref('');
  const password = ref('');
  const feedback = ref('');
  
  const register= async() => {
    feedback.value=''
    const response = await store.register(user.value,email.value,password.value);
    if (response==false) {
      feedback.value='error en el registro'
    }else {
      router.push({name: 'main'})
    }
  }

</script>

<style scoped>

.container-loguin {
  display: flex;
  height: 100vh;
}

.imagen-loguin {
  width: 50%;
  height: 100vh;
  background-image: url('../assets/img/ilustracion.jpg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position:center;
}

.form-loguin {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-loguin_form {
  width: 400px;
}

</style>