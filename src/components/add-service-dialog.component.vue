<template>
	<v-dialog v-model="dialog" persistent max-width="600px">
		<v-card>
			<v-card-title>
				<span class="headline">Add new service</span>
			</v-card-title>
			<v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
			<v-card-text>
				<v-layout row wrap>
					<v-flex md12>
						<v-text-field
							label="Service Name"
							v-model="name"
						></v-text-field>
					</v-flex>
				</v-layout>
				<v-layout row wrap>
					<v-flex md7>
						<v-text-field
							label="Repository"
							v-model="repository"
						></v-text-field>
					</v-flex>
					<v-flex md4 offset-md1>
						<v-text-field
							label="Tag"
							v-model="tag"
						></v-text-field>
					</v-flex>
				</v-layout>
				<v-layout row wrap>
					<v-flex md12>
						<p class="red--text text--darken-1 error-text">{{ error }}</p>
					</v-flex>
				</v-layout>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="red darken-1" :disabled="loading" @click="closeAddServiceDialog">Close</v-btn>
				<v-btn color="green darken-1" :disabled="loading" @click="addService">Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import ServiceApi from '@/api/service.api';

export default {
	name: 'add-service-dialog',
	data() {
		return {
			name: '',
			repository: '',
			tag: '',
			error: '',
			loading: false,
		};
	},
	props: ['dialog'],
	methods: {
		closeAddServiceDialog() {
			this.$emit('close');
			this.name = '';
			this.repository = '';
			this.tag = '';
		},
		addService() {
			this.loading = true;
			this.error = '';
			const data = {
				name: this.name,
				repository: this.repository,
				tag: this.tag,
			};
			ServiceApi.addService(data).then((response) => {
				this.closeAddServiceDialog();
				this.loading = false;
				this.$emit('success', response.data);
			}).catch((error) => {
				this.loading = false;
				if (error.response && error.response.data) {
					console.log(`${error.response.data.err} - ${error.response.data.msg}`);
					this.error = `${error.response.data.err} - ${error.response.data.msg}`;
				}
			});
		},
	},
};
</script>

<style lang="stylus">
.error-text
	font-size 1.2rem
	font-weight 700
</style>

