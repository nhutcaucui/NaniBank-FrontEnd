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
import formaterCurrency from 'format-currency';
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
            key: 'name',
            label: 'Người gửi',
            sortable: false,
          },
          // {
          //   key: 'date',
          //   label: 'Ngày',
          //   sortable: false,
          // },
          {
            key: 'amount',
            label: 'Số tiền',
            formatter: value => {
              return formaterCurrency(value);
            },
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
        ],
        items: [
          // { isActive: true, stt: 1, sender:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"1,200,222", status:"Đã thanh toán" },
          // { isActive: false, stt: 2, sender:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"5,000", status:"Chưa thanh toán" },
          // { isActive: false, stt: 3, sender:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"2,000", status:"Đã thanh toán"  },
          // { isActive: true, stt: 4, sender:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"3,000,000", status:"Đã thanh toán"  }
        ]
      }
    },
    methods:{
     async loadData(){
        var self = this
        let config = {
                headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                params: {
                customer_id: self.$store.state.id,
                },
                }

               await axios.get(self.$store.state.host+'debt/', config).then(async response =>{
          console.log(response);
          if(response.data.Status){
            self.items = []
            for (var i =0; i < response.data.Debt.length ; i++){
               if(response.data.Debt[i].description == "Paid" || response.data.Debt[i].description == "Canceled"){
              let config2 = {
              headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                params: {
                    customer_id: response.data.Debt[i].creditor,
                },
            }
            const amount = response.data.Debt[i].amount;
            const note = response.data.Debt[i].name;
            const debtId = response.data.Debt[i].id;
            
           await axios.get(self.$store.state.host+"users/customer/info", config2).then(response2 =>{
                if(response2.data.Status){
                    let status = "Đã thanh toán"
                    if(response.data.Debt[i].description == "Canceled"){
                      status = "Đã hủy nợ"
                    }
                    self.items.push({stt: self.items.length +1 , 
                    id: response2.data.Info.debit.id, 
                    name: response2.data.Info.info.name, 
                    amount: amount, 
                    status: status, note: note,
                    debtId: debtId})
                }
  })
            }
                
            }
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