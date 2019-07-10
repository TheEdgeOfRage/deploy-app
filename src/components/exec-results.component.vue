<template>
	<v-dialog v-model="dialog" persistent max-width="1000px">
		<v-card>
			<v-card-title>
				<span class="headline">{{ data.msg }}</span>
			</v-card-title>
			<v-card-text>
				<v-layout wrap>
					<v-flex xs12>
						<div v-for="(result, i) in data.result" :key="i" class="result">
							<div
								class="result-header"
								:class="{'red--text': result.code, 'green--text': !result.code}">
								<span class="command">{{ result.command }}</span>
								<span class="code" v-show="result.code">{{ result.code }}</span>
							</div>
							<code class="result-body">{{ result.output }}</code>
						</div>
					</v-flex>
				</v-layout>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary darken-1" @click="closeDialog">Close</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'exec-results',
	props: [
		'dialog',
		'data',
	],
	methods: {
		closeDialog() {
			this.$emit('close');
		},
	},
};
</script>

<style lang="stylus">
.result-header
	display flex
	justify-content space-between
	padding-right 1rem
	font-family monospace

.result-body
	margin-left 1rem
	padding 0.1rem 0.4rem

code
	color #fff
	background #282828
	width calc(100% - 2rem)

	::before
		display none

	::after
		display none
</style>

