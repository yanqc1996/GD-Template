<template>
    <div class="register-container">
        <div class="register">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="userName">
                    <div class="relative">
                        <el-input v-model="ruleForm.userName" @blur="checkUserName" @focus="changeUserName"></el-input><span v-if="isExistence" class="tips">用户名已存在</span>
                    </div>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="公司" prop="company">
                    <el-input v-model="ruleForm.company"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model.number="ruleForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="back" round>返回</el-button>
                    <el-button type="primary" @click="confirm('ruleForm')" round>注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "register",
        data() {
            var checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                } else {
                    const reg = /^1[34578]\d{9}$/
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的手机号'));
                    }
                }
            };
            return {
                ruleForm: {
                    userName: "",
                    pass: "",
                    name: "",
                    company: "",
                    phone: ""
                },
                isExistence: false,
                rules: {
                    userName: [{
                            required: true,
                            message: "请输入您要设置的用户名",
                            trigger: "blur"
                        },
                        {
                            pattern: /^.*[^\d].*$/,
                            message: '用户名不能为纯数字'
                        }
                    ],
                    pass: [{
                        required: true,
                        message: "请输入您要设置的密码",
                        trigger: "change"
                    }],
                    name: [{
                        required: true,
                        message: "请输入您的姓名",
                        trigger: "change"
                    }],
                    company: [{
                        required: true,
                        message: "请输入所属公司",
                        trigger: "change"
                    }],
                    phone: [{
                        validator: checkPhone,
                        trigger: 'blur'
                    }]
                }
            };
        },
        methods: {
            //确认注册
            confirm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let registerData = {
                            realName: this.ruleForm.name,
                            phoneNumber: this.ruleForm.phone,
                            company: this.ruleForm.company,
                            acouunt: this.ruleForm.userName,
                            password: this.ruleForm.pass
                        }
                        this.$http.post(`user/register`, registerData).then(res => {
                            if (res.errorCode == '0000') {
                                this.$message({
                                    message: '注册成功',
                                    type: 'success'
                                });
                                setTimeout(() => this.$router.push('/login'), 1000);
                            }
                        })
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            //判断用户名是否存在
            checkUserName() {
                let userName = this.ruleForm.userName;
                if (userName) {
                    this.$http.get(`user/check`, {
                        params: {
                            acouunt: userName,
                        }
                    }).then(res => {
                        if (res.errorCode == '0001') {
                            this.isExistence = true;
                        }
                    })
                }
            },
            changeUserName() {
                this.isExistence = false;
            },
            back(){
                this.$router.go(-1)
            }
        }
    };
</script>

<style>
</style>
