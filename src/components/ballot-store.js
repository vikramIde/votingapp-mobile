import Vue from 'vue'
import { LocalStorage } from 'quasar'

export default {
  state: LocalStorage.get.item('ballotList') || {},
  set (id, item) {
    Vue.set(this.state, id, item)
    LocalStorage.set('ballotList', this.state)
  },
  del (id) {
    Vue.delete(this.state, id)
    LocalStorage.set('ballotList', this.state)
  },
  clear(){
  	this.state ={};
  	LocalStorage.remove('ballotList')
  }

}