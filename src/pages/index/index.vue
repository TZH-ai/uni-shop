<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHoemHotAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@types/home'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import type { XtxGuessInstance } from '@/types/components'
import PageSkeleton from './components/PageSkeleton.vue'
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
const getHomeCategoryDate = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}
const getHomeHotData = async () => {
  const res = await getHoemHotAPI()
  hotList.value = res.result
}
const isLoading=ref(false)
onLoad(async() => {
  isLoading.value=true
 await Promise.all([ getHomeBannerData(), getHomeCategoryDate(),getHomeHotData()])
 isLoading.value=false
})
const onScrolltolower=()=>{
  guessRef.value?.getMore()
}
const onRefresherrefresh=async()=>{
  isTriggered.value=true
  guessRef.value?.resetData()
  // getHomeCategoryDate()
  // getHomeHotData()
  // getHomeBannerData()
  await Promise.all([getHomeCategoryDate(),getHomeHotData(),getHomeBannerData(),guessRef.value?.getMore()])
  isTriggered.value=false
}
const bannerList = ref<BannerItem[]>([])
const categoryList = ref<CategoryItem[]>([])
const hotList = ref<HotItem[]>([])
const guessRef=ref<XtxGuessInstance>()
const isTriggered=ref(false)
</script>

<template>
  <CustomNavbar />
  <scroll-view
   refresher-enabled @refresherrefresh="onRefresherrefresh" scroll-y class="scroll-view" @scrolltolower="onScrolltolower"
   :refresher-triggered="isTriggered"
   >
   <PageSkeleton v-if="isLoading" />
   <template>
    <XtxSwiper :list="bannerList" />
    <!--分类-->
    <CategoryPanel :list="categoryList" />
    <HotPanel :list="hotList" />
    <!--猜你喜欢-->
    <XtxGuess ref="guessRef"/>
   </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-view{
  flex: 1;
}
</style>
