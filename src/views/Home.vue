<template>
  <el-container>
    <el-row>
      <el-button type="text" class="float" @click="dialogFormVisible = true">+</el-button>
    </el-row>
    <el-dialog title="新規登録" :visible.sync="dialogFormVisible" width="80%">
      <el-form ref="form">
        <el-form-item label="店名">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="店舗名">
          <el-input v-model="form.branch" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="住所">
          <el-input v-model="form.address" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submit">Add</el-button>
      </span>
    </el-dialog>

    <el-row class="list">
      <el-card class="box-card" v-for="r, i in restaurants" :key="i">
        <div slot="header" class="clearfix">
          <span>{{ r.name }}</span>
        </div>
        <div class="text item">
          {{ r.branch }}
        </div>
        <div class="text item">
          {{ r.address }}
        </div>
      </el-card>
    </el-row>
  </el-container>
</template>

<script>

import firebase from 'firebase'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'home',
  data: () => {
    return {
      form: {
        name: null,
        branch: null,
        address: null,
      },
      dialogFormVisible: false,
      dialogTableVisible: false,
    }
  },
  computed: {
    ...mapState(['restaurants'])
  },
  created() {
    const db = firebase.firestore()
    const ref = db.collection('restaurant')
    ref.onSnapshot((doc) => {
      const restaurants = doc.docs.map((d) => d.data())
      this.$store.dispatch('setRestaurant', restaurants)
    })
  },
  methods: {
    ...mapActions(
      ['setRestaurant']
    ),
    async submit() {
      const db = firebase.firestore()
      try {
        await db.collection('restaurant').add({
          name: this.form.name,
          branch: this.form.branch,
          address: this.form.address
        })
      } catch(e) {
        alert(`登録に失敗`)
      }
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.list {
  margin: 0 auto;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.float{
	position:fixed;
	width:60px;
	height:60px;
	bottom:40px;
	right:40px;
	background-color:#0C9;
	color:#FFF;
	border-radius:50px;
	text-align:center;
	box-shadow: 2px 2px 3px #999;
}

.el-dialog {
  width: 80% !important;
}

</style>
