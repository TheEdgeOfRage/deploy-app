<template>
	<v-layout>
		<v-flex md12 lg6 offset-lg3>
			<Login></Login>
		</v-flex>
	</v-layout>
</template>

<script>
import Login from '@/components/login.component';

export default {
	name: 'login-view',
	components: {
		Login,
	},
};
</script>

<style lang="stylus">
</style>

