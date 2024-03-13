import type {BannerItem,CategoryItem,HotItem,PageResult} from '@types/home'
import { http } from '@/utils/http'
import type { GuessItem } from '@/types/home'

export const getHomeBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}

export const getHomeCategoryAPI=()=>{
  return http<CategoryItem[]>({
    method:'GET',
    url:'/home/category/mutli',
  })
}

export const getHoemHotAPI=()=>{
  return http<HotItem[]>({
    method:'GET',
    url:'/home/hot/mutli',
  })
}

export const getHomeGoodsGuessLikeAPI=()=>{
  return http<PageResult<GuessItem>>({
    method:'GET',
    url:'/home/goods/guessLike',
  })
}
