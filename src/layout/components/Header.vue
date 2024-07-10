<template>
  <a-layout-header class="container-header">
    <div class="flex">
      <el-link class="link-cls" href="/" target="_self" :underline="false">Teclips</el-link>
      <div class="menu-style" style="width:500px; margin-left: 30px;">
        <el-menu 
          :default-active="activeIndex" 
          class="head-menu"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">Remove Watermark</el-menu-item>
          <el-menu-item index="2">Price</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div>
      <el-button
      link
      size="large" 
      @click="userInfo?'':login"
    >
      {{userInfo?userInfo.username:'Login'}}
    </el-button>
    <el-button
      text
      bg
      size="large"
      round
      @click="login"
    >
      Sign up
    </el-button>
    </div>
  </a-layout-header>
</template>
<script lang="ts" setup>
import {  onMounted,ref,watch,h  } from 'vue'
import { useLayoutStore } from '@/store/layout'
import { storeToRefs } from 'pinia'
import { useRouter, Router } from 'vue-router'
import { ElMessage } from 'element-plus';
import { json } from 'stream/consumers'

const current = ref(['mail'])
const activeIndex = ref('1')

const menuItem = [{
  key:'remove_object',
  label: 'Remove Watermark',
  title: 'Remove watermark'
},{
  key:'price',
  label: 'Price',
  title: 'Price'
}]

const userInfo = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):'';

const items = ref(menuItem)

const router=useRouter()

const handleSelect = (key: string, keyPath: string[]) => {
  if (key == '1') {
    router.push({
      name:'Remove'
    })
  } else if (key == '2') {
    router.push({
      name:'Price'
    })
  } else {
    // do nothing
  }
}

const login = () =>{
  router.push({name:'Login'})
}
</script>
<style lang="scss" scoped>
.container-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff; 
  padding: 0 20px;
  border-bottom: 1px solid #dcdfe6;
  height: 72px;

  .link-cls {
    font-size: 28px;
    font-weight: 600;
  }

  .is-link {
    font-size: 20px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.88);
  }

  .is-text {
    font-size: 20px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.88);
  }
}
.flex{
  display: flex;
  align-items: center;
}
.menu-style {
  .head-menu .el-menu-item {
    font-size: 24px;
    font-weight: 300;
  }
  .head-menu {
    border-bottom: 0px solid rgba(5,5,5,0.66);
  }
}
.userInfo{
        margin: 0 10px;
    }
    .el-dropdown-link{
        display: flex;
        align-items: center;
    }
    .el-dropdown-link:hover{
        color: #6D29c9;
        cursor:default;
    }
</style>