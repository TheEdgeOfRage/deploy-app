<template>
	<v-dialog v-model="dialog" persistent max-width="600px">
		<v-card>
			<v-card-title>
				<span class="headline">Execute container commands</span>
			</v-card-title>
			<v-card-text>
					<v-layout wrap>
						<v-flex xs12>
							<v-textarea
								name="commands"
								label="Commands"
								v-model="commands"
							></v-textarea>
						</v-flex>
					</v-layout>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="red darken-1" @click="closeExecDialog">Close</v-btn>
				<v-btn color="green darken-1" @click="execCommands">Execute</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import ContainerApi from '@/api/container.api';

export default {
	name: 'exec-dialog',
	data() {
		return {
			commands: '',
		};
	},
	props: [
		'dialog',
		'id',
	],
	methods: {
		closeExecDialog() {
			this.$emit('close');
			this.commands = '';
		},
		execCommands() {
			const commands = this.commands.split('\n');
			this.closeExecDialog();
			ContainerApi.execCommands(this.id, { commands }).then((response) => {
				this.$emit('success', response.data);
			}).catch((error) => {
				this.$emit('failed', error.response.data);
			});
		},
	},
};
</script>

<style lang="stylus">
textarea
	font-family monospace
	font-size 1.1rem
</style>

