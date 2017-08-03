<template>
<q-layout>
  <div class="error-page window-height window-width column items-center custom_login">  
    <div class="items-center justify-center" style="height:100%;width:100%;padding:50px; background-image:url('statics/log_bg.png');background-color: #027be3 !important;background-size:cover;" >
      <div class="content_main" style="position:absolute; top:30%;left:40px;right:40px;">
        <div class="row">
          <div class="width-1of1" style="text-align:center;margin-bottom: 20px;margin-top: 20px;">
            <img src="statics/logo.png" alt="">
          </div>
        </div>
        <div style="clear:both;"></div>
        <div class="row">
          <div class="width-1of1" >
              <form action="#">
                <div style="positive:relative;width:100%;">
                    <div class="floating-label">
                      <input type="password" maxlength="4" required class="full-width login_pass" style="color:#fff;">
                      <label style="color:#fff;">Enter your 4 digit password here</label>
                    </div>
                    <div class="full-width" style="margin-top:30px;positive:absolute;bottom:0;">
                      <button class="light large full-width" @click = "login()">
                        LOGIN
                      </button>
                    </div>
                </div>
              </form>
          </div>
        </div>
      </div>
      
    </div>
    <div>
      <!-- <div class="error-card card bg-white column items-center justify-center">
        <p class="caption text-center">Welcome Screen...</p>
        <p class="text-center group">
          <router-link to="/help" v-if="batch==true">
            <button class="grey push small">
              Go home
            </button>
          </router-link>
        </p>
      </div> -->
    </div>
  </div>

  </q-layout>
</template>
<style>
    input:not(.no-style):focus, textarea:not(.no-style):focus, .textfield:not(.no-style):focus, input:not(.no-style):hover, textarea:not(.no-style):hover, .textfield:not(.no-style):hover, input:not(.no-style) .active, textarea:not(.no-style) .active, .textfield:not(.no-style) .active{
      border-color: #fff!important;
    }
  </style>
<script>
// import store from './product-store'
// import { Toast,Loading,Dialog } from 'quasar'
import Router from 'router'
export default {
  mounted(){
  },
  data () {
    return {
        
    }
  },
  methods:{
    login(){
      Router.replace({ path: 'home' })
    }
  }
  
}
</script>

<style lang="stylus">
.error-page
  .error-code
    height 50vh
    width 100%
    padding-top 4vh
    font-size 21vmax
    color rgba(255, 255, 255, .2)
    overflow hidden
  .error-card
    margin-top -25px
    width 90vw
    max-width 600px
    padding 50px
    i
      font-size 5rem
</style>
