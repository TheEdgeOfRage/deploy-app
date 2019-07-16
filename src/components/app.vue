<template>
	<v-app dark>
		<v-toolbar color="primary" dense fixed app>
			<v-toolbar-title>
				<router-link :to="{ name: 'index' }">Deploy panel</router-link>
			</v-toolbar-title>
			<v-spacer></v-spacer>

			<v-toolbar-items>
				<v-btn
					flat
					v-for="item in toolbarItems[authStatus]"
					:key="item.text"
					:to="item.to"
				>
				<v-icon left>{{ item.icon }}</v-icon>
				{{ item.text }}
				</v-btn>
			</v-toolbar-items>
		</v-toolbar>
		<v-content>
			<router-view></router-view>
		</v-content>
	</v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'app',
	data() {
		return {
			toolbarItems: {
				true: [
					{ icon: 'fas fa-layer-group', text: 'Services', to: { name: 'index' } },
					{ icon: 'fas fa-user-plus ', text: 'Create user', to: { name: 'signup' } },
					{ icon: 'fas fa-sign-out-alt', text: 'Logout', to: { name: 'logout' } },
				],
				false: [{ icon: 'fas fa-sign-in-alt', text: 'Login', to: { name: 'login' } }],
			},
		};
	},
	computed: {
		...mapGetters(['authStatus']),
	},
};
</script>

<style lang="stylus">
.v-toolbar
	.v-toolbar__title
		a
			color white
			text-decoration none
</style>
