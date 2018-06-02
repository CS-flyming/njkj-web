<template>
    <div class="images" v-viewer="options">
      <img :src="imageUrl|getUploadUrl(0, 90, '')" :data-source="imageUrl|getUploadUrl(0, 500, '')">
    </div>
</template>

<script>
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer,{
  defaultOptions: {
    "navbar": false, 
    "title": false, 
    "toolbar": {
        zoomIn: 1,
        zoomOut: 1,
        reset: 1,
        rotateLeft: 1,
        rotateRight: 1,
    }
  }
})
export default {
    name:"image-preview",
    props:["imageUrl"],
    data(){
        return {
            options: {
                url: 'data-source'
            },
        }
    }
}
</script>

<style>

</style>
