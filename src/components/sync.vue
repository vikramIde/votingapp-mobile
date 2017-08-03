<template>
  <q-layout>
     <!-- Header -->
  <div slot="header" class="toolbar">
    <q-toolbar-title :padding="1">
            <div class="pull-left" style="margin-top: 7px;">
              <img src="statics/logo.png" alt=""> <span>Stock <small style="font-size:12px;">(beta)</small></span>
            </div>
            <button class="pull-right" style="padding:0!important;">
              <i>more_vert</i>
              <q-popover ref="popover1">
                <div class="list highlight" style="min-width: 150px; max-height: 500px;">
                  <!-- <div class="item item-link one-lines item-delimiter" @click="" style="margin:0;">
                    <div class="item-content">
                      <i>autorenew</i> Sync
                    </div>
                  </div> -->
                  <div class="item item-link one-lines item-delimiter" @click="openSpecialPosition(position)" style="margin:0;">
                    <div class="item-content">
                      <i>help_outline</i> Help
                    </div>
                  </div>
                  <div class="item item-link one-lines item-delimiter" style="margin:0;">
                    <div class="item-content">
                      <i>exit_to_app</i> Log out
                    </div>
                  </div>
                </div>
              </q-popover>
            </button>
        </q-toolbar-title>
  </div>
  <q-tabs slot="navigation">
    <q-tab route="/stockin" exact replace>In</q-tab>
    <q-tab route="/stockout" exact replace>Out</q-tab>
    <q-tab route="/sync" exact replace>sync</q-tab>
  </q-tabs>
  <!-- IF USING subRoutes only: -->
  <!-- <router-view class="layout-view"></router-view> -->
  <!-- OR ELSE, IF NOT USING subRoutes: -->
  <div class="layout-padding">
     <button class="primary" @click="synchFile">
          <i class="on-left">refresh</i> Sync
      </button>
  </div>


  <!-- Footer -->
  <div slot="footer" class="toolbar" style="font-size:12px;text-aligh:center;">
    <span style="font-size:12px;text-aligh:center;">All right reserved Nano Corporation</span>
  </div>


  <q-modal ref="positionModal" :position="position" :content-css="{padding: '20px'}">
      <p>Help</p>
     <blockquote >
          <small>
            To scan new product please click on (In) tab and then (+) button on the bottom right corner
          </small>
      </blockquote>
      <blockquote>
        <small>
            after scanning you can see the product Name and product code you can edit/delete them by clicking on the tripple on the right side of the item.
          </small>
      </blockquote>
    <button class="primary" @click="$refs.positionModal.close()">Got it!</button>
  </q-modal>

</q-layout>
</template>

<script>

function onGetDirectoryFail()
{
  alert('Folder batch Doesnot Exist');
}

function gotNoFileEntry()
{
  alert('Product.json Does not exist');
}

function uploadFile(dir) {
   var fileURL =dir.toURL();
   var uri = encodeURI("http://stagingapp.shankar.uk.com/upload");//replace this code to your server code
   var options = new FileUploadOptions();
   options.fileKey = "file";
   options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
   options.mimeType = "text/plain";
   
   var headers = {'headerParam':'headerValue'};
   // options.headers = headers;
   
    var ft = new FileTransfer();
    var params = {};
    var trustAllHosts = true;
   // console.log(dir);
   ft.upload(fileURL, uri, onSuccess, onError, options,trustAllHosts);

   function onSuccess(r) {
      console.log("Code = " + r.responseCode);
      console.log("Response = " + r.response);
      console.log("Sent = " + r.bytesSent);

      dir.remove(function (file) {

      Toast.create.positive('Synching Finished and file deleted...')
      store.clear();
      }, function (err) {
        console.log(err); // Error while removing File
      });
   }

   function onError(error) {
      console.log(error);
      alert("An error has occurred: Code = " + error.code);
      console.log("upload error source " + error.source);
      console.log("upload error target " + error.target);
   }
  
}

import { Dialog, Toast } from 'quasar'
import store from './product-store'

export default {
  data(){
    return {
      topdrop: [
        {
          ref: 'layoutModal'
        }
      ],
      position: 'bottom'
    }
  },
  methods:{
    openSpecialPosition (position){
      this.postion = position
      this.$nextTick(() => {
        this.$refs.positionModal.open()
      })
    },
        synchFile(){
          
        let scope = this;
         window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {

              Toast.create.warning('Synching...')

              try{
                  dir.getDirectory('batch', {
                        create: false,
                        exclusive: false
                    }, function(dir){
                      dir.getFile('product.json', {
                          create: false,
                          exclusive: false
                      }, function(dir){
                          // console.log(dir.toURL())
                          uploadFile(dir);
                      }, gotNoFileEntry);

                    }, onGetDirectoryFail);

              }
              catch(err){
                console.log(err);
              }
              
          });
      },
  }
}
</script>

<style lang="stylus">
.logo-container
  width 192px
  height 268px
  perspective 800px
  position absolute
  top 50%
  left 50%
  transform translateX(-50%) translateY(-50%)
.toolbar-title > div
  padding 0
.logo
  position absolute
  transform-style preserve-3d
</style>
