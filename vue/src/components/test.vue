<template>
  <div tabindex="0" class="dialog-window">
    <div ref="header" class="dialog-header">
      <span class="dialog-header-title">{{title}}</span>

      <button type="button" v-if="isCloseable" @click="dialog.dismiss()"></button>
    </div>

    <div class="dialog-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
 import PositionMixin from './PositionMixin';

 export default {
   mixins: [PositionMixin],

   inject: ['dialog'],

   props: {
     title: {
       type: String,
       required: true,
     },

     isCloseable: {
       type: Boolean,
       default: false,
     },
   },
 }
</script>

<style scoped>
 .dialog-header button {
   float: right;
   display: inline-block;
   background-image: url('./close.png');
   background-repeat: no-repeat;
   background-color: transparent;
   padding: 0;
   width: 15px;
   height: 15px;
   border: none;
   outline: 0;
   cursor: pointer;
 }
</style>
