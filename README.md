# 

自定义plugin使用:cordova add plugin <path>
  
date.vue 基于mint的date组件，调用时需要传入title @postData是子组件传递到父组件的方法，能够在里面获取时间值

<code><date title='开始时间' @postData='getChild'></date></code>
