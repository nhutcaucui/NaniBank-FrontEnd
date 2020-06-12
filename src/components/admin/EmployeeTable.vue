<template>
<div class="employee-table-container">

  <div style="height:400px; overflow:auto;" class="scrolling-table">
      <b-table striped hover :items="items" :fields="fields" id="employee">
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
export default {
    name: "EmployeeTable",
    data(){
      return{
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
            key: 'dob',
            label: 'Ngày sinh',
            sortable: true,
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
          { isActive: true, id: 1, ho_ten: 'Dickerson', email:'gg@gg', sdt: '094335498', dob: '1/1/1990', username:"dickcock" },
          { isActive: false, id: 2, ho_ten: 'Larsen', email:'gg@gg',sdt: '033545699', dob: '1/1/1990', username:"larva" },
          { isActive: false, id: 3, ho_ten: 'Geneva', email:'gg@gg', sdt: '09746546', dob: '1/1/1990', username:"havana"  },
          { isActive: true, id: 4, ho_ten: 'Jami', email:'gg@gg',sdt: '152485458', dob: '1/1/1990', username:"james"  }
        ]
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