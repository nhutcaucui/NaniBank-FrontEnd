<template>
<div class="transaction-table-container">
          <div style="height:400px; overflow:auto;" class="scrolling-table">
            <b-table striped hover :items="items" :fields="fields" id="send-table"></b-table>
          </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import formaterCurrency from 'format-currency';
export default {
  props:['bank'],
    name: "SendTable",
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
            formatter: value => {
              return formaterCurrency(value);
            },
            sortable: false,
          },
          {
            key: 'note',
            label: 'Nội dung',
            sortable: false,
          }
        ],
        items: [
          // { isActive: true, stt: 1, receiver:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"1,200,222" },
          // { isActive: false, stt: 2, receiver:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"5,000" },
          // { isActive: false, stt: 3, receiver:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"2,000"  },
          // { isActive: true, stt: 4, receiver:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"3,000,000"  }
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
                id: self.$store.state.username,
                filter: "receiver",
                },
                }

               await axios.get(self.$store.state.host + 'transaction/history/username', config).then(async response =>{
            console.log(response);
            if(response.data.Status){
                var data = response.data.Histories;
                await axios.get(self.$store.state.host + 'partner/history/username', config).then(async response2 =>{
            console.log(response2);
            if(response2.data.Status){

                Array.prototype.push.apply(data,response2.data.Histories)
                
                for(let i = 0; i< data.length; i++){
          if(data[i].type != 1 && data[i].type != 0){
            let date = 1595427524;
                if(data[i].time != null){
                  date = data[i].time
                }
              
              let bank = "NaniBank";
              if(data[i].partner_id != null){
              for(let j=0;j<self.$props.bank.length;i++){
                  if(data[i].partner_id == self.$props.bank[j].id){
                    bank = self.$props.bank[j].name
                  }
                }
              }
            self.items.push({stt: data[i].id, receiver: data[i].to_account, date: date, bank: bank, amount: data[i].amount, note: data[i].message})
          }
        }
        console.log(data)
            }})
                
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
#send-table {
    display: block;
    float: left;
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  padding-top: 50px;
  padding-left: 20px;
}

#send-table td, #send-table th {
  border: 1px solid #ddd;
  padding: 8px;

}

#send-table tr:nth-child(even){background-color: white;}

#send-table tr:hover {background-color: #ddd;}

#send-table th {
  padding-top: 12px;
  padding-bottom: 12px; 
  background-color: rgb(40, 176, 218);
  color: black;
}

#send-table th:nth-child(1){
  width: 7%;
}

#send-table td:nth-child(1){
  width: 7%;
}

#send-table th:nth-child(2){
  width: 20%;
}

#send-table td:nth-child(2){
  width: 20%;
}

#send-table th:nth-child(3){
  width: 20%;
}

#send-table td:nth-child(3){
  width: 20%;
}

#send-table th:nth-child(4){
  width: 15%;
}

#send-table td:nth-child(4){
  width: 15%;
}

#send-table th:nth-child(5){
  width: 20%;
}

#send-table td:nth-child(5){
  width: 20%;
}

#send-table th:nth-child(6){
  width: 18%;
}

#send-table td:nth-child(6){
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