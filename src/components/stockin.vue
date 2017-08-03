<template>
  <q-layout>
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
                  <div class="item item-link one-lines item-delimiter" route="/login" style="margin:0;">
                    <div class="item-content">
                      <i>exit_to_app</i> Log out
                    </div>
                  </div>
                </div>
              </q-popover>
            </button>

        </q-toolbar-title>
      </div>
      <!-- Navigation Tabs -->
      <q-tabs slot="navigation" class="stock_bl_hdr">
        <q-tab route="/stockin" exact replace>In</q-tab>
        <q-tab route="/stockout" exact replace>Out</q-tab>
        <q-tab route="/sync" exact replace>sync</q-tab>
      </q-tabs>

    <div class="layout-padding scroll" style="width: 100%;padding-bottom: 70px;">
       <p class="caption">SKU</p>
      <blockquote v-if="!hasITEMS">
          <small>
            Please Click on the (+) button to scan the item.
          </small>
      </blockquote>
      <div v-else class="list striped" style="">
        <div class="item three-lines mar" v-if="item.direction == 'In' " v-for="(item, id) in itemsInStock">
            
            <!-- <div class="item-primary bg-primary text-white"><i>assignment</i></div> -->
            <div class="item-content has-secondary">
              <div style="width:100%;overflow:hidden;text-overflow:ellipsis;">{{item.code}}</div>
              <div style="width:100%;overflow:hidden;text-overflow:ellipsis;">{{item.timeStamp}}</div>
            </div>
            <!-- <div class="item-secondary stamp" style="color:green;font-weight:bold ">
              {{item.direction}}
            </div> -->

              <div class="item-secondary">
                <i :ref="'target' + id">
                  more_horiz
                <q-popover :ref="'popover' + id">
                  <div class="list">
                    <div class="item item-link" @click="$refs['popover' + id][0].close(), editProduct(id)">
                      <i class="item-primary">edit</i>
                      <div class="item-content">Edit</div>
                    </div>
                    <div class="item item-link" @click="$refs['popover' + id][0].close(), deleteProduct(id)">
                      <i class="item-primary">delete</i>
                      <div class="item-content">Delete</div>
                    </div>
                  </div>
                </q-popover>
                </i>
              </div>
          </div>
        </div>
      </div>
      <button type="button" class="btn_shadow primary circular absolute-bottom-right" @click="scanQR()" style="bottom:10px; right:10px;">
        <i>add</i>
      </button>

    <!-- Footer -->
    <div slot="footer" class="toolbar" style="font-size:12px;text-aligh:center;">
      <span style="font-size:12px;text-aligh:center;">All right reserved Nano Corporation</span>
    </div>

    <!-- Help content Here -->
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
import { Dialog, Toast } from 'quasar'
import store from './product-store'

function addProduct (name,code,direction='in',timeStamp) {
  let id = Math.random().toString(36).substr(2, 9)

  store.set(id, {name,code,direction,timeStamp})
  Toast.create.positive('Product added')
}
  
function onGetDirectoryFail()
{
  alert('Folder batch Doesnot Exist');
}

function gotNoFileEntry()
{
  alert('Product.json Does not exist');
}

function writeFile(fileEntry,dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            // readFile(fileEntry);
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['some file data'], { type: 'text/plain' });
        }

        fileWriter.write(JSON.stringify(dataObj));

    });
}

export default {
  mounted(){
    // console.log(appconfig);
  },
  data(){

    return {
      topdrop: [
        {
          ref: 'layoutModal'
        }
      ],
      position: 'bottom',
      urls:false,
      itemsInStock:store.state,
      product:{
        name:'',
        id:''
      },
    }

  },
  methods:{
    openSpecialPosition (position){
      this.postion = position
      this.$nextTick(() => {
        this.$refs.positionModal.open()
      })
    },
    scanQR () {
      console.log('sss');
      let  that = this;
      cordova.plugins.barcodeScanner.scan( 
        function (result) {
            // console.log('inside result')
            if(result.text !='')
            {
                // console.log('inside result chein')
                var d = new Date();
                var e = formatDate(d);

                addProduct("randomName",result.text,'In',e);
                that.checkFile();
            }
            
        },

        function (error) {
            alert("Scanning failed: " + error);
        },
        {
            preferFrontCamera : false, // iOS and Android
            showFlipCameraButton : true, // iOS and Android
            showTorchButton : true, // iOS and Android
            torchOn: false, 
            prompt : "Place a barcode inside the scan area", // Android
            resultDisplayDuration: 500
        }
     );
    },
    checkFile(){
      let scope = this;
       window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {

            // console.log('got main dir',dir);

            try{
                dir.getDirectory('batch', {
                      create: false,
                      exclusive: false
                  }, function(dir){
                    dir.getFile('product.json', {
                        create: true,
                        exclusive: false
                    }, function(dir){
                        // console.log(scope.itemsInStock);
                        writeFile(dir,scope.itemsInStock);

                    }, gotNoFileEntry);

                  }, onGetDirectoryFail);

            }
            catch(err){
              console.log(err);
            }
            
        });
    },
    testMethod () {
        console.log(this.itemsInStock);
    },
    editProduct (id) {
      var item = store.state[id]
      var that = this;
      Dialog.create({
        title: 'Edit Product',
        message: '',
        form: {
          name: {
            type: 'textbox',
            label: 'Name',
            model: item.name
          },
          id: {
            type: 'textbox',
            label: 'id',
            model: item.code
          }
        },
        buttons: [
          'Cancel',
          {
            label: 'Save',
            preventClose: true,
            handler (data, close) {
              // console.log(data);
              if (!data.name.length) {
                Toast.create.warning('Please fill in a name')
                return
              }
              if (!data.id.length) {
                Toast.create.warning('Please fill in a id')
                return
              }

              close()
              store.set(id, {
                SKU: data.name,
                barcode: data.id,
                movement
              })
            }
          }
        ]
      })
    },
    deleteProduct (id) {
      var that = this;
      Dialog.create({
        title: 'Confirm',
        message: `
          Are you sure you want to delete the following entry?<br><br>
          <strong>${this.itemsInStock[id].name}</strong> - <em>${this.itemsInStock[id].code}</em>
        `,
        buttons: [
          'Cancel',
          {
            label: 'Delete',
            handler () {
              store.del(id)
              Toast.create.positive('Product removed')
            }
          }
        ]
      })
    }
  },
  computed: {
    hasITEMS () {
      // console.log('After setting :'+this.itemsInStock);
      // alert(store.state);
      return Object.keys(this.itemsInStock).length > 0
    }
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
.logo
  position absolute
  transform-style preserve-3d
.toolbar-title > div
  padding 0
.btn_shadow
  box-shadow 1px 1px 4px #3c3939
.mar
  margin 0!important
</style>
