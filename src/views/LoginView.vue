<template>
  <div class="container-loguin">
    <div class="imagen-loguin"></div>
    <div class="form-loguin">
      <div class="container-loguin_form">
        <form>
          <label for="email" class="form-label">Correo Electronico</label>
          <input type="text" class="inputj" id="email" name="email-username" placeholder="Enter your email or username" v-model="email" bautofocus/>
          <label class="form-label" for="password">Contraseña</label>
            <input type="password" id="password" class="inputj" name="password" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" aria-describedby="password" v-model="password"/>
            <input class="form-check-input" type="checkbox" id="remember-me" />
            <label class="form-check-label" for="remember-me"> Acuérdate de mí </label>
        
          <button class="btnj btnj-one" type="submit" @click.prevent="login">Iniciar sesión</button>
          <button class="btnj btnj-three"><router-link to="/register" class="router-button">Registrarme</router-link></button>
        </form>
      </div>
      
    </div>
  
</div>
</template>

<script lang="ts" setup>
  import {ref} from 'vue'
  import useAuth from '@/store/auth';
  import router from '@/router'
  import Swal from 'sweetalert2'

  const store = useAuth()
  const email = ref('')
  const password = ref('')

  const login = async() => {

    try {

      const response = await store.login(email.value,password.value)

      if (response.status == false) {
        if(response.errors) {
          let msgemail = response.errors.email ? response.errors.email : '';
          let msgpassword = response.errors.password ? response.errors.password : '';
          Swal.fire({
            icon: 'error',
            html: msgemail+'<br>'+msgpassword,
          })
        }else {
          Swal.fire({
            icon: 'error',
            html: response.message,
          })
        }
        
      } else {
        Swal.fire({
            icon: 'success',
            html: response.message,
        })
        router.push({name: 'main'})
      }

    } catch (error) {
      alert(error)
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
