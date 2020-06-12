<template>
    <div class='customer-list'>
        <DebitTable/>
        <SavingTable/>
    </div>
</template>

<script>
import DebitTable from './DebitTable'
import SavingTable from './SavingTable'
export default {
    name:'CustomerList',
    components:{
        DebitTable,
        SavingTable
    }
}
</script>

<style>

</style>