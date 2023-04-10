<template>
	<div class="login-bg" v-if="show">
		<Form :style="{top:'15rem', width: '20rem', position: 'absolute', left: 'calc(50% - 10rem)'}" 
			ref="loginObject" :model="loginObject" :rules="ruleInline" block>
			<FormItem prop="user">
				<Input type="text" v-model="loginObject.user" placeholder="用户名">
					<Icon type="ios-person-outline" slot="prepend"></Icon>
				</Input>
			</FormItem>
			<FormItem prop="password">
				<Input type="password" v-model="loginObject.password" placeholder="密码">
					<Icon type="ios-lock-outline" slot="prepend"></Icon>
				</Input>
			</FormItem>
			<FormItem>
				<Button class="w-100" type="primary" @click="handleSubmit('loginObject')">登录</Button>
			</FormItem>
		</Form>
	</div>
</template>
<script>
	import store from '../../common/store.js';
    export default {
        data () {
            return {
				show: true,
                loginObject: {
                    user: '',
                    password: '',
					rem: false
                },
                ruleInline: {
                    user: [
                        { required: true, message: '账户名必须输入', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码必须输入', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码至少6位', trigger: 'blur' }
                    ]
                }
            }
        },
		created: function(){
			
		},
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
						// this.$router.replace('wb/webank')
						console.log(valid);
						let param = {
							data: {
								account: this.$data.loginObject.user,
								password: this.$data.loginObject.password
							},
							type: "ACP",
							rem: this.$data.loginObject.rem
						};
						store.commit("login", param);
						this.$Message.success('登陆成功')
                    } else {
						console.log('登录失败');
						
                        this.$Message.error('登录失败!');
                    }
                })
            }
        }
    }
</script>

<style scoped>
	.login-bg {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background-color: #F1EFEE;
	}
</style>
