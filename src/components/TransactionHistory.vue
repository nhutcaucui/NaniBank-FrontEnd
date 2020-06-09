<template>
    <div class="transaction-history">
        
        <TransactionTable/>

        <div class="filter-box">
    <label>Lọc lịch sử</label><br/>
    <form>
        <input type="radio" id="date" name="type" value="date">
        <label for="date">Theo ngày</label><br>
        <datepicker :format="customFormatter" placeholder="Từ ngày"></datepicker>
        <datepicker :format="customFormatter" placeholder="Đến ngày"></datepicker>
        <input type="radio" id="bank" name="type" value="bank">
        <label for="bank">Theo ngân hàng</label><br>
        <select name="bank" id="bank-select" class="text-input">
  <option value="NaniBank">NaniBank</option>
  <option value="KiantoBank">KiantoBank</option>
</select>
    <br/>
    <button class="submit-button" id="submit-filter">Lọc</button>
    </form>
    </div>
    </div>
</template>

<script>
import moment from 'moment';
import TransactionTable from './TransactionTable';
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
export default {
    name: 'TransactionHistory',
    components:{
        TransactionTable,
        Datepicker
    },
    methods: {
    customFormatter(date) {
      return moment(date).format('DD/MM/yyyy');
    }
  }
}
</script>

<style>
.filter-box{
    padding-top: 10px;
    margin-top: 80px;
    margin-left: 50px;
    height: 350px;
    width: 350px;
    display: block;
    float:left;
    background: white;
    box-shadow: 0 0 4px;
}
.filter-box label{
    color: black;
    font-size: 18px;
  font-weight: bold;
}


.vdp-datepicker{
margin: 0 auto;
text-align:center !important;
}
.text-input, .vdp-datepicker input{
  box-sizing : border-box;
  margin-top: 15px;
    padding-top: 6px;
    transition: all 0.2s ease-in-out 0s;
    font-size: 16px;
    border: 1px solid #bebcc4;
    display: inline-block;
    width: 250px;
    height: 34px;
    padding: 6px 12px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
}

.text-input:focus, .vdp-datepicker input:focus{
  outline: none;
  border: 1px solid #704DDC;
}

.submit-button{
    margin-top: 15px;
    width: 75%;
    height: 40px;
    border-radius: 20px;
    background: #5B3693;
    border: 1px solid #5b3693;
    color: white;
    font-size: 18px;
    transition: 0.3s ease-out;
}
.submit-button:focus{
    outline: none;
}
.submit-button:hover{
    background: #7B5EA8;
    border: 1px solid #7B5EA8;
}

.filter-box input[type="radio"]{
    margin-top: 15px;

}


</style>