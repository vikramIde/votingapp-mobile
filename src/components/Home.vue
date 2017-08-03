<template>
<q-layout>
  <div class="error-page window-height window-width column items-center custom_login">  
    <div class="items-center justify-center" style="height:100%;width:100%;padding:50px; background-image:url('statics/log_bg.png');background-color: #027be3 !important;background-size:cover;" >
      <div class="content_main" style="position:absolute; top:30%;left:40px;right:40px;">
        <div class="row">
          <div class="width-1of1" style="text-align:center; margin-bottom: 20px;margin-top: 20px;">
            <img src="statics/logo.png" alt="">
          </div>
        </div>
        <div style="clear:both;"></div>
        <div class="row">
          <div class="width-1of1" >
              <form action="#">
                <div style="positive:relative;width:100%;">
                    <div class="floating-label">
                      <input type="password" maxlength="4" class="full-width login_pass" style="color:#fff;">
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
import store from './product-store'
import { Toast,Loading,Dialog } from 'quasar'
import Router from 'router'

    function gotNoFileEntry(e) {
        console.log(e);
        Router.replace({ path: 'help' })
        // Dialog.create({
        //     title: 'Confirm',
        //     message: 'Select option to progress..',
        //     buttons: [
        //       {
        //         label: 'Continue',
        //         handler () {
        //           Router.replace({ path: 'help' })
        //         }
        //       }
        //     ]
        // })
    }

    function onFileSystemSuccess(fileSystem) {

        fileSystem.getDirectory('batch', {
            create: false,
            exclusive: false
        }, onGetDirectorySuccess, onGetDirectoryFail);
    }

    function onGetDirectorySuccess(dir,directury) {
        dir.getFile('product.json', {
            create: false,
            exclusive: false
        }, gotFileEntry, gotNoFileEntry);
    }

    function gotFileEntry(dir){

      Dialog.create({
          title: 'Confirm',
          message: 'Select option to progress..',
          buttons: [
            {
              label: 'Synch',
              handler () {
                Router.replace({ path: 'sync' })
              }
            },
            {
              label: 'Continue',
              handler () {
                Router.replace({ path: 'stockin' })
              }
            }
          ]
      })

    }

    function onGetDirectoryFail(err)
    {
      console.log('Direcotory Error :'+err);
    }

export default {
  mounted(){
      console.log('Componenet Mounted');
      const url = appconfig.dev.BASE_URL+'/api/product_check_in/';
      this.checkFile();
  },
  data () {
    return {
        itemsInStock:store.state,
    }
  },
  computed: {
    // hasITEMS () {
    //    if(this.itemsInStock.length<0)
    //    {
    //       this.getProductSku();
    //    }
    //    else{
    //       console.log('itemsInStock available')
    //    }
    // }
  },
  methods: {
    testMethod () {
        console.log('console.log(cordova): %O', cordova)
    },
    getProductSku() {
      Loading.show();
      const url = appconfig.dev.BASE_URL+`/get_shankar_products/`;
       axios.get(url).then(response => {
        response.data.forEach(function(item){

            addProduct(item._sku,item._barcode,item.movement,item.id,item.updated_at,item.created_at)

        });
        Loading.hide()
        Toast.create.positive('Product added')
        // console.log(store);
      });
    },
    checkFile(){
       window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
            console.log('got main dir',dir);
            try{
                onFileSystemSuccess(dir,'fileName');
            }
            catch(err){
              console.log(err);
            }
            
        });
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
