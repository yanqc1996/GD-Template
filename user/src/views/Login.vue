<template>
  <div class="center">
    <div class="login">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户名登录" name="用户名登录">
          <el-form
            :model="ruleForm1"
            :rules="rules1"
            ref="ruleForm1"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="UserName">
              <el-input v-model="ruleForm1.UserName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm1.pass"
                @keyup.native.enter="nameLogin('ruleForm1')"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="register">注册</el-button>
              <el-button type="primary" @click="nameLogin('ruleForm1')"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="手机号登录" name="手机号登录">
          <el-form
            :model="ruleForm2"
            :rules="rules2"
            ref="ruleForm2"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="手机号" prop="phone">
              <el-input
                v-model.number="ruleForm2.phone"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm2.pass"
                @keyup.native.enter="phoneLogin('ruleForm2')"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="register">注册</el-button>
              <el-button type="primary" @click="phoneLogin('ruleForm2')"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
/**
 * @description 系统登陆页面
 */
export default {
  name: "Login",
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[34578]\d{9}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      ruleForm1: {
        UserName: "",
        pass: "",
      },
      ruleForm2: {
        phone: "",
        pass: "",
      },
      activeName: "用户名登录",
      rules1: {
        UserName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        pass: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
      rules2: {
        pass: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        phone: [
          {
            validator: checkPhone,
            trigger: "blur",
          },
        ],
      },
    };
  },
  // 用户名登录
  methods: {
    nameLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let userData = {
            password: this.ruleForm1.pass,
            acouunt: this.ruleForm1.UserName,
          };
          this.$http.post(`user/login`, userData).then((res) => {
            if (res.errorCode === "0000") {
              sessionStorage.setItem("token", userData.acouunt);
              this.$message({
                message: "登录成功",
                type: "success",
              });
              this.$router.push("/");
            } else if (res.errorCode === "0001") {
              this.$message({
                message: res.errorMsg,
                type: "warning",
              });
            } else {
              return false;
            }
          });
        } else {
          return false;
        }
      });
    },
    //手机号登录
    phoneLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let userData = {
            password: this.ruleForm2.pass,
            phoneNumber: this.ruleForm2.phone,
          };
          this.$http.post(`user/login`, userData).then((res) => {
            if (res.errorCode === "0000") {
              sessionStorage.setItem("token", userData.phoneNumber);
              this.$router.push("/");
            } else if (res.errorCode === "0001") {
              this.$message({
                message: res.errorMsg,
                type: "warning",
              });
            } else {
              return false;
            }
          });
        } else {
          return false;
        }
      });
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>
