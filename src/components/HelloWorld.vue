<template>
  <div class="hello">
    <h1 class="paul">{{ msg }}</h1>
    <a href="#/two">链接到第二页</a>
  </div>
</template>

<script>
 // import head from '@/components/head/head';
  export default {
  name:'HelloWorld',
  data () {
  return {
  msg: '第一 页面'
}
},
//  components: {
//       head
//},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.paul{
  color:#ff0000
}
</style>
