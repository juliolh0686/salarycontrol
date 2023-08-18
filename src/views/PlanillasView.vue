<template>
  <div>
    <h1>Listado de Planillas</h1>
    <table>
      <thead>
        <tr>
          <th>Nº</th>
          <th>Periodo</th>
          <th>Monto Bruto</th>
          <th>Descuentos</th>
          <th>liquido</th>
          <th>Aportes</th>
          <th>Descripción</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>202307</td>
          <td>12012.20</td>
          <td>12012.20</td>
          <td>12012.20</td>
          <td>12012.20</td>
          <td>Planilla desl mes de Julio 2023</td>
          <td>Activo</td>
          <td> <button class="btn btn-primary">f</button> </td>
        </tr>
        <tr>
          <td>2</td>
          <td>202307</td>
          <td>12012.20</td>
          <td>12012.20</td>
          <td>12012.20</td>
          <td>12012.20</td>
          <td>Planilla desl mes de Julio 2023</td>
          <td>Activo</td>
        </tr>
        <tr>
          <td>3</td>
          <td>202307</td>
          <td>12012.20</td>
          <td>12012.20</td>
          <td>12012.20</td>
          <td>12012.20</td>
          <td>Planilla desl mes de Julio 2023</td>
          <td>Activo</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>

table {
  //table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 14px;
  color: #6c757d;
}

table thead tr {
  height: 30px;
}

table tbody tr {
  height: 30px;
  border-bottom: 1px solid rgb(61, 63, 65);
}

thead {
  background-color: $primaryColor;
  color: #FFF;
}


</style>