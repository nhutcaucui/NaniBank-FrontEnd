<template>
<div class="transaction-table-container">
          <div style="height:400px; overflow:auto;" class="scrolling-table">
            <b-table ref='table' striped hover :items="items" :fields="fields" id="debt-table-received" @row-clicked="rowClick">
              <template v-slot:cell(action)="row">
        <b-button size="sm" class="mr-1" variant="danger" v-if="row.item.status=='Chưa thanh toán'" @click ="setSelectedIndex(row.index)" v-b-modal="'reason-modal'">
          <b-icon-trash/>
        </b-button>
      </template>
            </b-table>
          </div>

          <b-modal id="reason-modal" title="Hủy nợ" @ok="cancelRow()">
      <textarea style="width: 100%" placeholder="Lí do" v-model="reason"/>
  </b-modal>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import formaterCurrency from 'format-currency'
export default {
    name: "DebtTableReceived",
    mounted(){
      this.loadData();
    },
    data(){
      return{
        reason:'',
        selectedIndex:-1,
        fields: [
          {
            key: 'stt',
            label: 'STT',
            sortable: true
          },
          {
            key: 'id',
            label: 'Mã tài khoản',
            sortable: false,
          },
          {
            key: 'name',
            label: 'Người gửi',
            sortable: false,
          },
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
            sortable: true,
          },
          {
            key:'action',
            label:''
          }
        ],
        items: [
          // { stt: 1, id:13545684415, name: '1/adasd/1990', amount:"1,200,222", status:"Đã thanh toán" , note:"hey" },
          // {  stt: 2, id:1352684415, name: '1/1/asd', amount:"5,000", status:"Chưa thanh toán", note:"gib money" },
          // {  stt: 3, id:13545684415, name: '1/1/sdada', amount:"2,000", status:"Hủy bỏ" , note: "send cash" },
          // {  stt: 4, id:135451585, name: '1/1/19sada90', amount:"3,000,000", status:"Đã thanh toán"  }
        ]
      }
    },
    methods:{
      setSelectedIndex(index){
        this.selectedIndex=index;
        
      },
      rowClick(record, index){
        if(record.status == "Chưa thanh toán"){
          this.$emit('rowClick', record, index)
        }
      },
      dealRow(index){
        this.items[index].status='Đã thanh toán'
      },
     async cancelRow(){
        var self = this
        let config = {
                headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken
                    },
                
              data :{
                id: self.items[self.selectedIndex].debtId,
                delete_message: self.reason
              }
        }

               await axios.delete(self.$store.state.host+'debt/', config).then(response =>{
                    console.log(response)
                    if(response.data.Status){
                       this.items[this.selectedIndex].status='Hủy bỏ';
                       self.$socket.emit("send-message", {from: self.$store.state.id, to: self.items[self.selectedIndex].from, message: self.reason, type:"Hủy nợ"})
                        self.reason = ""
                    }
                })
      },
     async loadData(){
        var self = this
        let config = {
                headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                params: {
                customer_id: self.$store.state.id,
                //filter: "sender"
                },
                }

               await axios.get(self.$store.state.host+'debt/', config).then(async response =>{
          console.log(response);
          if(response.data.Status){
            self.items = []
            for (var i =0; i < response.data.Debt.length ; i++){
              console.log(response.data.Debt[i])
            if(response.data.Debt[i].debtor == self.$store.state.id && response.data.Debt[i].description != "Paid"){
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

                    self.items.push({stt: self.items.length +1 , 
                    id: response2.data.Info.debit.id, 
                    name: response2.data.Info.info.name, 
                    amount: amount, 
                    status:"Chưa thanh toán", note: note,
                    debtId: debtId,
                     from: response.data.Debt[i].creditor})
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
#debt-table-received {
    display: block;
    float: left;
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  padding-top: 50px;
  padding-left: 20px;
}

#debt-table-received td, #debt-table-received th {
  border: 1px solid #ddd;
  padding: 8px;

}

#debt-table-received tr:nth-child(even){background-color: white;}

#debt-table-received tr:hover {background-color: #ddd;}

#debt-table-received th {
  padding-top: 12px;
  padding-bottom: 12px; 
  background-color: #9B82E6;
  color: black;
}

#debt-table-received th:nth-child(1){
  width: 7%;
}

#debt-table-received td:nth-child(1){
  width: 7%;
}

#debt-table-received th:nth-child(2){
  width: 20%;
}

#debt-table-received td:nth-child(2){
  width: 20%;
}

#debt-table-received th:nth-child(3){
  width: 20%;
}

#debt-table-received td:nth-child(3){
  width: 20%;
}

#debt-table-received th:nth-child(4){
  width: 15%;
}

#debt-table-received td:nth-child(4){
  width: 15%;
}

#debt-table-received th:nth-child(5){
  width: 20%;
}

#debt-table-received td:nth-child(5){
  width: 20%;
}

#debt-table-received th:nth-child(6){
  width: 18%;
}

#debt-table-received td:nth-child(6){
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