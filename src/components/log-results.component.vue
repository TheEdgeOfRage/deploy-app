<template>
	<v-dialog v-model="dialog" persistent max-width="1000px">
		<v-card>
			<v-card-title>
				<span class="headline">{{ logs.container_name }}</span>
			</v-card-title>
			<v-card-text>
				<v-layout wrap>
					<v-flex xs12>
						<code class="log-content">{{ logs.output }}</code>
					</v-flex>
				</v-layout>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary darken-1" @click="$emit('close')">Close</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'log-results',
	props: [
		'dialog',
		'logs',
	],
};
</script>

<style lang="stylus">
.log-content
	width calc(100% - 2rem)
	margin-left 1rem
	padding 0.2rem 0.5rem
	color #fff
	background #282828

	&::before
		display none

	&::after
		display none
</style>

