<template>
    <div class='customer-transfer'>
<div class="container-box" id ="container-box">
            <label>Chuyển khoản nội bộ</label>
            <form>
            <select placeholder="Tài khoản nguồn"  id="source" name ="source" class="text-input">
                <option value="-1">- Chọn tài khoản thanh toán -</option>
                <option value="12456789">123456789</option>
            </select>
            
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

            <input placeholder="Tên"  id="name" name ="name" disabled/>
            <input placeholder="Số điện thoại"  id="phone" name ="phone" disabled/>
            <input placeholder="Email"  id="email" name ="email" disabled/>
            <input placeholder="Số tiền"  id="amount" name ="amount"/>
            <input placeholder="Nội dung chuyển"  id="note" name ="note"/>
            <select placeholder="Thanh toán"  id="fee" name ="fee" class="text-input">
                <option value="-1">- Người thanh toán -</option>
                <option value="1">Người gửi thanh toán</option>
                <option value="2">Người nhận thanh toán</option>
            </select>
            <button class="submit-button" id="submit-transfer-in">Chuyển tiền</button>
            </form>
        </div>

        <b-popover target="container-box" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label v-bind="errorMessage"></label>
      </b-popover>

      <div class="container-box" id ="container-box">
            <label>Chuyển khoản liên ngân hàng</label>
            <form>
            <select placeholder="Tài khoản nguồn"  id="source" name ="source" class="text-input">
                <option value="-1">- Chọn tài khoản thanh toán -</option>
                <option value="12456789">123456789</option>
            </select>
            <select placeholder="Chọn ngân hàng"  id="source" name ="source" class="text-input">
                <option value="-1">- Chọn ngân hàng -</option>
                <option value="0">KiantoBank</option>
                <option value="0">idkyet</option>
            </select>
            
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

            <input placeholder="Tên"  id="name" name ="name" disabled/>
            <input placeholder="Số điện thoại"  id="phone" name ="phone" disabled/>
            <input placeholder="Email"  id="email" name ="email" disabled/>
            <input placeholder="Số tiền"  id="amount" name ="amount"/>
            <input placeholder="Nội dung chuyển"  id="note" name ="note"/>
            <select placeholder="Thanh toán"  id="fee" name ="fee" class="text-input">
                <option value="-1">- Người thanh toán -</option>
                <option value="1">Người gửi thanh toán</option>
                <option value="2">Người nhận thanh toán</option>
            </select>
            <button class="submit-button" id="submit-transfer-in">Chuyển tiền</button>
            </form>
        </div>

        <b-popover target="container-box" triggers="manual" placement="bottom" container="error-popover" variant="danger">
            <template v-slot:title>Lỗi</template>
            <label v-bind="errorMessage"></label>
      </b-popover>
    </div>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest';
export default {
    name:'CustomerTransfer',
    components:{
        VueAutosuggest
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
.customer-transfer{
    display: flex;
    justify-items: center;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}
.container-box{
    margin-left: 15px;
    margin-right: 15px;
    height: unset;
    padding-top: 15px;
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