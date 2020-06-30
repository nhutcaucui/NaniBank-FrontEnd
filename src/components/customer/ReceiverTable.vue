<template>
<div class="receiver-table-container">
          <div style="height:400px; overflow:auto;" class="scrolling-table">
            <b-table ref='table' striped hover :items="items" :fields="fields" id="saving" @row-clicked="rowClick">
              <template v-slot:cell(action)="row">
        <b-button size="sm" class="mr-1" variant="danger" @click="deleteRow(row.index)">
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
    name: "ReceiverTable",
    mounted(){
      this.loadTable();
    },
    data(){
      return{
        fields: [
          {
            key: 'id',
            label: 'Mã tài khoản',
            sortable: true
          },
          {
            key: 'name',
            label: 'Tên',
            sortable: true
          },
          {
            key: 'action',
            label: '',
            sortable: false
          },
          
        ],
        items: [
          // {id: 16964582252, name:"Ờ" },
          // { id: 25451544584, name:"tao" },
          // { id: 25984844994, name:"nè"  },
          // { id: 25983664884, name:"3,000,000"  }
        ]
      }
    },
    methods:{
      deleteRow(index){
        if(confirm("Xóa người nhận?")){
          var self = this
        let config = {
                headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                
              data :{
                customer_id: self.$store.state.id,
                receiver: self.items[index].id
              }
        }

                axios.delete(self.$store.state.host+'users/customer/receiver', config).then(response =>{
                    console.log(response)
                    if(response.data.Status){
                       this.items.splice(index,1);
                    }
                })

        }
      },
      rowClick(record, index){
        this.$emit('rowClick', record, index)
      },
      addRow(id, name){
        this.items.push({id: id, name:name});
      },
      editRow(index, id, name){
        this.items[index] = {id:id,name: name}
        this.$refs.table.refresh();
      },
      loadTable(){
        var self = this
        let config = {
                headers: {timestamp: moment().format("X"),
                    'access-token': self.$store.state.accessToken},
                params: {
                customer_id: self.$store.state.id,
                },
                }

                axios.get(self.$store.state.host+'users/customer/receiver', config).then(response =>{
          console.log(response);
          if(response.data.Status){
            self.items = []
            for (var i =0; i < response.data.Receiver.length ; i++){
                self.items.push({id:response.data.Receiver[i].receiver, name: response.data.Receiver[i].remind_name})
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
.receiver-table-container{
  display: inline-block;
  width: 500px;
}
#receiver {
    display: block;
    float: left;
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  padding-top: 50px;
  padding-left: 20px;
}

#receiver td, #receiver th {
  border: 1px solid #ddd;
  padding: 8px;

}

#receiver tr:nth-child(even){background-color: white;}

#receiver tr:hover {background-color: #ddd;}

#receiver th {
  padding-top: 12px;
  padding-bottom: 12px; 
  background-color: #9B82E6;
  color: black;
}

#receiver th:nth-child(1){
  width: 30%;
}

#receiver td:nth-child(1){
  width: 30%;
}

#receiver th:nth-child(2){
  width: 30%;
}

#receiver td:nth-child(2){
  width: 30%;
}


#receiver th:nth-child(3){
  width: 10%;
}

#receiver td:nth-child(3){
  width: 10%;
}

.scrolling-table::-webkit-scrollbar{
 display: none;
}
</style>