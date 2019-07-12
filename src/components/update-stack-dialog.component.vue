<template>
	<v-dialog v-model="dialog" persistent max-width="600px">
		<v-card>
			<v-card-title class="headline">Update services?</v-card-title>
			<v-progress-linear v-if="updating" :indeterminate="true"></v-progress-linear>
			<v-card-text>This option will update and restart <strong>ALL</strong> services. Prepare for about a minute of downtime</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn :disabled="updating" color="red darken-1" @click="$emit('close')">Cancel</v-btn>
				<v-btn :disabled="updating" color="green darken-1" @click="$emit('update-stack')">Update</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'update-stack-dialog',
	props: [
		'dialog',
		'updating',
	],
};
</script>

<style lang="stylus">
</style>

