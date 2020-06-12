<template>
    <div class='customer-debt-create'>
        <DebtTableSent/>
<div class="add-box" id = "debt-create-box">
    <label>Nhắc nợ</label><br/>
    <form>
    <div class="autosuggest-container">
      <vue-autosuggest
        v-model="query"
        :suggestions="filteredOptions"
        @focus="focusMe"
        @click="clickHandler"
        @input="onInputChange"
        @selected="onSelected"
        :get-suggestion-value="getSuggestionValue"
        :input-props="{id:'autosuggest__input', placeholder:'Tài khoản chuyển đến'}">
        <div slot-scope="{suggestion}" style="{padding: '0'}" class="auto-suggest-container">
          <div style="{ display: 'flex', color: 'white'}">{{suggestion.item.name}}</div>
          <div style="{ display: 'flex', color: 'navyblue'}">{{suggestion.item.id}}</div>
        </div>
      </vue-autosuggest>
    </div>
    <input placeholder="Họ tên"  id="name" name ="name" disabled/>
    <input placeholder="Email"  id="email" name ="email" disabled/>
    <input placeholder="Số điện thoại"  id="phone" name ="phone" disabled/>
    <input placeholder="Số tiền nợ"  id="amount" name ="amount"/>
    <input placeholder="Nội dung nợ"  id="note" name ="note"/>
    <br/>
    <button class="submit-button" id="submit-add">Gửi nhắc nợ</button>
    </form>
</div>

    <b-popover target="debt-create-box" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label v-bind="errorMessage"></label>
      </b-popover>
      <div id="error-popover"></div>
    </div>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest';
import DebtTableSent from './DebtTableSent'
export default {
    name:'CustomerDebtCreate',
    components:{
        VueAutosuggest,
        DebtTableSent
    },
    data() {
    return {
      query: "",
      selected: "",
      suggestions: [
        {
          data: [
            { id: 1, name: "Frodo", race: "Hobbit" },
            { id: 2, name: "Samwise", race: "Hobbit"},
            { id: 3, name: "Gandalf", race: "Maia"},
            { id: 4, name: "Aragorn", race: "Human"}
          ]
        }
      ]
    };
  },
  computed: {
    filteredOptions() {
      return [
        { 
          data: this.suggestions[0].data.filter(option => {
            return option.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          })
        }
      ];
    }
  },
  methods: {
    clickHandler() {

      // event fired when clicking on the input
    },
    onSelected(item) {
      this.selected = item.item;
    },
    onInputChange(text) {
      // event fired when the input changes
      console.log(text)
    },
    /**
     * This is what the <input/> value is set to when you are selecting a suggestion.
     */
    getSuggestionValue(suggestion) {
      return suggestion.item.id;
    },
    focusMe(e) {
      console.log(e) // FocusEvent
    }
  }
}
</script>

<style scoped>
.add-box{
    height: unset;
    padding-bottom: 15px;
}

.autosuggest__results-container ul{
    padding: 0;
}

#autosuggest ul{
    padding: 0px;
}
.auto-suggest-container div{
text-align: left;
}
.auto-suggest-container div:nth-child(1){
    color: black;
    font-weight: bold;
}
.auto-suggest-container div:nth-child(2){
    margin-right: 40px;
    border-bottom: 1px solid grey;
}
</style>