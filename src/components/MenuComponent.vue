<template>
  <div class="sidebar" :class="{close:isClose}">
    <div class="logo-details">
      <i class='bx bxl-c-plus-plus'></i>
      <span class="logo_name">Salary Control</span>
      <i class='bx bx-menu' @click="toggle()"></i>
    </div>
    <ul class="nav-links">
      <li>
        <a href="#">
          <i class='bx bx-grid-alt' ></i>
          <RouterLink to="/"><span class="link_name">Dashboard</span></RouterLink>
        </a>
        <ul class="sub-menu blank">
          <li><RouterLink class="link_name" to="/">Dashboard</RouterLink></li>
        </ul>
      </li>
      <li>
        <a href="#">
          <i class='bx bxs-bank'></i>
          <RouterLink to="/giradossiaf"><span class="link_name">Depositos</span></RouterLink>
        </a>
        <ul class="sub-menu blank">
          <li><RouterLink class="link_name" to="/giradossiaf">Depositos</RouterLink></li>
        </ul>
      </li>
      <li>
        <a href="#">
          <i class='bx bxs-business' ></i>
          <RouterLink to="/autorizaciondesc"><span class="link_name">Autorización de Descuentos</span></RouterLink>
        </a>
        <ul class="sub-menu blank">
          <li><RouterLink class="link_name" to="/autorizaciondesc">Autorización de Descuentos</RouterLink></li>
        </ul>
      </li>
      <li>
        <a href="#">
          <i class='bx bx-calculator' ></i>
          <RouterLink to="/planillas"><span class="link_name">Planillas</span></RouterLink>
        </a>
        <ul class="sub-menu blank">
          <li><RouterLink to="/planillas" class="link_name">Planillas</RouterLink></li>
        </ul>
      </li>
      <li>
        <a href="#">
          <i class='bx bx-import' ></i>
          <RouterLink to="/importacion"><span class="link_name">Importación</span></RouterLink>
        </a>
        <ul class="sub-menu blank">
          <li><RouterLink to="/importacion" class="link_name">Importación</RouterLink></li>
        </ul>
      </li>
      <li>
        <a href="#">
          <i class='bx bxs-file-import'></i>
          <RouterLink to="/importsiaf"><span class="link_name">Importación SIAF</span></RouterLink>
        </a>
        <ul class="sub-menu blank">
          <li><RouterLink to="/importsiaf" class="link_name">Importación SIAF</RouterLink></li>
        </ul>
      </li>
      <li>
        <div class="iocn-link">
          <a href="#">
            <i class='bx bx-street-view'></i>
            <span class="link_name">No Abonos</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name" href="#">No Abonos</a></li>
          <li><RouterLink to="/noabonos">Registro</RouterLink></li>
          <li><RouterLink to="/repnoabonos">Reportes</RouterLink></li>
        </ul>
      </li>
      <li>
        <div class="iocn-link">
          <a href="#">
            <i class='bx bx-book-alt' ></i>
            <span class="link_name">Reportes</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name" href="#">Reportes</a></li>
          <li><RouterLink to="/reporteconceptos">Por Conceptos</RouterLink></li>
          <li><a href="#">Submenu</a></li>
          <li><a href="#">Submenu</a></li>
        </ul>
      </li>
      <li>
        <a href="#">
          <i class='bx bx-pie-chart-alt-2' ></i>
          <RouterLink to="/declaracion"><span class="link_name">Declaración</span></RouterLink>
        </a>
        <ul class="sub-menu blank">
          <li><RouterLink to="/declaracion">Declaracion</RouterLink></li>
        </ul>
      </li>

    <li>
    <div class="profile-details">
      <div class="profile-content">
        <img src="../assets/img/profile.jpg" alt="profileImg">
      </div>
      <div class="name-job">
        <div class="profile_name">{{ nombre }}</div>
        <div class="job">UGEL 07</div>
      </div>
      <i class='bx bx-log-out' @click="salirsis()"></i>
    </div>
  </li>
</ul>
  </div>
</template>

<script setup lang="ts">

  import { ref , onMounted} from 'vue'
  import useAuth from '@/store/auth';
  import router from '@/router'

  let store = useAuth()

  let isClose = ref(true)

  let nombre = ref(store.user.split(' ')[0] +' '+ store.user.split(' ')[1])

  let toggle = () => {
    if (!isClose.value) {
      isClose.value = true;
    } else {
      isClose.value = false;
    }
  }

  let salirsis = async () => {
    const response = await store.logout()

    if (response == false) {
      alert('error')
    } else {
      alert('ok')
      router.push({name: 'login'})
    }
  }

  onMounted(() => {
    
    let arrow = document.querySelectorAll(".arrow");
    for (var i = 0; i < arrow.length; i++) {
      arrow[i].addEventListener("click", (e)=>{
        let arrowParent = e.target as HTMLIFrameElement
        let arrowParentfin = arrowParent.parentElement?.parentElement as HTMLUListElement
        arrowParentfin.classList.toggle("showMenu")
      });
    }

  })

</script>

<style scoped lang="scss">

.sidebar .logo-details .bx-menu {
  font-size: 45px;
  position:fixed;
  left: 250px;
  color: $primaryColor;
  cursor: pointer;
  float: right;
  transition: all 0.4s ease;
}

.sidebar.close .logo-details .bx-menu {
  left: 60px;
}

.sidebar {
  /* position: relative;
  top: 0;
  left: 0; */
  height: 100vh;
  width: 260px;
  background: $primaryColor;
  /* z-index: 100; */
  transition: all 0.5s ease;
  color: rgba(233,236,239,.5);
}

