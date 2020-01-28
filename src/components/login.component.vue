<template>
	<v-card class="login-form-card">
		<h2>Login</h2>
		<form @submit="submit">
			<v-text-field
				v-model="url"
				name="url"
				label="URL"
				type="text"
			></v-text-field>
			<v-text-field
				v-model="username"
				name="username"
				label="Username"
				type="text"
			></v-text-field>
			<v-text-field
				v-model="password"
				name="password"
				label="Password"
				type="password"
			></v-text-field>
			<p
				v-for="(error, index) in loginErrors"
				:key="index"
				class="red--text"
			>{{ error }}</p>
			<v-btn type="submit">Login</v-btn>
		</form>
	</v-card>
</template>

<script>
import AuthController from '@/controllers/auth.controller';

export default {
	name: 'login',
	data() {
		return {
			username: '',
			password: '',
			url: '',
			loginErrors: [],
		};
	},
	methods: {
		submit(event) {
			event.preventDefault();
			this.loginErrors = [];
			const data = {
				username: this.username,
				password: this.password,
				url: this.url,
			};

			AuthController.login(data).catch((error) => {
				if (!error.response) {
					return;
				}

				this.loginErrors.push(error.response.data.err);
			});
		},
	},
};
</script>

<style lang="stylus">
.login-form-card
	padding 2rem
	margin-top 5rem
</style>

