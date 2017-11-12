<template>
<q-layout>
  <div class="error-page window-height window-width column items-center custom_login">  
    <div class="items-center justify-center" style="height:100%;width:100%;padding:50px; background-color: #f3f3f4 !important;background-size:cover;" >
      <div class="content_main" style="position:absolute; top:20%;left:40px;right:40px;">
        <div class="row">
          <div class="width-1of1" style="text-align:center;margin-top: 20px; color:#000">
           <img src="statics/bgm_logo.png" alt="" style="width:100px">
           <br>
           <strong>E-Voting</strong>
          </div>
        </div>
        <div style="clear:both;"></div>
        <div class="row">
          <div class="width-1of1" >
              <form action="#">
                <div style="positive:relative;width:100%;">
                    <div class="floating-label">
                      <input v-model="adhaar" type="text" maxlength="4" required class="full-width login_pass" style="color:#fff;">
                      <label style="color:;">Adhaar number</label>
                    </div>
                    <div class="">
                      <select v-model="selectedBallot">
                        <option disabled value="">Please select one</option>
                        <option v-for="(ballot, id) in ballotList">ballot.name</option>
                      </select>
                    </div>
                    <div class="full-width" style="margin-top:30px;positive:absolute;bottom:0;">
                      <button class="light large full-width" style="background-color:#c35323"  @click = "login()">
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
import { Toast,Loading,Dialog ,LocalStorage} from 'quasar'
import Router from 'router'
import config from '../../config/appconfig.js'
export default {
  mounted(){
    this.getContractList()
    console.log(config)
  },
  data () {
    return {
        adhaar:"",
        ballotList:['Ballot1','Ballot2','Ballot3'],
        selectedBallot:'',
        serverBaseurl:'',
        masterAdhaarid:'0987',
        loginUrl:'',
        contractlisturl:'',

    }
  },
  methods:{

    login(){
              setTimeout(() => {
                axios.post(config.BASE_URL+this.loginUrl,{'contractAddr':this.selectedballot.contractaddr,'adharNumber':adhaar}).then(res=>{
                  LocalStorage.set('selectedBallot', this.selectedBallot)
                   Router.replace({ path: 'Index' })
                }).catch(e => {
                  console.log(e)
                })
              }, 2000)

             
        },
    getContractList(){
          
                axios.post(config.BASE_URL+this.contractlisturl,{'adharNumber':this.masterAdhaarid})
                axios.get(config.BASE_URL+this.contractlisturl).then(res=>{
                  this.ballotList = JSON.parse(res.message)
                  LocalStorage.set('ballotList', this.state)
                }).catch(e => {
                  console.log(e)
                })

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
