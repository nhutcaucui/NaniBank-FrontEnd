<template>
<div class="transaction-table-container">
          <div style="height:400px; overflow:auto;" class="scrolling-table">
            <b-table striped hover :items="items" :fields="fields" id="debt-table-received">
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
    name: "DebtTableReceived",
    data(){
      return{
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
          {
            key:'action',
            label:''
          }
        ],
        items: [
          { stt: 1, id:13545684415, name: '1/adasd/1990', amount:"1,200,222", status:"Đã thanh toán" , note:"hey" },
          {  stt: 2, id:1352684415, name: '1/1/asd', amount:"5,000", status:"Chưa thanh toán", note:"gib money" },
          {  stt: 3, id:13545684415, name: '1/1/sdada', amount:"2,000", status:"Hủy bỏ" , note: "send cash" },
          {  stt: 4, id:135451585, name: '1/1/19sada90', amount:"3,000,000", status:"Đã thanh toán"  }
        ]
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