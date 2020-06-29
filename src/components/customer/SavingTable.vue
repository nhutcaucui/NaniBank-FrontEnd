<template>
<div class="saving-table-container">
          <div style="height:400px; overflow:auto;" class="scrolling-table">
            <b-table striped hover :items="items" :fields="fields" id="saving"><template>
        <button>hey</button>
      </template></b-table>
          </div>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
    name: "SavingTable",
    mounted(){
      this.loadData();
    },
    data(){
      return{
        fields: [
          {
            key: 'id',
            label: 'Mã tài khoản tiết kiệm',
            sortable: true
          },
          {
            key: 'balance',
            label: 'Số dư',
            sortable: true
          },
          
        ],
        items: [
          {id: 16964582252, balance:"1,200,222" },
          { id: 25451544584, balance:"5,000" },
          { id: 25984844994, balance:"2,000"  },
          { id: 25983664884, balance:"3,000,000"  }
        ]
      }
    },
    methods:{
      loadData(){
        var self = this
        let config = {
                headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                params: {
                id: self.$store.state.id,
                },
                }

                axios.get(self.$store.state.host+'transaction/history', config).then(response =>{
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
.saving-table-container{
  display: inline-block;
}
#saving {
    display: block;
    float: left;
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  padding-top: 50px;
  padding-left: 20px;
}

#saving td, #saving th {
  border: 1px solid #ddd;
  padding: 8px;

}

#saving tr:nth-child(even){background-color: white;}

#saving tr:hover {background-color: #ddd;}

#saving th {
  padding-top: 12px;
  padding-bottom: 12px; 
  background-color: #9B82E6;
  color: black;
}

#saving th:nth-child(1){
  width: 50%;
}

#saving td:nth-child(1){
  width: 50%;
}

#saving th:nth-child(2){
  width: 50%;
}

#saving td:nth-child(2){
  width: 50%;
}


.scrolling-table::-webkit-scrollbar{
 display: none;
}
</style>