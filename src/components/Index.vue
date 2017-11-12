<template>
  <q-layout>
     <div slot="header" class="toolbar">
        <q-toolbar-title :padding="1">
            <div class="pull-left" style="margin-top: 7px;">
              <!-- <img src="statics/bgm_logo.png" alt="" style="height: 50px;"> -->
               <span>E Voting <small style="font-size:12px;">(beta)</small></span>
            </div>
            <button class="pull-right" style="padding:0!important;">
              <i>more_vert</i>
              <q-popover ref="popover1">
                <div class="list highlight" style="min-width: 150px; max-height: 500px;">
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
        <q-tab route="/stockin" exact replace>Ballot</q-tab>
       <!--  <q-tab route="/stockout" exact replace>Out</q-tab>
        <q-tab route="/sync" exact replace>sync</q-tab> -->
      </q-tabs>

    <div class="layout-padding scroll" style="width: 100%;padding-bottom: 70px;">
       <!-- <p class="caption">SKU</p> -->
      <blockquote v-if="!hasITEMS">
          <small>
            You Voted Sucessfully
          </small>
      </blockquote>
      <div v-else class="list " style="">
            
              <div v-for="(party, id) in partyList">

                <div class="item" >
                  <div class="item-content as-secondary">{{party.name}}</div>
                  <div class="item-secondary " >
                    <button class="primary push small" @click="confirmVote(id)" style="margin-left: -19px;">Vote</button>
                  </div>
                  
                </div>

              </div>
              
          
        </div>
      </div>

    <!-- Footer -->
    <div slot="footer" class="toolbar" style="font-size:12px;text-aligh:center;">
      <span style="font-size:12px;text-aligh:center;">All right reserved E Voting</span>
    </div>

    <!-- Help content Here -->
    <q-modal ref="positionModal" :position="position" :content-css="{padding: '20px'}">
        <p>Help</p>
       <blockquote >
            <small>
              To vote click on the list you wanna click.
            </small>
        </blockquote>
        
      <button class="primary" @click="$refs.positionModal.close()">Got it!</button>
    </q-modal>
  </q-layout>
</template>
<style>


</style>
<script>
import { Dialog, Toast,LocalStorage } from 'quasar'
// import store from './product-store'
import config from '../../config/appconfig.js'


export default {
  mounted(){
      this.getPartylist()
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
      partyList:[{"name":"BJP"},{"name":"Aap"},{"name":"Jantadal United"},{"name":"CONGRESS"}],
      product:{
        name:'',
        id:''
      },
      partyListUrl:'parties-list'
    }

  },
  methods:{
    openSpecialPosition (position){
      this.postion = position
      this.$nextTick(() => {
        this.$refs.positionModal.open()
      })
    },
    confirmVote(index){
      let partyname = this.partyList[index].name
      let that = this
      Dialog.create({
        title: 'Vote for '+partyname+'?',
        message: '',
        buttons: [
          'No',
          {
            label: 'Yes',
            handler () {
              that.vote()
            }
          }
        ]
      })
    },
    vote(index){
      this.partyList=[]
    },
    getPartylist(){
      contractaddr
      let selectedballot = LocalStorage.get.item('selectedBallot') || {}

      axios.post(config.BASE_URL+this.partyListUrl,{'contractaddr':selectedballot.contractaddr}).then(res=>{
        this.partyList = JSON.parse(res.message)
      }).catch(e => {
        console.log(e)
      })
      
    }

  },
  computed: {
    hasITEMS () {
      // console.log('After setting :'+this.itemsInStock);
      // alert(store.state);
      return Object.keys(this.partyList).length > 0
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
