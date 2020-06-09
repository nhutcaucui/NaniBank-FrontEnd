<template>
<div class="transaction-table-container">
    <table id="transaction">
          <div style="height:400px; overflow:auto;" class="scrolling-table">
  <tr>
    <th>STT</th>
    <th>Người gửi</th>
    <th>Người nhận</th>
    <th>Ngày</th>
    <th>Ngân hàng</th>
    <th>Số tiền</th>
  </tr>
        
  <tr>
    <td>1</td>
    <td>Maria Anders</td>
    <td>Germany</td>
    <td>1/6/2020</td>
    <td>NaniBank</td>
    <td>1,500,000</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Maria Anders</td>
    <td>Germany</td>
    <td>1/6/2020</td>
    <td>NaniBank</td>
    <td>1,500,000</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Maria Anders</td>
    <td>Germany</td>
    <td>1/6/2020</td>
    <td>NaniBank</td>
    <td>1,500,000</td>
  </tr>
  <tr>
    <td>4</td>
    <td>Maria Anders</td>
    <td>Germany</td>
    <td>1/6/2020</td>
    <td>NaniBank</td>
    <td>1,500,000</td>
  </tr>
  <tr>
    <td>5</td>
    <td>Maria Anders</td>
    <td>Germany</td>
    <td>1/6/2020</td>
    <td>NaniBank</td>
    <td>1,500,000</td>
  </tr>
  <tr>
    <td>6</td>
    <td>Maria Anders</td>
    <td>Germany</td>
    <td>1/6/2020</td>
    <td>NaniBank</td>
    <td>1,500,000</td>
  </tr>
  <tr>
    <td>7</td>
    <td>Maria Anders</td>
    <td>Germany</td>
    <td>1/6/2020</td>
    <td>NaniBank</td>
    <td>1,500,000</td>
  </tr>
  <tr>
    <td>8</td>
    <td>Maria Anders</td>
    <td>Germany</td>
    <td>1/6/2020</td>
    <td>NaniBank</td>
    <td>1,500,000</td>
  </tr>
  <tr>
    <td>9</td>
    <td>Maria Anders</td>
    <td>Germany</td>
    <td>1/6/2020</td>
    <td>NaniBank</td>
    <td>1,500,000</td>
  </tr>
  <tr>
    <td>100</td>
    <td>Maria Anders</td>
    <td>Germany</td>
    <td>1/6/2020</td>
    <td>NaniBank</td>
    <td>1,500,000</td>
  </tr>
  </div>
</table>
<div class="total-container"><label>Tổng: </label><label id="total"></label></div>
</div>
</template>

<script>
export default {
    name: "TransactionTable",
}
</script>

<style>
.transaction-table-container{
  display: inline-block;
  margin-right: 0;
    width: 700px;
}
#transaction {
    display: block;
    float: left;
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  padding-top: 50px;
  padding-left: 20px;
}

#transaction td, #transaction th {
  border: 1px solid #ddd;
  padding: 8px;

}

#transaction tr:nth-child(even){background-color: #f2f2f2;}

#transaction tr:hover {background-color: #ddd;}

#transaction th {
  padding-top: 12px;
  padding-bottom: 12px; 
  background-color: #9B82E6;
  color: black;
}

#transaction th:nth-child(1){
  width: 7%;
}

#transaction td:nth-child(1){
  width: 7%;
}

#transaction th:nth-child(2){
  width: 20%;
}

#transaction td:nth-child(2){
  width: 20%;
}

#transaction th:nth-child(3){
  width: 20%;
}

#transaction td:nth-child(3){
  width: 20%;
}

#transaction th:nth-child(4){
  width: 15%;
}

#transaction td:nth-child(4){
  width: 15%;
}

#transaction th:nth-child(5){
  width: 20%;
}

#transaction td:nth-child(5){
  width: 20%;
}

#transaction th:nth-child(6){
  width: 18%;
}

#transaction td:nth-child(6){
  width: 18%;
}

.scrolling-table::-webkit-scrollbar{
 display: none;
}

.total-container{
  display: block;
  float: left;
  padding-left: 20px;
  padding-top: 15px;
  clear: both;
  font-weight: bold;
}
</style>