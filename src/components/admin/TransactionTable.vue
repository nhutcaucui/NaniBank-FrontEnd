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
    mounted(){
      this.loadData();
    },
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
            label: 'Tài khoản gửi',
            sortable: false
          },
          {
            key: 'receiver',
            label: 'Tài khoản nhận',
            sortable: false,
          },
          {
            key: 'date',
            label: 'Ngày',
            formatter: value => {
              return moment.unix(value).format("DD/MM/YYYY");
            },
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
        oriItems: [
          // { isActive: true, stt: 1, sender: 'Dickerson', receiver:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"1,200,222", id:15 },
          // { isActive: false, stt: 2, sender: 'Larsen', receiver:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"5,000", id:20 },
          // { isActive: false, stt: 3, sender: 'Geneva', receiver:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"2,000", id:20 },
          // { isActive: true, stt: 4, sender: 'Jami', receiver:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"3,000,000", id:20 }
        ],
        items: [
          // { isActive: true, stt: 1, sender: 'Dickerson', receiver:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"1,200,222", id:15 },
          // { isActive: false, stt: 2, sender: 'Larsen', receiver:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"5,000", id:20 },
          // { isActive: false, stt: 3, sender: 'Geneva', receiver:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"2,000", id:20 },
          // { isActive: true, stt: 4, sender: 'Jami', receiver:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"3,000,000", id:20 }
        ]
      }
    },
    methods:{
      async loadData(){
        var self = this

        let config = {headers:{
          timestamp: moment().unix(),
          'access-token': this.$store.state.accessToken,
        },
        }

        await axios.get(self.$store.state.host + 'transaction/history/all', config).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.items = [];
            self.oriItems = [];
            for (let  i = 0; i< response.data.Histories.length; i++){
              if(response.data.Histories[i].type != 1 && response.data.Histories[i].type != 0){

                let date = 1595427524;
                if(response.data.Histories[i].time != null){
                  date = response.data.Histories[i].time
                }

                self.oriItems.push({stt: response.data.Histories[i].id, 
                sender: response.data.Histories[i].from_account,
                receiver: response.data.Histories[i].to_account,
                date: date,
                bank: "NaniBank",
                amount: response.data.Histories[i].amount
                })

                self.items.push({stt: response.data.Histories[i].id, 
                sender: response.data.Histories[i].from_account,
                receiver: response.data.Histories[i].to_account,
                date: date,
                bank: "NaniBank",
                amount: response.data.Histories[i].amount
                })
              }
            }
          }
        }).catch(e =>{
          console.log(e);
        })
      },
      async filterByDate(startDate, endDate){
        var self = this;
        self.items = [];
        for(let i = 0; i< self.oriItems.length; i++){
          if (self.oriItems[i].date >= startDate && self.oriItems[i].date <= endDate){
            self.item.push(self.oriItems[i]);
          }
        }
      },
      async filterByBank(bank){
        var self = this;
        self.items = [];
        for(let i = 0; i< self.oriItems.length; i++){
          if (self.oriItems[i].bank.toLowerCase() == bank.toLowerCase()){
            self.item.push(self.oriItems[i]);
          }
        }
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