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
                      <input v-model="adhaar" type="text" maxlength="" required class="full-width login_pass" >
                      <label style="color:;">Adhaar number</label>
                    </div>
                    <br/>
                    <br/>
                    <div class="floating-label">
                      <select v-model="selectedBallot">
                        <option disabled value="">Please select one</option>
                        <option v-for="(ballot, id) in ballotList" v-bind:value="ballot.contractaddr" > {{ballot.contractname}} </option>
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
        //serverBaseurl:'http://ec2-52-72-114-165.compute-1.amazonaws.com/api/',
        //serverBaseurl:'https://votingdaap.herokuapp.com/api/',
        serverBaseurl:'http://localhost:3000/api/',
        masterAdhaarid:'5845',
        loginUrl:'validate-voter',
        contractlisturl:'ballot-list',

    }
  },
  methods:{

    login(){
      debugger;
      console.log(this.serverBaseurl+this.loginUrl);

console.log(this.selectedballot);
console.log(this.adhaar);
 axios.post(this.serverBaseurl+this.loginUrl,{'contractAddr':this.selectedballot,'adharNumber':this.adhaar}).then(res=>{
                  LocalStorage.set('selectedBallot', this.selectedBallot)
                   Router.replace({ path: 'Index' })
                }).catch(e => {
                  console.log(e)
                })
             
        },
    getContractList(){
                console.log(config.BASE_URL)
                console.log( 'Adhaar :' +  this.masterAdhaarid);
                let url = this.serverBaseurl+this.contractlisturl;
                console.log( 'Url :' +  url);
                
axios.post(url, 'adharNumber=5845')
.then(res=>{
                  console.log(res.data.message)
                  this.ballotList = JSON.parse(res.data.message)
                  console.log(this.ballotList)
                  // LocalStorage.set('ballotList', this.state)
                }).catch(e => {
                  console.log(e)
                });

                /*axios.post(url,{'adharNumber':this.masterAdhaarid})
                .then(res=>{
                  console.log(res.data.message)
                  this.ballotList = JSON.parse(res.data.message)
                  console.log(this.ballotList)
                  // LocalStorage.set('ballotList', this.state)
                }).catch(e => {
                  console.log(e)
                })

                 axios({
                        url: url,
                        method: 'post',
                        headers: {'Content-Type': 'application/json;charset=utf-8'},
                        data: {'adharNumber':this.masterAdhaarid},
                      })
                      .then(res=>{
                        console.log(res.data.message)
                        this.ballotList = JSON.parse(res.data.message)
                        console.log(this.ballotList)
                        
                      }).catch(e => {
                        console.log(e)
                      });
*/
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
