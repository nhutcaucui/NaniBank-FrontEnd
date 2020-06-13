<template>
<div class="transaction-table-container">
          <div style="height:400px; overflow:auto;" class="scrolling-table">
            <b-table striped hover :items="items" :fields="fields" id="transaction">
            </b-table>
          </div>

<div class="total-container"><label>Tổng: {{total}} Đ</label><label id="total"></label></div>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
    name: "TransactionTable",
    data(){
      return{
        total: '0',
        fields: [
          {
            key: 'stt',
            label: 'STT',
            sortable: true
          },
          {
            key: 'sender',
            label: 'Người gửi',
            sortable: false
          },
          {
            key: 'receiver',
            label: 'Người nhận',
            sortable: false,
          },
          {
            key: 'date',
            label: 'Ngày',
            sortable: false,
          },
          {
            key: 'bank',
            label: 'Ngân hàng',
            sortable: true,
          },
          {
            key: 'amount',
            label: 'Số tiền',
            sortable: false,
          },
        ],
        items: [
          { isActive: true, stt: 1, sender: 'Dickerson', receiver:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"1,200,222" },
          { isActive: false, stt: 2, sender: 'Larsen', receiver:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"5,000" },
          { isActive: false, stt: 3, sender: 'Geneva', receiver:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"2,000"  },
          { isActive: true, stt: 4, sender: 'Jami', receiver:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"3,000,000"  }
        ]
      }
    },
    methods:{
      loadData(){
        var self = this
        axios.get('http://35.240.195.17/users/employee', {headers:{
          timestamp: moment().unix(),
        }}).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.items = []
            //asign items
          }
        }).catch(e =>{
          console.log(e);
        })
      },
      filterByDate(startDate, endDate){
        var self = this
        axios.get('http://35.240.195.17/users/employee',{
          start: startDate,
          end: endDate,

        },
         {
           headers:{
          timestamp: moment().unix(),
        }}).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.items = []
            //asign items
          }
        }).catch(e =>{
          console.log(e);
        })
      },
      filterByBank(bank){
        var self = this
        axios.get('http://35.240.195.17/users/employee',{
          bank: bank,
        },
         {
           headers:{
          timestamp: moment().unix(),
        }}).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.items = []
            //asign items
          }
        }).catch(e =>{
          console.log(e);
        })
      }
    }
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

#transaction tr:nth-child(even){background-color: white;}

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