<template>
<div class="debit-table-container">
          <div style="height:400px; overflow:auto;" class="scrolling-table">
            <b-table striped hover :items="items" :fields="fields" id="debit">

            </b-table>
          </div>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import formater from 'format-currency'
export default {
    name: "Debit",
    mounted(){
      this.loadData();
    },
    data(){
      return{
        fields: [
          {
            key: 'id',
            label: 'Mã tài khoản thanh toán',
            sortable: false
          },
          {
            key: 'balance',
            label: 'Số dư',
            sortable: false
          },
          
        ],
        items: [
          // {id: 16964582252, balance:"1,200,222" },
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
                owner: self.$store.state.id,
                },
                }

               await axios.get(self.$store.state.host+'debit/', config).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.items = []
            self.items.push({id: response.data.Debit.id, balance: formater(response.data.Debit.balance)})
          }
        }).catch(e =>{
          console.log(e);
        })
      }
    }
}
</script>

<style>
.debit-table-container{
  display: inline-block;

}
#debit {
    display: block;
    float: left;
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  padding-top: 50px;
  padding-left: 20px;
}

#debit td, #debit th {
  border: 1px solid #ddd;
  padding: 8px;

}

#debit tr:nth-child(even){background-color: white;}

#debit tr:hover {background-color: #ddd;}

#debit th {
  padding-top: 12px;
  padding-bottom: 12px; 
  background-color: #9B82E6;
  color: black;
}

#debit th:nth-child(1){
  width: 50%;
}

#debit td:nth-child(1){
  width: 50%;
}

#debit th:nth-child(2){
  width: 50%;
}

#debit td:nth-child(2){
  width: 50%;
}


.scrolling-table::-webkit-scrollbar{
 display: none;
}
</style>