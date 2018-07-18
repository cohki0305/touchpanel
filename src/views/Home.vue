<template>
  <div class="home">
    <el-button type="text" @click="dialogFormVisible = true">open a Form nested Dialog</el-button>
    <el-dialog title="新規登録" :visible.sync="dialogFormVisible">
      <el-form ref="form">
        <el-form-item label="店名" label-width="120px" >
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="店舗名" label-width="120px">
          <el-input v-model="form.branch" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="住所" label-width="120px">
          <el-input v-model="form.address" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submit">Add</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import firebase from 'firebase'

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
  methods: {
    async submit() {
      const db = firebase.firestore()
      try {
        await db.collection('restraunt').add({
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
