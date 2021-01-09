<template>
    <div class="header">
        <span style="flex:1;"></span>
        <el-button class="header_button" @click="loginOut">退出</el-button>
    </div>
</template>

<script>
    export default {
        name: "GlobalHeader",
        methods: {
            loginOut() {
                this.$router.push("/login");
            },
        }
    }
</script>

<style lang="less">
    @mainColor: #d0d1d5;
    @mainHeight: 100%;

    .header {
        background: #013366;
        padding: 0;
        height: 50px;
        line-height: 50px;
        display: flex;
        flex-shrink: 0;
        flex-direction: row;
        text-align: center;
        color: @mainColor;
        &_button {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;
            width: 80px;
            font-size: 14px;
            line-height: 30px;
            background: #333959;
            color: @mainColor;
            border: none;
        }

        &_button:hover {
            background: #eef3f6;
            color: #333959;
        }
    }
    #logo{
        display: inline-block;
        width: 46px;
        height:46px;
        background:url('./../../assets/img/logo.png') no-repeat;
      background-size: 100% 100%;
    }
</style>
