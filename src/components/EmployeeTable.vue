<template>
<div class="employee-table-container">
    <table id="employee">
          <div style="height:400px; overflow:auto;" class="scrolling-table">
  <tr>
    <th>Id</th>
    <th>Tên</th>
    <th>Email</th>
    <th>Địa chỉ</th>
    <th>Ngày sinh</th>
    <th>Tài khoản</th>
  </tr>
        
  <tr>
    <td>1</td>
    <td>Maria Anders</td>
    <td>Germany</td>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Christina Berglund</td>
    <td>Sweden</td>
    <td>Berglunds snabbköp</td>
    <td>Christina Berglund</td>
    <td>Sweden</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>4</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
  </tr>
  <tr>
    <td>5</td>
    <td>Helen Bennett</td>
    <td>UK</td>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>6</td>
    <td>Philip Cramer</td>
    <td>Germany</td>
    <td>Königlich Essen</td>
    <td>Philip Cramer</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>7</td>
    <td>Yoshi Tannamuri</td>
    <td>Canada</td>
    <td>Laughing Bacchus Winecellars</td>
    <td>Yoshi Tannamuri</td>
    <td>Canada</td>
  </tr>
  <tr>
    <td>8</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
  </tr>
  <tr>
    <td>9</td>
    <td>Simon Crowther</td>
    <td>UK</td>
    <td>North/South</td>
    <td>Simon Crowther</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>100</td>
    <td>Marie Bertrand</td>
    <td>France</td>
    <td>Paris spécialités</td>
    <td>Marie Bertrand</td>
    <td>France</td>
  </tr>
  </div>
</table>
</div>
</template>

<script>
export default {
    name: "EmployeeTable",
}
</script>

<style>
.employee-table-container{
    width: 700px;
}
#employee {
    display: block;
    float: left;
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  padding-top: 50px;
  padding-left: 20px;
}

#employee td, #employee th {
  border: 1px solid #ddd;
  padding: 8px;

}

#employee tr:nth-child(even){background-color: #f2f2f2;}

#employee tr:hover {background-color: #ddd;}

#employee th {
  padding-top: 12px;
  padding-bottom: 12px; 
  background-color: #9B82E6;
  color: black;
}

#employee th:nth-child(1){
  width: 7%;
}

#employee td:nth-child(1){
  width: 7%;
}

#employee th:nth-child(2){
  width: 20%;
}

#employee td:nth-child(2){
  width: 20%;
}

#employee th:nth-child(3){
  width: 20%;
}

#employee td:nth-child(3){
  width: 20%;
}

#employee th:nth-child(4){
  width: 20%;
}

#employee td:nth-child(4){
  width: 20%;
}

#employee th:nth-child(5){
  width: 15%;
}

#employee td:nth-child(5){
  width: 15%;
}

#employee th:nth-child(6){
  width: 18%;
}

#employee td:nth-child(6){
  width: 18%;
}

.scrolling-table::-webkit-scrollbar{
 display: none;
}
</style>