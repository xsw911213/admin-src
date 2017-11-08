<template>
	<section>
		<!--工具条-->
		<el-form :model="ruleForm" :rules="ruleFormRules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
			<p class="from_title">基本资料修改<p/>
      <el-form-item label="用户名：">
				<el-input v-model="ruleForm.username" disabled class="w_350"></el-input>
			</el-form-item>
			<el-form-item label="名称：" prop="name">
				<el-input v-model="ruleForm.name"  class="w_350" placeholder="请填写名称"></el-input>
			</el-form-item>
			<el-form-item label="头像：">
				<el-upload
					class="avatar-uploader"
					action="https://jsonplaceholder.typicode.com/posts/"
					:show-file-list="false"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload">
					<img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" style="width:150px;">保存</el-button>
      </el-form-item>
		</el-form>


    <el-form :model="passwords" :rules="passwordRules" ref="passwords" label-width="130px" class="demo-ruleForm">
			<p class="from_title">密码修改<p/>  
      <el-form-item label="旧密码：" prop="oldPassword">
				<el-input type="password" v-model="passwords.oldPassword" class="w_350" placeholder="请输入密码"></el-input>
			</el-form-item>
			<el-form-item label="新密码：" prop="newPassword1">
        <el-input type="password" v-model="passwords.newPassword1" class="w_350" auto-complete="off" placeholder="请输入新密码"></el-input>
			</el-form-item>
			<el-form-item label="确认新密码：" prop="newPassword2">
        <el-input type="password" v-model="passwords.newPassword2" class="w_350" auto-complete="off" placeholder="请再次输入新密码"></el-input>
			</el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitPassword('passwords')" style="width:150px;">确认修改</el-button>
      </el-form-item>
		</el-form>


	</section>
</template>
<script>
	//import NProgress from 'nprogress'
	export default {
		data() {
      let validateOldPass = (rule, value, callback) => {
        let _this = this;
        let oldPassword = JSON.parse(sessionStorage.getItem('user')).password;
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else if( _this.passwords.oldPassword !== oldPassword ){
          callback(new Error('请输入正确的旧密码'));
        }
      };

      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.passwords.newPassword2 !== '') {
            this.$refs.passwordRules.validateField('newPassword2');
          }
          callback();
        }
      };

      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.passwords.newPassword1) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

			return {
				ruleForm: {
          username: '',
          name: '',
          avatar: ''
				},
				ruleFormRules: {
          name: [
            { required: true, message: '请填写名称', trigger: 'blur' }
          ]
          // date1: [
          //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          // ],
          // date2: [
          //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          // ],
          // type: [
          //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          // ],
          // resource: [
          //   { required: true, message: '请选择活动资源', trigger: 'change' }
          // ],
          // desc: [
          //   { required: true, message: '请填写活动形式', trigger: 'blur' }
          // ]
        },
        passwords: {
          oldPassword:'',
          newPassword1:'',
          newPassword2:''
        },
        passwordRules:{
          oldPassword: [
            { required: true, validator: validateOldPass, trigger: 'blur' }
          ],
          newPassword1: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          newPassword2: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
        }
			}
		},
		methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return  isLt2M;
      },
      submitForm(formName) {
        console.log(formName)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitPassword(formName) {
        console.log(formName)
        
        let _this = this;
        console.log(oldPassword);
        _this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

		},
		mounted() {

		}
	};

</script>

<style>
	.w_350{
		width: 350px;
	}
	.avatar-uploader .el-upload {
    border: 1px dashed #7c7c7c;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }
	.from_title{
    position: relative;
    background-color: #8ecfff;
    font-size: 20px;
    padding: 5px 20px;
    color: #0080ff;
  }
</style>