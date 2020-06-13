<template>
<div class="employee-table-container">

  <div style="height:400px; overflow:auto;" class="scrolling-table">
      <b-table ref="table" striped hover :items="items" :fields="fields" id="employee" @row-clicked="rowClick">
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
      addRow(name, email, phone, username){
          var self = this;
          self.items.push({id: self.items.length +1 , ho_ten: name, email: email, sdt: phone, username:username})
      },
      rowClick(record, index){
        this.$emit('rowClick', record, index)
      },
      editRow(id, name, email, phone, index){
        var self = this;
        var oldItem = self.items[index];
        var item = {id: id, ho_ten:name, email: email, sdt:phone, username: oldItem.username}
        self.items[index] = item;
        this.$refs.table.refresh();
      },
      deleteRow(index){
        if(confirm("Xóa giao dịch viên?")){
          this.items.splice(index, 1);
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
            key: 'ho_ten',
            label: 'Họ và tên',
            sortable: true
          },
          {
            key: 'email',
            sortable: false,
          },
          {
            key: 'sdt',
            label: 'SĐT',
            sortable: false,
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
          {id: 1, ho_ten: 'Dickerson', email:'gg@gg', sdt: '094335498', username:"dickcock" },
          {id: 2, ho_ten: 'Larsen', email:'gg@gg',sdt: '033545699', username:"larva" },
          {id: 3, ho_ten: 'Geneva', email:'gg@gg', sdt: '09746546', username:"havana"},
          {id: 4, ho_ten: 'Jami', email:'gg@gg',sdt: '152485458', username:"james"}
        ]
      }
    },
watch:{
  item(newItems){
      this.items = newItems
  }
}
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
  width: 20%;
}

#employee td:nth-child(3){
  width: 20%;
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