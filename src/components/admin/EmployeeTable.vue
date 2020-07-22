<template>
<div class="employee-table-container">

  <div style="height:400px; overflow:auto;" class="scrolling-table">
      <b-table ref="table" striped hover :items="items" :fields="fields" id="employee">
        <template v-slot:cell(action)="row">
        <b-button size="sm" class="mr-1" variant="danger" v-on:click="deleteRow(row.index)">
          <b-icon-trash/>
        </b-button>
      </template>
      </b-table>
  </div>

</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
    name: "EmployeeTable",
    mounted() {
      this.loadData();
    },
    methods:{
      async loadData(){
        var self = this
        let config ={headers:{
          timestamp: moment().format("X"),
          'access-token': this.$store.state.accessToken,
        }}
        await axios.get(self.$store.state.host+'users/employee', config).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.items = []
            for(let i =0; i< response.data.Employee.length; i++){
              self.items.push({id: response.data.Employee[i].id, username: response.data.Employee[i].username})
            }
          }
        }).catch(e =>{
          console.log(e);
        })
      },
      addRow(id, username){
          var self = this;
          self.items.push({id: id, username: username})
        
      },
      // rowClick(record, index){
      //   this.$emit('rowClick', record, index)
      // },

      async deleteRow(index){
        if(confirm("Xóa giao dịch viên?")){
        var self =this;

        let config = {
                headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken
                    },
                
              data:{
          username: self.items[index].username,
        }
        }

        await axios.delete(self.$store.state.host+'users/employee', config).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.items.splice(index, 1);
          }
        }).catch(e =>{
          console.log(e);
        })
          
        }
      }
    },
    data(){
      return{
        item: {},
        fields: [
          {
            key: 'id',
            label: 'Id',
            sortable: true
          },
          {
            key: 'username',
            label: 'Tài khoản',
            sortable: false,
          },
          {
            key:'action',
            label:''
          }
        ],
        items: [
          // {id: 1, ho_ten: 'Dickerson', email:'gg@gg', sdt: '094335498', username:"dickcock" },
          // {id: 2, ho_ten: 'Larsen', email:'gg@gg',sdt: '033545699', username:"larva" },
          // {id: 3, ho_ten: 'Geneva', email:'gg@gg', sdt: '09746546', username:"havana"},
          // {id: 4, ho_ten: 'Jami', email:'gg@gg',sdt: '152485458', username:"james"}
        ]
      }
    },
}
</script>

<style>
.employee-table-container{
  display: inline-block;
    width: 700px;
}
#employee {
    display: block;
    float: left;
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  padding-top: 50px;
  padding-left: 20px;
}

#employee td, #employee th {
  border: 1px solid #ddd;
  padding: 8px;

}

#employee td:focus, #employee th:focus {
  outline: none;

}

#employee tr:nth-child(even){background-color:white;}

#employee tr:hover {background-color: #ddd;}

#employee th {
  padding-top: 12px;
  padding-bottom: 12px; 
  background-color: #9B82E6;
  color: black;
}

#employee th:nth-child(1){
  width: 7%;
}

#employee td:nth-child(1){
  width: 7%;
}

#employee th:nth-child(2){
  width: 20%;
}

#employee td:nth-child(2){
  width: 20%;
}

#employee th:nth-child(3){
  width: 4%;
}

#employee td:nth-child(3){
  width: 4%;
}

#employee th:nth-child(4){
  width: 20%;
}

#employee td:nth-child(4){
  width: 20%;
}

#employee th:nth-child(5){
  width: 19%;
}

#employee td:nth-child(5){
  width: 19%;
}

#employee th:nth-child(6){
  width: 20%;
}

#employee td:nth-child(6){
  width: 20%;
}

.scrolling-table::-webkit-scrollbar{
 display: none;
}
</style>