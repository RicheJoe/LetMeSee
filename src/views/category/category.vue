<template>
<div>
    <h2>分类</h2>
    <button @click="btnClick">click</button>
    <h3 ref="test">{{counter}}</h3>
    <h4>{{arr}}</h4>
     <button @click="btnClick2">click</button>
     <h4>{{tom}}</h4>
</div>
    
</template>

<script>
export default {
    name:'category',
    components: {

    },
    computed: {

    },
    data() {
        return{
            counter:0,
            arr:[1,2,3,4,5],
            tom:{
                age:12,
                height:100
            }
        }
    },
    watch: {

    },
    methods: {
        btnClick(){
            for(let i=0;i<100;i++){
                this.counter++
                console.log('yi',this.$refs.test.innerText);
            }

            console.log('er',this.$refs.test.innerText);
            
            setTimeout(()=>{
                console.log('san',this.$refs.test.innerText);
            },0)
        },
        btnClick2(){
            this.arr.push(9)
           
            delete this.tom.age 
        }
    },
    mounted() {

    },
    props: {

    },
    destroyed() {

    },
}
</script>

<style >

</style>
