<template>
<div class="transaction-table-container">
          <div style="height:400px; overflow:auto;" class="scrolling-table">
            <b-table striped hover :items="items" :fields="fields" id="debt-table">
              <template v-slot:cell(action)="">
        <b-button size="sm" class="mr-1" variant="danger">
          <b-icon-trash/>
        </b-button>
      </template>
            </b-table>
          </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
    name: "DebtTable",
    mounted(){
      this.loadData();
    },
    data(){
      return{
        fields: [
          {
            key: 'stt',
            label: 'STT',
            sortable: true
          },
          {
            key: 'sender',
            label: 'Người gửi',
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
           {
            key: 'note',
            label: 'Nội dung',
            sortable: false,
          },
          {
            key: 'status',
            label: 'Trạng thái',
            sortable: false,
          },
          
          {
            key:'action',
            label:''
          }
        ],
        items: [
          { isActive: true, stt: 1, sender:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"1,200,222", status:"Đã thanh toán" },
          { isActive: false, stt: 2, sender:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"5,000", status:"Chưa thanh toán" },
          { isActive: false, stt: 3, sender:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"2,000", status:"Đã thanh toán"  },
          { isActive: true, stt: 4, sender:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"3,000,000", status:"Đã thanh toán"  }
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
#debt-table {
    display: block;
    float: left;
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  padding-top: 50px;
  padding-left: 20px;
}

#debt-table td, #debt-table th {
  border: 1px solid #ddd;
  padding: 8px;

}

#debt-table tr:nth-child(even){background-color: white;}

#debt-table tr:hover {background-color: #ddd;}

#debt-table th {
  padding-top: 12px;
  padding-bottom: 12px; 
  background-color: #9B82E6;
  color: black;
}

#debt-table th:nth-child(1){
  width: 7%;
}

#debt-table td:nth-child(1){
  width: 7%;
}

#debt-table th:nth-child(2){
  width: 20%;
}

#debt-table td:nth-child(2){
  width: 20%;
}

#debt-table th:nth-child(3){
  width: 20%;
}

#debt-table td:nth-child(3){
  width: 20%;
}

#debt-table th:nth-child(4){
  width: 15%;
}

#debt-table td:nth-child(4){
  width: 15%;
}

#debt-table th:nth-child(5){
  width: 20%;
}

#debt-table td:nth-child(5){
  width: 20%;
}

#debt-table th:nth-child(6){
  width: 18%;
}

#debt-table td:nth-child(6){
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