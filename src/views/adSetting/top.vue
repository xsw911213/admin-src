<template>
	<section>
		<!--工具条-->
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
			<el-form-item label="日期：" prop="date" style="margin-bottom:20px;">
				<el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" :picker-options="pickerOptions0"></el-date-picker>
			</el-form-item>
			<el-form-item label="时间段：" prop="time" style="margin-bottom:20px;">
				<el-select v-model="ruleForm.time" placeholder="请选择时间段" style="width:220px;">
					<el-option v-for="item in timeOption" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item style="margin-bottom:20px;">
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			</el-form-item>
		</el-form>
	</section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.ruleForm.checkPass !== "") {
    //       this.$refs.ruleForm.validateField("checkPass");
    //     }
    //     callback();
    //   }
    // };
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < (Date.now()-8.64e7);
        }
      },
      ruleForm: {
				date: '',
				time: '',
      },
      uploadform: {
        token: ""
      },
      timeOption: [
        {
          label: "0:00 - 8:00",
          value: "1"
        },
        {
          label: "8:00 - 16:00",
          value: "2"
        },
        {
          label: "16:00 - 24:00",
          value: "3"
        }
      ],
      rules: {
        date: [{ required: true, message: '请选择日期', trigger: 'change'}],
        time: [{ required: true, message: '请选择时间段', trigger: 'change'}],
        adimg: [{ required: true, message: '请上传图片或填写图片地址'}]
      }
    };
  },
  methods: {
    
    handleAvatarSuccess(response, file, fileList) {
      this.ruleForm.adimg = `${this.host.imgBaseUrl}${response.key}`;
    },
    beforeAvatarUpload(file) {
      let isLt2M = file.size / 1024 / 1024 < 2;
      let _this = this;

      if (!isLt2M) {
        _this.$message.error("上传头像图片大小不能超过 2MB!");
      } else {
        let params = {
          fileName: file.name
        };

        return axios
          .get(_this.host.baseUrl + "/uploadimg", { params })
          .then(res => {
            if (res.data.code === "1") {
              _this.uploadform = {
                key: res.data.result.fileName,
                token: res.data.result.uploadToken
              };
            } else {
              _this.$message.error("上传图片失败");
            }
          })
          .catch(() => {
            _this.$message.error("上传图片失败");
          });
      }

      return isLt2M;
    },
    initLinkStr(){
      if(this.ruleForm.link === ''){
        this.ruleForm.link = '#';
      }else{
        if(!(this.ruleForm.link.indexOf('http') >= 0)){
          // 填写的链接地址不正确
          this.$message({
            message: '请填写正确的链接地址',
            type: 'error',
            // duration:10000000
          });
        }
      }
    }
	},
	mounted(){
	}
};
</script>


<style lang="scss">

</style>