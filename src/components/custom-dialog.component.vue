<template>
	<v-dialog v-model="dialog" persistent max-width="600px">
		<v-card>
			<v-card-title class="headline">{{ title }}</v-card-title>
			<v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
			<v-card-text v-html="content"></v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					:disabled="loading"
					:color="buttonColor"
					@click="$emit('close')"
				>Close</v-btn>
				<v-btn
					v-if="button"
					:disabled="loading"
					color="green darken-1"
					@click="$emit('confirm')"
				>{{ button }}</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'custom-dialog',
	props: [
		'dialog',
		'loading',
		'title',
		'content',
		'button',
	],
	computed: {
		buttonColor() {
			if (this.button) {
				return 'red darken-1';
			}

			return 'info';
		},
	},
};
</script>

<style lang="stylus">
</style>

