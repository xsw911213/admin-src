<template>
	<section>
		<!--工具条-->
		<el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm" label-width="100px">
			<el-form-item label="日期：">
				<el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
			</el-form-item>
			<el-form-item label="时间段：">
				<el-select v-model="ruleForm.time" placeholder="请选择时间段">
					<el-option v-for="item in timeOption" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="图片：" class="beginAdImg">
				<el-upload class="avatar-uploader" action="//up.qbox.me/" :show-file-list="false" :data="uploadform" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="ruleForm.adimg" :src="ruleForm.adimg" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
        <el-input v-model="ruleForm.adimg"  style="position:absolute;top:0;left:230px;width:400px;" placeholder="填写图片地址"></el-input>
				<p style="position:absolute;top:50px;left:250px;">建议上传图片大小为200*300(w*h)，且图片大小上限为2M</p>
			</el-form-item>
			<!-- <el-form-item label="跳转链接：" prop="pass"> -->
				<el-form-item label="跳转链接：">
				<el-input type="password" v-model="ruleForm.pass" placeholder="填写跳转链接" auto-complete="off" style="width:500px;"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			</el-form-item>
		</el-form>

		<el-tooltip v-for="(item,index) in adArr" :key="index" placement="right" effect="light">
			<div slot="content"><img :src="item.adimg" alt=""></div>
			<!-- <el-button>Top center</el-button> -->
			<div class="tooltip">
				<span class="startDate">日期：{{item.date}}</span>
				<span class="time" v-if="item.time===1">时间：0:00 - 8:00</span>
				<span class="time" v-else-if="item.time===2">时间：8:00 - 16:00</span>
				<span class="time" v-else-if="item.time===3">时间：16:00 - 24:00</span>
				<span style="margin-left:15px;">
					跳转地址：<a :href="item.link" target="_blank">{{item.link}}</a>
				</span>
				
			</div>
		</el-tooltip>

	</section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm: {
				date: null,
				time: null,
        adimg: null,
        link: null
      },
      uploadform: {
        token: ""
      },
      timeOption: [
        {
          label: "0:00 - 8:00",
          value: 1
        },
        {
          label: "8:00 - 16:00",
          value: 2
        },
        {
          label: "16:00 - 24:00",
          value: 3
        }
      ],
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }]
			},
			adArr: []
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
	},
	mounted(){
		this.adArr = [
			{
				date:"2017-10-13",
				time: 1,
				adimg:'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
				link:'https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&rsv_idx=1&tn=baidu&wd=css%20%E8%B6%85%E5%87%BA%E9%83%A8%E5%88%86%E7%9C%81%E7%95%A5%E5%8F%B7&oq=a%25E6%25A0%2587%25E7%25AD%25BE%25E6%2589%2593%25E5%25BC%2580%25E6%2596%25B0%25E9%25A1%25B5%25E9%259D%25A2&rsv_pq=bdc9720e00027b91&rsv_t=f968vVCThCE8wylKxO8L4mw2oH5xaJxEYk%2FvSl%2Bbnz%2FaEaMYCspTy3YF1BQ&rqlang=cn&rsv_enter=1&inputT=10029&rsv_sug3=36&rsv_sug1=42&rsv_sug7=100&rsv_sug2=0&prefixsug=css%2520%25E8%25B6%2585%25E5%2587%25BA%25E9%2583%25A8%25E5%2588%2586&rsp=0&rsv_sug4=10779'
			}
		]
	}
};
</script>


<style lang="scss">
.beginAdImg {
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 300px;
    line-height: 300px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 300px;
    display: block;
  }
}

.tooltip{
	position: relative;
	width: 600px;
	height: 32px;
	line-height: 30px;
	background-color: rgba(64, 158, 255, .1);
	padding: 0 10px;
	color: #409eff;
	border-radius: 4px;
	box-sizing: border-box;
	border: 1px solid rgba(64, 158, 255, .2);
	white-space: nowrap;
	
	span{
		display: inline-block;
		a{
			position: absolute;
			display: inline-block;
			width: 250px;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
	}
	.time{
		margin-left: 15px;
	}
}
</style>