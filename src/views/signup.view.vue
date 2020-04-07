<template>
	<v-layout>
		<v-flex md12 lg6 offset-lg3 >
			<signup></signup>
		</v-flex>
	</v-layout>
</template>

<script>
import Signup from '@/components/signup.component.vue';

export default {
	name: 'signup-view',
	components: {
		Signup,
	},
};
</script>