.nav-links {
  height: 100%;
  padding: 30px 0 150px 0;
  overflow: auto;
}

.close {
  width: 78px;
}

.sidebar .logo-details{
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
}

.sidebar .logo-details i{
  font-size: 30px;
  color: #fff;
  height: 50px;
  min-width: 78px;
  text-align: center;
  line-height: 50px;
}

.sidebar .logo-details .logo_name{
  font-size: 22px;
  color: #fff;
  font-weight: 600;
  transition: 0.3s ease;
  transition-delay: 0.1s;
}
.sidebar.close .logo-details .logo_name{
  transition-delay: 0s;
  opacity: 0;
  pointer-events: none;
}

.sidebar.close .bx-menu{
  left: 60px;
}

.sidebar .nav-links{
  height: 100%;
  padding: 30px 0 150px 0;
  overflow: auto;
}

.sidebar.close .nav-links{
  overflow: visible;
}
.sidebar .nav-links::-webkit-scrollbar{
  display: none;
}

.sidebar .nav-links li{
  position: relative;
  list-style: none;
  transition: all 0.4s ease;
}
.sidebar .nav-links li:hover{
  background: linear-gradient(90deg,rgba(59,125,221,.1),rgba(59,125,221,.088) 50%,transparent);
  border-right-color: #3b7ddd;
  color: #e9ecef;
}
.sidebar .nav-links li .iocn-link{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sidebar.close .nav-links li .iocn-link{
  display: block
}
.sidebar .nav-links li i{
  height: 50px;
  min-width: 78px;
  text-align: center;
  line-height: 50px;
  color: rgba(233,236,239,.5);
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sidebar .nav-links li.showMenu i.arrow{
  transform: rotate(-180deg);
}
.sidebar.close .nav-links i.arrow{
  display: none;
}
.sidebar .nav-links li a{
  display: flex;
  align-items: center;
  text-decoration: none;
}
.sidebar .nav-links li a .link_name{
  font-size: 15px;
  font-weight: 400;
  color: #8a8484;
  transition: all 0.4s ease;
}
.sidebar.close .nav-links li a .link_name{
  opacity: 0;
  pointer-events: none;
}
.sidebar .nav-links li .sub-menu{
  padding: 6px 6px 14px 80px;
  margin-top: -10px;
  background: #1d1b31;
  display: none;
}
.sidebar .nav-links li.showMenu .sub-menu{
  display: block;
}
.sidebar .nav-links li .sub-menu a{
  color: #fff;
  font-size: 15px;
  padding: 5px 0;
  white-space: nowrap;
  opacity: 0.6;
  transition: all 0.3s ease;
}
.sidebar .nav-links li .sub-menu a:hover{
  opacity: 1;
}
.sidebar.close .nav-links li .sub-menu{
  position: absolute;
  left: 100%;
  top: -10px;
  margin-top: 0;
  padding: 10px 20px;
  border-radius: 0 6px 6px 0;
  opacity: 0;
  display: block;
  pointer-events: none;
  transition: 0s;
}
.sidebar.close .nav-links li:hover .sub-menu{
  top: 0;
  opacity: 1;
  pointer-events: auto;
  transition: all 0.4s ease;
}
.sidebar .nav-links li .sub-menu .link_name{
  display: none;
}
.sidebar.close .nav-links li .sub-menu .link_name{
  font-size: 18px;
  opacity: 1;
  display: block;
}
.sidebar .nav-links li .sub-menu.blank{
  opacity: 1;
  pointer-events: auto;
  padding: 3px 20px 6px 16px;
  opacity: 0;
  pointer-events: none;
}
.sidebar .nav-links li:hover .sub-menu.blank{
  top: 50%;
  transform: translateY(-50%);
}
.sidebar .profile-details{
  position: fixed;
  bottom: 0;
  width: 260px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1d1b31;
  padding: 12px 0;
  transition: all 0.5s ease;
}
.sidebar.close .profile-details{
  background: none;
}

.sidebar.close .profile-details{
  width: 78px;
}
.sidebar .profile-details .profile-content{
  display: flex;
  align-items: center;
}
.sidebar .profile-details img{
  height: 52px;
  width: 52px;
  object-fit: cover;
  border-radius: 16px;
  margin: 0 14px 0 12px;
  background: #1d1b31;
  transition: all 0.5s ease;
}
.sidebar.close .profile-details img{
  padding: 10px;
}
.sidebar .profile-details .profile_name,
.sidebar .profile-details .job{
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
}
.sidebar.close .profile-details i,
.sidebar.close .profile-details .profile_name,
.sidebar.close .profile-details .job{
  display: none;
}
.sidebar .profile-details .job{
  font-size: 12px;
}
.home-section{
  position: relative;
  background: #E4E9F7;
  height: 100vh;
  left: 260px;
  width: calc(100% - 260px);
  transition: all 0.5s ease;
  padding: 12px;
}
.sidebar.close ~ .home-section{
  left: 78px;
  width: calc(100% - 78px);
}
.home-content{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}


@media screen and (max-width: 400px){
  .sidebar{
    width: 240px;
  }
  .sidebar.close{
    width: 78px;
  }
  .sidebar .profile-details{
    width: 240px;
  }
  .sidebar.close .profile-details{
    background: none;
  }
  .sidebar.close .profile-details{
    width: 78px;
  }
  .home-section{
    left: 240px;
    width: calc(100% - 240px);
  }
  .sidebar.close ~ .home-section{
    left: 78px;
    width: calc(100% - 78px);
  }
}

</style>