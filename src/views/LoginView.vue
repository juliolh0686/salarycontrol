<template>

  <form>
      <label for="email" class="form-label">Email or Username</label>
      <input type="text" class="form-control" id="email" name="email-username" placeholder="Enter your email or username" v-model="email" bautofocus/>
      <label class="form-label" for="password">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          name="password"
          placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
          aria-describedby="password"
          v-model="password"
        />
        
        <input class="form-check-input" type="checkbox" id="remember-me" />
        <label class="form-check-label" for="remember-me"> Acuérdate de mí </label>
      
    
      <button class="btn btn-primary" type="submit" @click.prevent="login">Iniciar sesión</button>
      <button class="btn btn-primary" ><router-link to="/register">Registrarme</router-link></button>

  </form>
</template>

<script lang="ts" setup>
  import {ref} from 'vue'
  import useAuth from '@/store/auth';
  import router from '@/router'

  const store = useAuth()
  const email = ref('')
  const password = ref('')
  const feedback = ref('')

  const login = async() => {
    const response = await store.login(email.value,password.value)

    if (response == false) {
      feedback. value = "login error"
    } else {
      router.push({name: 'main'})
    }
    
  }

</script>
