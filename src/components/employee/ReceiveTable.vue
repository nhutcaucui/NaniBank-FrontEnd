<template>
<div class="transaction-table-container">
          <div style="height:400px; overflow:auto;" class="scrolling-table">
            <b-table striped hover :items="items" :fields="fields" id="receive-table"></b-table>
          </div>
</div>
</template>

<script>
export default {
  props:['data'],
    name: "ReceiveTable",
    mounted() {
      this.loadData(this.$props.data);
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
            key: 'sender',
            label: 'Người gửi',
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
            sortable: false,
          },
        ],
        items: [
          // { isActive: true, stt: 1, sender:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"1,200,222" },
          // { isActive: false, stt: 2, sender:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"5,000" },
          // { isActive: false, stt: 3, sender:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"2,000"  },
          // { isActive: true, stt: 4, sender:'gg@gg', date: '1/1/1990', bank: 'nani', amount:"3,000,000"  }
        ]
      }
    },
    methods:{
      loadData(data){
        //var self = this
        console.log(data)
      },
    }
}
</script>

<style>
.transaction-table-container{
  display: inline-block;
  margin-right: 0;
    width: 700px;
}
#receive-table {
    display: block;
    float: left;
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  padding-top: 50px;
  padding-left: 20px;
}

#receive-table td, #receive-table th {
  border: 1px solid #ddd;
  padding: 8px;

}

#receive-table tr:nth-child(even){background-color: white;}

#receive-table tr:hover {background-color: #ddd;}

#receive-table th {
  padding-top: 12px;
  padding-bottom: 12px; 
  background-color: rgb(47, 218, 47);
  color: black;
}

#receive-table th:nth-child(1){
  width: 7%;
}

#receive-table td:nth-child(1){
  width: 7%;
}

#receive-table th:nth-child(2){
  width: 20%;
}

#receive-table td:nth-child(2){
  width: 20%;
}

#receive-table th:nth-child(3){
  width: 20%;
}

#receive-table td:nth-child(3){
  width: 20%;
}

#receive-table th:nth-child(4){
  width: 15%;
}

#receive-table td:nth-child(4){
  width: 15%;
}

#receive-table th:nth-child(5){
  width: 20%;
}

#receive-table td:nth-child(5){
  width: 20%;
}

#receive-table th:nth-child(6){
  width: 18%;
}

#receive-table td:nth-child(6){
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