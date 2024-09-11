<template>
  <a-layout-sider :collapsed="collapsed"
                  :trigger="null"
                  collapsible
                  class="app-side">
    <div class="logo">
      <div class="img">
        <div class="logo_img" />
      </div>
      
      <div  v-show="!collapsed" class="logo_title">
          <div class="logo_inner">
            {{ $t('globle.title') }}
          </div>
        </div>
    </div>
    <a-menu v-model:selectedKeys="selectedKeys"
            v-model:openKeys="openKeys"
            theme="dark"
            mode="inline">
      <template v-for="menuItem in menuData">
        <a-sub-menu v-if="menuItem.children"
                    :key="menuItem.name">
          <template #title>
            <span class="center">
              <i class="iconfont mg-right" :class="menuItem.meta.icon"></i>
              <span v-show="!collapsed">{{menuItem.meta.title}}</span>
            </span>
          </template>
          <template v-for=" item in menuItem.children">
            <a-sub-menu v-if="item.children" :key="item.name">
              <template #title> 
              <span>
                <span v-show="!collapsed">{{item.meta.title}}</span>
              </span>
            </template>
              <template v-for="it in item.children">
                <a-menu-item :key="it.name"
                          v-if="it.meta.affix && root(it.meta.root)"
                          @click="routerPush(it)">
                  {{it.meta.title}}
                </a-menu-item>
              </template>
            </a-sub-menu>
            <a-menu-item :key="item.name"
                         v-else-if="item.meta.affix && root(item.meta.root)"
                         @click="routerPush(item)">
              {{item.meta.title}}
            </a-menu-item>
          </template>
        </a-sub-menu>
        <a-menu-item v-else-if="menuItem.meta"
                     :key="menuItem"
                     @click="routerPush(menuItem)" class="center">
          <template #icon>
            <i class="iconfont font16" :class="menuItem.meta.icon"></i>
          </template>
          <span v-show="!collapsed" class="font16 mg-left">{{$t(`globle.${menuItem.meta.language}`)}}</span>  
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>
<script lang="ts">
import { defineComponent, ref,watch,computed } from 'vue'
import { useLayoutStore } from '@/store/layout'
import { useRouteStore } from '@/store/route'
import { storeToRefs } from 'pinia'
import { useRouter, Router } from 'vue-router'
import { LocalStorageService } from '@/utils/storage';
import {Routes} from '@/router/index'

export default defineComponent({
  name: 'AppSider',
  components: {
  },
  setup() {
    const routeStore = useRouteStore()
    const { selectedMenu } = storeToRefs(routeStore)
    //获取状态管理中的值
    const store = useLayoutStore()
    const { collapsed } = storeToRefs(store)
    const routes:any=Routes[0].children
    
    //导航栏数据
    const menuData = ref<Array<any>>(routes)
    //路由跳转
    const router: Router = useRouter()
    const routerPush = (item: any) => {
      router.push({ name: item.name })
    }
    //默认选择菜单
    const selectedKeys = ref<string[]>(['BusinessScenario','RecommendedScenario']);
    const openKeys = ref<string[]>(['BusinessScenario']);
    
    watch(selectedKeys,(newValue,oldValue)=>{
      LocalStorageService.set('selectedKey',selectedKeys.value);
    })
    watch(openKeys,(newValue,oldValue)=>{
      LocalStorageService.set('openKey',openKeys.value);
    })
    watch(selectedMenu, () => {
      selectedKeys.value = LocalStorageService.get('selectedKey')
    })
    if(LocalStorageService.get('selectedKey')){
        selectedKeys.value = LocalStorageService.get('selectedKey');
    }
    if(LocalStorageService.get('openKey')){
        openKeys.value = LocalStorageService.get('openKey');
    }
    const root = ( (root:any)=>{
      if(root){
        return LocalStorageService.get('is_leader') == '1'
      }
      return true;
    })
    return {
      selectedKeys,
      openKeys,
      collapsed,
      menuData,
      routerPush,
      root
    }
  },
})
</script>
<style lang="scss" scoped>
.app-side{
  min-height: 100vh;
}
.logo{
  display: flex;
  background-color: #6D29C9;
  align-items: center;
  justify-content: center;
  .img{
    height: 64px;
    display: flex;
    align-items: center;
    margin-left: 5px;
  }
}
 .logo_img{
  width: 60px;
  height: 30px ;
    // background: url('@/assets/images/preoject_logo.png') no-repeat center;
 }
.logo_title{
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;

  color: #fff;

 .logo_inner{
  font-size: 22px;
  margin-left: 10px;
 }
}
.mg-left{
  margin-left: 10px;
}
.center{
  display: flex;
  align-items: center;
}
.font16{
  font-size: 16px;
}
:deep(.ant-menu-item .ant-menu-item-icon){
  font-size: 24px;
}
:deep(.ant-menu.ant-menu-inline-collapsed > .ant-menu-item .ant-menu-item-icon){
  font-size: 24px;
}
:deep(.ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected ){
  background-color: #6D29C9;
}

:deep(.ant-menu-inline > .ant-menu-item ){
  height: 50px;
  line-height: 50px;
}

</style>